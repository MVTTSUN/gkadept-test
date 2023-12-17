import { ReactNode } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { SliceName } from "../../shared/const";
import { companiesSlice } from "../../shared/model/companies";

const rootReducer = combineReducers({
  [SliceName.Companies]: companiesSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export const withStore = (component: () => ReactNode) => () => {
  return <Provider store={store}>{component()}</Provider>;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
