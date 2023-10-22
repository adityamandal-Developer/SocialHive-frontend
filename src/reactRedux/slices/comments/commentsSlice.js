import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../globalSlice/globalSlice";
import BASE_URL from "../../../utils/baseURL";
//initialstate
const INITIAL_STATE = {
    loading: false,
    error: null,
    comments: [],
    comment: null,
    success: false,
};

// ! update posts
export const createCommentAction = createAsyncThunk(
    "comment/create",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const token = getState().users?.userAuth?.userInfo?.token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.post(
                `${BASE_URL}/comments/${payload?.postId}`,
                {
                    message: payload?.message,
                },
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);


//users sclices
const publicPostsSlice = createSlice({
    name: "posts",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        //create comment
        builder.addCase(createCommentAction.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(createCommentAction.fulfilled, (state, action) => {
            state.comment = action.payload;
            state.loading = false;
            state.error = null;
            state.success = true;
        });
        //reject
        builder.addCase(createCommentAction.rejected, (state, action) => {
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
const commentReducer = publicPostsSlice.reducer;

export default commentReducer;