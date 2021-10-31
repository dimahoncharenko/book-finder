import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { fetchBooksAction } from "../reducers/actions/books";

export type Book = {
    id: string
    title: string
    publishedDate: string
    imageUrl: string
    authors: string[]
    categories: string[]
    pageCount: number
    language: string
    publisher: string
    price: string
}

interface BookState {
    books: Book[]
    loading: boolean
    message: string
}

const initialState: BookState = {
    books: [],
    loading: false,
    message: ""
}

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        clear: (state) => {
            state.books = [];
        }
    },
    extraReducers: {
        [fetchBooksAction.pending.type]: (state) => {
            state.loading = true;
        },
        [fetchBooksAction.fulfilled.type]: (state, action: PayloadAction<Book[]>) => {
            state.loading = false;
            state.books = action.payload;
        },
        [fetchBooksAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.message = action.payload;
        },
    }
});

export const { clear } = booksSlice.actions;
export const selectBooks = (state: RootState) => state.books.books;

export default booksSlice.reducer;
