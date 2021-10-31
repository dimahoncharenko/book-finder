/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

import { useAppDispatch, useRootSelector } from "../redux/hooks";
import { selectBook } from "../redux/reducers/book";
import { fetchBookByIdAction } from "../redux/reducers/actions/book";
import Container from "./Container";
import Loading from "./LoadingSpinner";

const CSS = css`
    display: flex;
    align-items: center;
    color: black;

    > .book__content,
    > .book__thumb
    {
        flex: 1;
    }
`;

const BookPage = () => {
    const match = useRouteMatch<{id: string}>();
    const dispatch = useAppDispatch();
    const { book, loading, message } = useRootSelector(selectBook);

    useEffect(() => {
        dispatch(fetchBookByIdAction(match.params.id));
    }, [dispatch, match]);

    if (loading) return <Loading />
    if (message) return <p>Oops... Something went wrong: {message}</p>

    return (
        <Container width="min(768px, 100%)">
            {book ? (
                <div className="book" css={CSS}>
                    <div className="book__thumb">
                        <h2>{book.title}</h2>
                        <img src={book.imageUrl} width="300px" alt={`${book.title}`}/>
                    </div>
                    <div className="book__content">
                        <p>Language: {book.language}</p>
                        <p>Page count: {book.pageCount}</p>
                        <p>Publisher: {book.publisher}</p>
                        <p>Price: {book.price}</p>
                        <p>Date of publishing: {book.publishedDate}</p>
                        <p>Authors: {book.authors && book.authors.join(", ")}</p>
                    </div>
                </div>
            ) : null}
        </Container>
    );
};

export default BookPage;