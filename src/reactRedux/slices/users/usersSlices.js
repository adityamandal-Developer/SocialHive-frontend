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
    users: [],
    user: null,
    success: false,
    profile: {},
    isEmailSent: false,
    isverified: false,
    userAuth: {
        error: null,
        userInfo: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,
    },
};

//login action
export const loginAction = createAsyncThunk(
    "users/login",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //
        try {
            const { data } = await axios.post(`${BASE_URL}/users/login`, payload);
            //local storage
            localStorage.setItem("userInfo", JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//registerUser action
export const registerAction = createAsyncThunk(
    "users/register",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //
        try {
            const { data } = await axios.post(
                `${BASE_URL}/users/registerUser`,
                payload
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//get user public profile action
export const userPublicProfileAction = createAsyncThunk(
    "users/user-public-profile",
    async (userId, { rejectWithValue, getState, dispatch }) => {
        //
        try {
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(
                `${BASE_URL}/users/public-profile/${userId}`,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//! Get User  Profile Action
export const userPrivateProfileAction = createAsyncThunk(
    "users/user-private-profile",
    async (userId, { rejectWithValue, getState, dispatch }) => {
        //make request
        try {
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${BASE_URL}/users/profile/`, config);
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//logout action
export const logoutAction = createAsyncThunk("users/logout", async () => {
    localStorage.removeItem("userInfo"); //remove token from local storage
    return true;
});

//upload cover image
export const uploadCoverPictureAction = createAsyncThunk(
    "users/upload-cover-image",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            //convert the payload to formdata
            const formData = new FormData();
            formData.append("file", payload?.image);

            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.put(
                `${BASE_URL}/users/upload-cover-picture`,
                formData,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//upload profile image
export const uploadProfilePictureAction = createAsyncThunk(
    "users/upload-profile-image",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            //convert the payload to formdata
            const formData = new FormData();
            formData.append("file", payload?.image);

            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.put(
                `${BASE_URL}/users/upload-profile-image`,
                formData,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//account-verification-email
export const sendAccountVerificationEmailAction = createAsyncThunk(
    "users/send-account-verification-email",
    async (userId, { rejectWithValue, getState, dispatch }) => {
        //
        try {
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.put(
                `${BASE_URL}/users/account-verification-email`,
                {},
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//! verify account Action
export const verifyAccountAction = createAsyncThunk(
    "users/account-verified",
    async (verifyToken, { rejectWithValue, getState, dispatch }) => {
        //make request
        try {
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(
                `${BASE_URL}/users/account-verification/${verifyToken}`,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//users sclices
const usersSlice = createSlice({
    name: "users",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        //login-in
        builder.addCase(loginAction.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.userAuth.userInfo = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        //reject
        builder.addCase(loginAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //get user public profile
        builder.addCase(userPublicProfileAction.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(userPublicProfileAction.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        //reject
        builder.addCase(userPublicProfileAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //account-verification-email
        builder.addCase(
            sendAccountVerificationEmailAction.pending,
            (state, action) => {
                state.loading = true;
            }
        );
        //handle fulfilled
        builder.addCase(
            sendAccountVerificationEmailAction.fulfilled,
            (state, action) => {
                state.isEmailSent = true;
                state.loading = false;
                state.error = null;
            }
        );
        //reject
        builder.addCase(
            sendAccountVerificationEmailAction.rejected,
            (state, action) => {
                state.error = action.payload;
                state.loading = false;
            }
        );

        //upload user profile
        builder.addCase(uploadProfilePictureAction.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(uploadProfilePictureAction.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        //reject
        builder.addCase(uploadProfilePictureAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //upload cover profile
        builder.addCase(uploadCoverPictureAction.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(uploadCoverPictureAction.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        //reject
        builder.addCase(uploadCoverPictureAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //register
        builder.addCase(registerAction.pending, (state, action) => {
            state.loading = true;
        });
        //handle fulfilled
        builder.addCase(registerAction.fulfilled, (state, action) => {
            state.user = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        //reject
        builder.addCase(registerAction.rejected, (state, action) => {
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

        //get user private profile
        builder.addCase(userPrivateProfileAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(userPrivateProfileAction.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(userPrivateProfileAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //Verify Account
        builder.addCase(verifyAccountAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(verifyAccountAction.fulfilled, (state, action) => {
            state.isverified = true;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(verifyAccountAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

//generetae reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
