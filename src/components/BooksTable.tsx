/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Link } from "react-router-dom";
import React from "react";

import BaseTable from "./BasicTable";
import { Book } from "../redux/reducers/books";
import Card from "./Card";
import { useAppDispatch } from "../redux/hooks";
import { clear } from "../redux/reducers/books";

type Props = {
    books: Book[]
}

const customStyles = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
    grid-auto-rows: auto;
    gap: .5em;

    .book-link
    {
        text-decoration: none;
    }
`;

const BooksTable = ({ books = [] }: Props) => {
    const dispatch = useAppDispatch();

    return (
        <BaseTable>
            <div css={customStyles}>
                {books.map((book, index) => {
                    return <div key={index} className="table__row">
                        <div className="table__cell">
                            <Card
                                image={book.imageUrl}
                            >
                                <Card.Content>
                                    <React.Fragment>
                                        <Link 
                                            title={book.title}
                                            className="book-link"
                                            onClick={() => dispatch(clear())} 
                                            to={`book/${book.id}`}
                                        >
                                            <h2>{book.title}</h2>
                                        </Link>
                                        {book.authors ? book.authors.map((tag, index) => <p key={index}>{tag}</p>) : null}
                                        <p>{book.publishedDate}</p>
                                    </React.Fragment>
                                </Card.Content>
                            </Card>
                        </div>
                    </div>
                })}
            </div>
        </BaseTable>
    );
};

export default BooksTable;