import { useState } from "react";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";
//import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import { Outlet } from "react-router-dom";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

export default function RootLayot() {
  const [searched, setSearched] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const opts = {
    enableMouseEvents: true, // Enable mouse events in addition to touch events (optional)
    enableKeyboardEvents: true, // Enable keyboard events in addition to touch events (optional)
    touchSlop: 10, // The number of pixels a user's touch can start away from the draggable element (optional)
    scrollAngleRanges: [
      { start: 45, end: 135 }, // Define angle ranges where touch scrolling is allowed (optional)
      { start: -135, end: -45 },
    ],
  };

  return (
    <div className="relative">
      <Nav />
      <DndProvider backend={HTML5Backend}>
        <Homepage />
      </DndProvider>
    </div>
  );
}
