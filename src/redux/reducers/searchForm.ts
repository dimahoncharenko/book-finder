import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./index";

export interface SearchState {
    search: string
    filter: string
    count: number
    sort: string
}

const initialState: SearchState = {
    search: "",
    filter: "ebooks",
    count: 10,
    sort: "relevance"
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        changeSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        clearSearch: (state) => {
            state.search = "";
        },
        changeFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
        changeCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
        orderBy: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        }
    }
});

export const { changeSearch, clearSearch, changeFilter, changeCount, orderBy } = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;

export default searchSlice.reducer;