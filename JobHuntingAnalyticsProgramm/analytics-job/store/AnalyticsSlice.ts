import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAnalyticsAction } from "./analyticsNamesActions";
import { AnalyticsListItem, AnalyticsListItemInput } from "@/utils/types/typesForAnalyticsList";
import { getAnalyticsList } from "@/utils/writeReadAnalyticsList";

interface AnalyticsState {
  analyticsList: AnalyticsListItem[];
  listStatus: "idle" | "loading" | "succeeded" | "failed";
  listError: string | null;
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  createError: string | null;
}

const initialState: AnalyticsState = {
  analyticsList: [],
  listStatus: "idle",
  listError: null,
  createStatus: "idle",
  createError: null,
};

export const createAnalyticsData = createAsyncThunk<AnalyticsListItem, AnalyticsListItemInput, { rejectValue: string }>("analyticsList/create", async (input, { rejectWithValue }) => {
  const result = await createAnalyticsAction(input);
  if (!result.ok) {
    return rejectWithValue(result.error);
  }
  return result.data;
});

export const getAnalyticsData = createAsyncThunk<AnalyticsListItem[]>("analyticsList/get", async () => await getAnalyticsList());

export const analyticsSlice = createSlice({
  name: "analyticsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAnalyticsData.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createAnalyticsData.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.analyticsList.push(action.payload);
      })
      .addCase(createAnalyticsData.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = typeof action.payload === "string" ? action.payload : (action.error.message ?? "Не удалось создать запись");
      })
      .addCase(getAnalyticsData.pending, (state) => {
        state.listStatus = "loading";
        state.listError = null;
      })
      .addCase(getAnalyticsData.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.analyticsList = action.payload;
      })
      .addCase(getAnalyticsData.rejected, (state, action) => {
        state.listStatus = "failed";
        state.listError = action.error.message ?? "Не удалось загрузить список";
      });
  },
});

export default analyticsSlice.reducer;
