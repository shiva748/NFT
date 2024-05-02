import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: "",
    web3: "",
    nft: "",
    token: "",
  },
  reducers: {
    updateaccount: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateaccount } = accountSlice.actions;
export default accountSlice.reducer;
