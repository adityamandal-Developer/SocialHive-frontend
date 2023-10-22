import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
    resetErrorAction,
    resetSuccessAction,
} from "../globalSlice/globalSlice";
import BASE_URL from "../../../utils/baseURL";


const INITIAL_STATE = {
    loading: false,
    error: null,
    categories: [],
    category: null,
    success: false,
};

//fetching categoeies
export const fetchingCategoriesAc = createAsyncThunk(
    "categories/lists",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(
                `${BASE_URL}/categories`
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//categories sclices
const categorySlice = createSlice({
    name: "posts",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        //fetch categories
        builder.addCase(fetchingCategoriesAc.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(fetchingCategoriesAc.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        //reject
        builder.addCase(fetchingCategoriesAc.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //reset error action
        builder.addCase(resetErrorAction.fulfilled, (state) => {
            state.error = null;
        });
        //reset success action
        builder.addCase(resetSuccessAction.fulfilled, (state) => {
            state.success = false;
        });
    },
});

//generetae reducer
const categoriesReducer = categorySlice.reducer;

export default categoriesReducer;
