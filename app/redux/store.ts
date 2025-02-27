import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./features/taskSlice"
import { useSelector, TypedUseSelectorHook } from "react-redux"

export const store = configureStore({
    reducer: {
        taskReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;