import React, { memo } from "react";
import Task from "../Task/Task"
import { Droppable } from "react-beautiful-dnd";
import "./column.css";

const Column = ({
  columnId,
  columnTasks,
  startEditing,
  deleteTask,
  editingTask,
  saveEdit,
  editedTitle,
  setEditedTitle,
  editedDescription,
  setEditedDescription,
}) => (
  <Droppable droppableId={columnId}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="kanban-column"
      >
        <h2>{columnId}</h2>
        {columnTasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            index={index}
            columnId={columnId}
            startEditing={startEditing}
            deleteTask={deleteTask}
            editingTask={editingTask}
            saveEdit={saveEdit}
            editedTitle={editedTitle}
            setEditedTitle={setEditedTitle}
            editedDescription={editedDescription}
            setEditedDescription={setEditedDescription}
          />
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default memo(Column);
