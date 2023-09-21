import { useState } from "react";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";
//import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
import { DndProvider, useDrag } from "react-dnd";
import { DndContext } from "react-dnd";

export default function RootLayot() {
  const [searched, setSearched] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="relative">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
