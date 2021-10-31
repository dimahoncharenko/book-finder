/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useEffect, useRef, useCallback, ChangeEvent } from "react";
import { debounceTime, fromEvent} from "rxjs"

import { useAppDispatch, useRootSelector } from "../redux/hooks";
import { changeSearch, selectSearch, changeFilter, changeCount, orderBy } from "../redux/reducers/searchForm";
import { clear } from "../redux/reducers/books";
import { fetchBooksAction } from "../redux/reducers/actions/books";

const CSS = css`
    --bg-form: gainsboro;
    --font-form: 'Oswald', sans-serif;

    background-color: var(--bg-form);
    margin-top: 2em;
    padding: .5em;
    font-family: var(--font-form);

    > .form__inner
    {
        border: .1em solid #909090;

        > .stripes-block
        {
            display: flex;
            padding: .5em;
            background-image: repeating-linear-gradient(-45deg, gray, gray 0.1em, transparent 0.1em, transparent 0.3em);
            border-bottom: .1em solid #909090;

            &::before
            {
                content: " ";
                margin: auto;
                border-radius: 50%;
                width: 1em;
                height: 1em;
                background-color: white;
                box-shadow: 0em 0em 0em .07em black, 0em 0em 0em 1em #9c8778;
            }
        }

        > .form__field
        {
            display: flex;
            flex-direction: column;
            padding: .5em;

            > label
            {
                margin-bottom: max(.5em, 2vw);
                margin-top: max(.25em, 1vw);
            }

            > input[type=text],
            > input[type=number]
            {
                -webkit-appearance: none;
                border: 0;
                padding: .5em;
            }
        }

        > .form__field + .form__field
        {
            border-top: .1em solid #909090;
        }

        > .radio-buttons
        {
            display: flex;
            padding: 1em;

            > .radio-filters
            {
                align-self: center;
            }

            > .radio-buttons__sort
            {
                text-align: right;
                align-self: center;
                margin-left: auto;
            }

        }

        .radio-control
        {
            display: grid;
            grid-template-columns: max-content 1em;
            gap: .5em;
            align-items: center;

            &.label--right
            {
                grid-template-columns: 1em max-content;
            }

            > input[type=radio]
            {
                display: flex;
                -webkit-appearance: none;
                appearance: none;
                background-color: #fff;
                margin: 0;
                width: 1em;
                height: 1em;
                border: .1em solid #000;
                border-radius: 50%;
                // Align radio with label using translateY of a half of border-width 
                transform: translateY(.05em);

                &::after
                {
                    content: "";
                    width: 80%;
                    height: 80%;
                    margin: auto;
                    border-radius: 50%;
                    transform: scale(0);
                    transition: 120ms transform ease-in-out;
                    box-shadow: inset 1em 1em #493f37;
                    background-color: #493f37;
                }

                &:checked::after
                {
                    transform: scale(1);
                }
            }
        }

        .radio-control + .radio-control
        {
            margin-top: .3em;
        }
    }
`;

const SearchForm = () => {
    const form = useRef<HTMLFormElement>(null);
    const search = useRootSelector(selectSearch);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (search.search) {
            updateUI();
        }

        async function updateUI() {
            await dispatch(fetchBooksAction(search));
        }

    }, [search, dispatch]);

    const handleChange = useCallback(async (value: string) => {
        dispatch(changeSearch(value));
        if (!value.trim()) return dispatch(clear());
        await dispatch(fetchBooksAction({ ...search, search: value }));
    }, [dispatch, search]);

    const onChangeFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeFilter(e.target.id));
    }, [dispatch]);

    const onChangeCount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeCount(Number(e.target.value)));
    }, [dispatch]);

    const onChangeSort = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(orderBy(e.target.id));
    }, [dispatch]);

    useEffect(() => {
        if (form.current) {
            const selection = form.current.querySelector("#query");
            const elem = selection instanceof HTMLInputElement ? selection : null;

            const event = fromEvent<ChangeEvent<HTMLInputElement>>(elem!, "input")
                .pipe(debounceTime(300));
    
            const sub = event.subscribe(e => handleChange(e.target.value));
    
            return () => sub.unsubscribe();
        }
    }, [handleChange])

    return <React.Fragment>
        <form ref={form} css={CSS} className="form">
            <div className="form__inner">
                <div className="stripes-block"></div>
                <div className="form__field">
                    <label htmlFor="search">Пошук</label>
                    <input type="text" id="query" placeholder="Введіть в пошуку ім'я автора, книги, видавництва, рік публікації і т.д"/>
                </div>
                <div className="form__field">
                    <label htmlFor="count">Кількість</label>
                    <input type="number" onChange={onChangeCount} min={1} max={40} defaultValue={10} id="count"/>
                </div>
                <div className="radio-buttons">
                    <div className="radio-buttons__filters">
                        <label className="radio-control">
                            Всі
                            <input type="radio" defaultChecked name="filter" onChange={onChangeFilter} id="ebooks"/>
                        </label>
                        <label className="radio-control">
                            Платні
                            <input type="radio" name="filter" onChange={onChangeFilter} id="paid-ebooks"/>
                        </label>
                        <label className="radio-control">
                            Безкоштовні
                            <input type="radio" name="filter" onChange={onChangeFilter} id="free-ebooks"/>
                        </label>
                    </div>
                    <div className="radio-buttons__sort">
                        <label className="radio-control label--right">
                            <input type="radio" name="sort" defaultChecked onChange={onChangeSort} id="relevance"/>
                            Актуальні
                        </label>
                        <label className="radio-control label--right">
                            <input type="radio" name="sort" onChange={onChangeSort} id="newest"/>
                            Найновіші
                        </label>
                    </div>
                </div>
            </div>
        </form>
    </React.Fragment>
};

export default SearchForm;