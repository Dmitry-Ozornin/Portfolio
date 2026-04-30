import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export interface User {
  id: string; 
  login: string;
  email: string | null;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  role: "ADMIN" | "MANAGER" | "WORKER";
  gender: string;
  city: string;
  phone: string | null;
  dateOfBirth: string | null;
  typeOfWork: string[];
  isActive: boolean; 
  createdAt: string;
  UpdatedAt: string; 
}

interface UsersState {
  list: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/admin/users");
    return response.data.users; // или response.data, смотри как приходит
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка загрузки");
  }
});

const usersSlice = createSlice({
  name: "admin/users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
