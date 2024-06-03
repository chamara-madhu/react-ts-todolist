"use client";

import React from "react";
import TodoList from "./screens/TodoList";
import TodoForm from "./screens/TodoForm";
import CommonLayout from "../../layouts/CommonLayout";

const HomeMain = () => {
  return (
    <CommonLayout>
      <div className="flex flex-col sm:flex-row items-start gap-7">
        <TodoForm />
        <TodoList />
      </div>
    </CommonLayout>
  );
};

export default HomeMain;
