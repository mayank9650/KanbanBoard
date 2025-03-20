import React, { memo } from "react";
import Input from "../Shared/atoms/Input/Input";
import Button from "../Shared/atoms/Button/Button";
import './addTask.css';

const AddTask = ({
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  addTask,
}) => (
  <div className="kanban-add-task">
    <Input
      type="text"
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      placeholder="Enter task title"
      className="add-task-input"
    ></Input>
    <textarea
      value={newDescription}
      onChange={(e) => setNewDescription(e.target.value)}
      placeholder="Enter task description"
      className="add-task-input"
    />
    <Button onClick={addTask}>Add Task</Button>
  </div>
);

export default memo(AddTask);
