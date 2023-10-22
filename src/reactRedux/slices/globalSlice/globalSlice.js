import { createAsyncThunk } from "@reduxjs/toolkit";

//reset success
export const resetSuccessAction = createAsyncThunk(
    "reset-success-action",
    () => {
        return true;
    }
);

export const resetErrorAction = createAsyncThunk( //error 
    "reset-error-action",
    () => {
        return true;
    }
);

