import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobSitesAction, createJobSiteAction } from "@/store/jobSites";
import type { Item, ItemInput } from "@/utils/WriteFunctions";

interface SitesState {
  sites: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SitesState = {
  sites: [],
  status: "idle",
  error: null,
};

export const fetchJobSites = createAsyncThunk<Item[]>("jobSites/fetch", async () => await fetchJobSitesAction());

export const createJobSite = createAsyncThunk<Item, ItemInput>("jobSites/create", async (input) => await createJobSiteAction(input));

export const dataSlice = createSlice({
  name: "jobSites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobSites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchJobSites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sites = action.payload;
      })
      .addCase(fetchJobSites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Ошибка загрузки";
      })
      .addCase(createJobSite.fulfilled, (state, action) => {
        state.sites.push(action.payload);
      });
  },
});

export default dataSlice.reducer;
