import axios from "axios";
import api from "../config/api";

export type ErrorResponse = {
    statusCode: number;
    message: string;
};

export type SuccessResponse<T = any | undefined> = {
    statusCode: number;
    data: T;
};

const instance = axios.create({
    baseURL: api.API_URL,
});

export default instance;
