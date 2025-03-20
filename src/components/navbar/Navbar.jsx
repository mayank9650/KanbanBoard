import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <h2>Kanban Board</h2>
        {/* Add routing here */}
        <ul className="nav-links">
          <li>Home</li>
        </ul>
      </div>
    </nav>
  );
}
