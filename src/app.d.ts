declare global {
  declare type RootState = import("./app/providers/withStore").RootState;
  declare type AppDispatch = import("./app/providers/withStore").AppDispatch;
}

export {};
