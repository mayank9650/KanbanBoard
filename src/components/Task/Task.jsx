import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import Input from "../Shared/atoms/Input/Input";
import Button from "../Shared/atoms/Button/Button";
import "./task.css";

const Task = ({
  task,
  index,
  columnId,
  startEditing,
  deleteTask,
  editingTask,
  saveEdit,
  editedTitle,
  setEditedTitle,
  editedDescription,
  setEditedDescription,
}) => (
  <Draggable
    key={task.id}
    draggableId={task.id}
    index={index}
    isDragDisabled={editingTask === task.id}
  >
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...(editingTask !== task.id ? provided.dragHandleProps : {})}
        className="kanban-task"
      >
        {editingTask === task.id ? (
          <>
            <Input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Edit title"
              className="task-input"
            ></Input>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Edit description"
              className="task-input"
            />
            <Button
              className="save-btn"
              onClick={() => saveEdit(columnId, task.id)}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <h3 className="task-text">{task.title}</h3>
            <p className="task-text">{task.description}</p>
            <Button className="edit-btn" onClick={() => startEditing(task)}>
              Edit
            </Button>
          </>
        )}
        <Button
          className="delete-btn"
          onClick={() => deleteTask(columnId, task.id)}
        >
          Remove
        </Button>
      </div>
    )}
  </Draggable>
);

export default memo(Task);
