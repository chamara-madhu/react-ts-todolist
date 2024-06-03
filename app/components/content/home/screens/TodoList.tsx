"use client";

import { memo, useCallback, useEffect, useMemo } from "react";
import StatusIndicators from "@/app/components/shared/status-indicators/StatusIndicators";
import CommonTable from "@/app/components/shared/table/CommonTable";
import TaskService, { ResListItem } from "@/app/services/task.service";
import { toast } from "react-toastify";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { getAllTasks } from "@/app/redux/features/taskSlice";
import Search from "@/app/components/shared/fields/Search";
import Checkbox from "@/app/components/shared/fields/Checkbox";
import { STATUS } from "@/app/constant/general";

const TodoList = () => {
  const { tasks } = useAppSelector((state) => state.taskReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const handleStatusChange = useCallback(
    async (id: string, status: STATUS.DONE | STATUS.NOT_DONE) => {
      try {
        await TaskService.taskStatusChange(id, { status });
        dispatch(getAllTasks());
        toast.success("Task status has been updated.");
      } catch (error) {
        console.log({ error });
        toast.error("Task status has not been updated.");
      }
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this task?"
      );

      if (confirmed) {
        try {
          await TaskService.deleteTask(id);
          dispatch(getAllTasks());
          toast.success("Task has been deleted.");
        } catch (error) {
          console.log({ error });
          toast.error("Task has not been deleted.");
        }
      }
    },
    [dispatch]
  );

  const data: ResListItem[] | null = tasks?.length
    ? tasks.map((result, i) => ({
        no: i + 1,
        id: result.id,
        title: result.title,
        status: result.status,
      }))
    : null;

  const columns = useMemo(
    () => [
      { header: "No", accessor: "no", render: (item: ResListItem) => item.no },
      {
        header: "Title",
        accessor: "title",
      },
      {
        header: "Status",
        accessor: "status",
        render: (item: ResListItem) => (
          <div className="flex items-center w-[100px]">
            <Checkbox
              name="status"
              value={item.status === STATUS.DONE}
              onChange={() =>
                handleStatusChange(
                  item.id,
                  item.status === STATUS.DONE ? STATUS.NOT_DONE : STATUS.DONE
                )
              }
              className="h-10 m-0 text-sm cursor-pointer sm:h-8 text-pp-gray-900"
            >
              <StatusIndicators status={item.status} />
            </Checkbox>
          </div>
        ),
      },
      {
        header: "Action",
        accessor: "id",
        render: (item: ResListItem) => (
          <span
            className="text-sm hover:text-red-500 block w-[60x]"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </span>
        ),
      },
    ],
    [handleDelete, handleStatusChange]
  );

  return (
    <div className="w-full sm:w-[65%] p-6 overflow-x-auto bg-white border border-purple-200 rounded-xl">
      <h1 className="mb-4 text-xl font-bold">TODO List</h1>
      <div className="flex flex-col gap-7">
        <Search />
        <div className="sm:max-h-[60vh] overflow-auto">
          <CommonTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default memo(TodoList);
