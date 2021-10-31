import fetch from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { parseBook } from "../utils";

export const fetchBookByIdAction = createAsyncThunk(
    "book/id",
    async (id: string, thunkAPI) => {
        const res = await fetch.get<any>(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(res => res.data)
            .then(data => parseBook(data));
        return res;
    }
);