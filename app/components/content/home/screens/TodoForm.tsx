"use client";

import React, { useCallback, useState } from "react";
import Button from "@/app/components/shared/buttons/Button";
import Input from "@/app/components/shared/fields/Input";
import TypeOrSelect from "@/app/components/shared/fields/TypeOrSelect";
import { STATUS, STATUSES } from "@/app/constant/general";
import { toast } from "react-toastify";
import TaskService, { TaskItem } from "@/app/services/task.service";
import { getAllTasks } from "@/app/redux/features/taskSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";

const initialForm: TaskItem = {
  title: "",
  status: STATUS.NOT_DONE,
};

const initialErrors = {
  titleErr: "",
  statusErr: "",
};

const TodoForm = () => {
  const [form, setForm] = useState<TaskItem>(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = useCallback((e: any) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevForm) => ({
      ...prevForm,
      [name + "Err"]: "",
    }));
  }, []);

  const isValid = () => {
    let titleErr = "";
    let statusErr = "";

    if (!form.title) {
      titleErr = "Title is required.";
    }

    if (!form.status) {
      statusErr = "Status is required";
    }

    if (titleErr || statusErr) {
      setErrors({
        ...errors,
        titleErr,
        statusErr,
      });

      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid()) return;
    setLoading(true);

    try {
      const res = await TaskService.createTask(form);
      setForm(initialForm);
      dispatch(getAllTasks());
      toast.success("TODO task has been submitted.");
    } catch (error) {
      console.log({ error });
      toast.error("TODO task has not been submitted");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-purple-200 p-7 rounded-xl w-full md:w-[35%]">
      <h1 className="mb-4 text-xl font-bold">TODO task Submission</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-7">
          <Input
            label="Title"
            name="title"
            value={form.title}
            handleChange={handleChange}
            error={errors.titleErr}
            showRequiredLabel
          />

          <TypeOrSelect
            label="Status"
            name="status"
            labelClass="tracking-[0.28px] text-pp-gray-700"
            className="flex-1 w-full"
            onChange={handleChange}
            options={STATUSES}
            value={form.status}
            error={errors.statusErr}
            showRequiredLabel
          />

          <div className="flex flex-row gap-3">
            <Button
              type="submit"
              variant="primary"
              className="w-[60%]"
              isLoading={loading}
            >
              Submit
            </Button>
            <Button
              type="reset"
              variant="light"
              className="w-[40%]"
              handleButton={() => {
                setForm(initialForm);
                setErrors(initialErrors);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
