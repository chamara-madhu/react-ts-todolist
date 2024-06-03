import { STATUS } from "../constant/general";
import axios, { SuccessResponse } from "./index";

export type TaskItem = {
    title: string;
    status: STATUS.DONE | STATUS.NOT_DONE;
};

export type ListItem = TaskItem & {
    no: number;
};

export type ResListItem = TaskItem &
    ListItem & {
        id: string;
    };

const TaskService = {
    createTask: (data: TaskItem) =>
        axios.post<SuccessResponse<ListItem>>("/api/v1/tasks", data),
    getAllTasks: () => axios.get<SuccessResponse<ResListItem[]>>("/api/v1/tasks"),
    deleteTask: (id: string) =>
        axios.delete<SuccessResponse<string>>(`/api/v1/tasks/${id}`),
    searchTasks: (key: string) =>
        axios.get<SuccessResponse<string>>(`/api/v1/tasks/search?key=${key}`),
    taskStatusChange: (id: string, data: { status: STATUS.DONE | STATUS.NOT_DONE }) =>
        axios.put<SuccessResponse<ListItem>>(`/api/v1/tasks/${id}`, data),
};

export default TaskService;
