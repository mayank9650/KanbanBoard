import React, { useState, useCallback, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../Column/Column";
import "./kanbanBoard.css";
import AddTask from "../AddTask/AddTask";
import { initialTasks, transformTasks } from "./helper";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchInitialTodo();
  }, []);

  const fetchInitialTodo = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/todos?limit=5&skip=0");
      const data = await res.json();
      const transformedData = transformTasks(data);
      setTasks(transformedData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching initial todos: ", err);
    }
  };

  const onDragEnd = useCallback((result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    setTasks((prevTasks) => {
      const newTasks = JSON.parse(JSON.stringify(prevTasks)); // Deep copy
      const sourceColumn = newTasks[source.droppableId];
      const destColumn = newTasks[destination.droppableId];
      const [movedTask] = sourceColumn.splice(source.index, 1);
      destColumn.splice(destination.index, 0, movedTask);

      return newTasks;
    });
  }, []);

  const addTask = useCallback(() => {
    if (!newTitle.trim() || !newDescription.trim()) return;
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [
        ...prevTasks.todo,
        {
          id: Date.now().toString(),
          title: newTitle,
          description: newDescription,
        },
      ],
    }));
    setNewTitle("");
    setNewDescription("");
  }, [newTitle, newDescription]);

  const startEditing = useCallback((task) => {
    setEditingTask(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  }, []);

  const saveEdit = useCallback(
    (columnId, taskId) => {
      if (!editedTitle.trim() || !editedDescription.trim()) return;
      setTasks((prevTasks) => ({
        ...prevTasks,
        [columnId]: prevTasks[columnId].map((task) =>
          task.id === taskId
            ? { ...task, title: editedTitle, description: editedDescription }
            : task
        ),
      }));
      setEditingTask(null);
      setEditedTitle("");
      setEditedDescription("");
    },
    [editedTitle, editedDescription]
  );

  const deleteTask = useCallback((columnId, taskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [columnId]: prevTasks[columnId].filter((task) => task.id !== taskId),
    }));
  }, []);

  return (
    <div className="kanban-container">
      <AddTask
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        addTask={addTask}
      />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban-board">
            {Object.entries(tasks).map(([columnId, columnTasks]) => (
              <Column
                key={columnId}
                columnId={columnId}
                columnTasks={columnTasks}
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
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default KanbanBoard;
