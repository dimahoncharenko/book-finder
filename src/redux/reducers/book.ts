import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Book } from "./books";
import { fetchBookByIdAction } from "./actions/book";
import { RootState } from ".";

type BookState = {
    book: Book
    loading: boolean
    message: string
}

const initialState: BookState = {
    book: {
        title: "",
        publishedDate: "",
        id: "",
        authors: [],
        imageUrl: "",
        categories: [],
        pageCount: 0,
        price: "",
        publisher: "",
        language: ""
    },
    loading: false,
    message: ""
};

export const bookSlice = createSlice(
    {
        name: "book",
        initialState,
        reducers: {},
        extraReducers: {
            [fetchBookByIdAction.fulfilled.type]: (state, action: PayloadAction<Book>) => {
                state.loading = false;
                state.book = action.payload;
            },
            [fetchBookByIdAction.pending.type]: (state) => {
                state.loading = true;
            },
            [fetchBookByIdAction.rejected.type]: (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
            }
        }
    }
);

export const selectBook = (state: RootState) => state.book; 

export default bookSlice.reducer;