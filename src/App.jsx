import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <KanbanBoard></KanbanBoard>
    </>
  );
}

export default App;
