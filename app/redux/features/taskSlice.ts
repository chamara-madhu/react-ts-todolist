// import TaskService, { ResListItem } from "@/app/services/task.service";
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// type InitialState = {
//     tasks: ResListItem[]
// };

// const initialState = {
//     tasks: [],
// } as unknown as InitialState;

// // Define an async thunk to handle the asynchronous operation
// export const getAllTasks = createAsyncThunk(
//     "getAllTasks",
//     async () => {
//         try {
//             const newData = await TaskService.getAllTasks();
//             return newData?.data?.data || [];
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             throw error; // Rethrow the error to be handled by the component or UI layer
//         }
//     }
// );

// export const {
//     // storePlaces
// } =
//     place.actions;
// export default place.reducer;

import TaskService, { ResListItem } from "@/app/services/task.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    tasks: ResListItem[];
};

const initialState: InitialState = {
    tasks: [],
};

// Define an async thunk to handle the asynchronous operation
export const getAllTasks = createAsyncThunk<ResListItem[] | any>(
    "tasks/getAllTasks",
    async () => {
        try {
            const response = await TaskService.getAllTasks();
            return response?.data || [];
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; // Rethrow the error to be handled by the component or UI layer
        }
    }
);

// Define an async thunk to handle the asynchronous operation
export const searchTasks = createAsyncThunk<ResListItem[] | any, string>(
    "tasks/searchTasks",
    async (key: string) => {
        try {
            const response = await TaskService.searchTasks(key);
            return response?.data || [];
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; // Rethrow the error to be handled by the component or UI layer
        }
    }
);

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTasks.fulfilled, (state, action: PayloadAction<ResListItem[]>) => {
            // Handle the successful result of the async operation
            state.tasks = action.payload;
        });
        builder.addCase(searchTasks.fulfilled, (state, action: PayloadAction<ResListItem[]>) => {
            // Handle the successful result of the async operation
            state.tasks = action.payload;
        });
    },
});

export default tasksSlice.reducer;

