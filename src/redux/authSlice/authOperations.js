import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk('auth/register', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/auth/register', credentials);
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
}); 