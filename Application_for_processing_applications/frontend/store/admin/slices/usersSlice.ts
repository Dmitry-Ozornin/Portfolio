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
  findingUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  findingUser: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/admin/users");
    return response.data.users;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка загрузки");
  }
});

export const updateUser = createAsyncThunk("admin/updateUser", async ({ id, data }: { id: string; data: Partial<User> }, { dispatch, rejectWithValue }) => {
  try {
    const response = await api.post("/admin/updateUser", { id, ...data });
    if (response.data.success) {
      await dispatch(fetchUsers());
      return response.data.user;
    }
    return rejectWithValue("Ошибка обновления пользователя");
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка при обновлении");
  }
});

const usersSlice = createSlice({
  name: "admin/users",
  initialState,
  reducers: {
    findUser(state, action: PayloadAction<string>) {
      state.findingUser = state.list.find((user) => user.id === action.payload) || null;
    },
    clearFindingUser(state) {
      state.findingUser = null;
    },
  },
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
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
export const { findUser, clearFindingUser } = usersSlice.actions;
