import fetch from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SearchState } from "../searchForm";
import { parseBook } from "../utils";

export const fetchBooksAction = createAsyncThunk(
    "books/fetchAll",
    async ({ count, filter, search, sort }: SearchState, thunkAPI) => {
        const res = await fetch.get<any>(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=${count}&filter=${filter}&orderBy=${sort}`)
            .then(res => res.data.items || [])
            .then(data => data.map((book: any) => {
                return parseBook(book)
            }));
        
        return res;
    }
);