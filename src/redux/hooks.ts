import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./reducers/index";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;