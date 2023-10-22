import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
    resetErrorAction,
    resetSuccessAction,
} from "../globalSlice/globalSlice";
import BASE_URL from "../../../utils/baseURL";
//initialstate

const INITIAL_STATE = {
    loading: false,
    error: null,
    posts: [],
    post: null,
    success: false,
};

//fetching public posts
export const fetchingPublicPostsAc = createAsyncThunk(
    "posts/fetch-public-post",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //
        try {
            const { data } = await axios.get(`${BASE_URL}/posts`);
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetching private posts
export const fetchingPrivatePostsAc = createAsyncThunk(
    "posts/fetch-private-post",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //
        try {
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(
                `${BASE_URL}/posts`,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetching single posts
export const getPostAction = createAsyncThunk(
    "posts/get-post",
    async (postId, { rejectWithValue, getState, dispatch }) => {
        //
        try {
            const { data } = await axios.get(
                `${BASE_URL}/posts/${postId}`
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//!delete post
export const deletePostAction = createAsyncThunk(
    "posts/delete-post",
    async (postId, { rejectWithValue, getState, dispatch }) => {
        //make request
        try {
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.delete(
                `${BASE_URL}/posts/${postId}`,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//like post
export const likePostAction = createAsyncThunk(
    "posts/like",
    async (postId, { rejectWithValue, getState, dispatch }) => {
        //make request
        try {
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.put(
                `${BASE_URL}/posts/likes/${postId}`,
                {},
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//create post
export const createPostAction = createAsyncThunk(
    "post/create",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            //convert the payload to formdata
            const formData = new FormData();
            formData.append("title", payload?.title);
            formData.append("content", payload?.content);
            formData.append("categoryId", payload?.category);
            formData.append("file", payload?.image);

            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.post(
                `${BASE_URL}/posts`,
                formData,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

// ! update post
export const updatePostAction = createAsyncThunk(
    "post/update",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            //convert the payload to formdata
            const formData = new FormData();
            console.log(formData);
            formData.append("title", payload?.title);
            formData.append("content", payload?.content);
            formData.append("categoryId", payload?.category);
            formData.append("file", payload?.image);

            const token = getState().users?.userAuth?.userInfo?.token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.put(
                `${BASE_URL}/posts/${payload?.postId}`,
                formData,
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
        //fetch public post
        builder.addCase(fetchingPublicPostsAc.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(fetchingPublicPostsAc.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
        });
        //reject
        builder.addCase(fetchingPublicPostsAc.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //fetch private post
        builder.addCase(fetchingPrivatePostsAc.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(fetchingPrivatePostsAc.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
        });
        //reject
        builder.addCase(fetchingPrivatePostsAc.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //create post
        builder.addCase(createPostAction.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(createPostAction.fulfilled, (state, action) => {
            state.post = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        //reject
        builder.addCase(createPostAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //update post
        builder.addCase(updatePostAction.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(updatePostAction.fulfilled, (state, action) => {
            state.post = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        //reject
        builder.addCase(updatePostAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //get single post
        builder.addCase(getPostAction.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(getPostAction.fulfilled, (state, action) => {
            state.post = action.payload;
            state.loading = false;
            state.error = null;
        });
        //reject
        builder.addCase(getPostAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //like post
        builder.addCase(likePostAction.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(likePostAction.fulfilled, (state, action) => {
            state.post = action.payload;
            state.loading = false;
            state.error = null;
        });
        //reject
        builder.addCase(likePostAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //! detelet post
        builder.addCase(deletePostAction.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled state
        builder.addCase(deletePostAction.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        //* Handle the rejection
        builder.addCase(deletePostAction.rejected, (state, action) => {
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
const postsReducer = publicPostsSlice.reducer;

export default postsReducer;
