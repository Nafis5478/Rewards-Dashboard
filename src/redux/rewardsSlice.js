import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRewards = createAsyncThunk(
  "rewards/fetchRewards",
  async () => {
    const response = await fetch(
      "https://mocki.io/v1/68f88502-a805-4d24-a407-ee2a232a5c60"
    );
    return response.json();
  }
);

const rewardsSlice = createSlice({
  name: "rewards",
  initialState: {
    rewards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.rewards = action.payload;
      })
      .addCase(fetchRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Global function to calculate total points
export const calculateTotalPoints = (rewards) => {
  return rewards.reduce((acc, curr) => acc + curr.rewardPoints, 0);
};

export default rewardsSlice.reducer;
