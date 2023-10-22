import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import postsReducer from "../slices/posts/postsSlice";
import categoriesReducer from "../slices/categories/categoriesSlices";
import commentReducer from "../slices/comments/commentsSlice";

//store
const store = configureStore({
    reducer: {
        users: usersReducer,
        posts: postsReducer,
        categories: categoriesReducer,
        comments: commentReducer,
    },
});

export default store;