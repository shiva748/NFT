import { configureStore } from "@reduxjs/toolkit";
import account from "./Component/States/account";
export default configureStore({
  reducer: {
    account
  },
});
