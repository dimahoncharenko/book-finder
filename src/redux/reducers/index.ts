import { configureStore } from "@reduxjs/toolkit"

import searchForm from "./searchForm";
import books from "./books";
import book from "./book";

export const store = configureStore({
    reducer: {
        search: searchForm,
        books,
        book
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch