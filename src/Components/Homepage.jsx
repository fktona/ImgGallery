import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { MdFavorite } from "react-icons/md";
import { searchResult } from "../assets/resource";
import {CSS} from "@dnd-kit/utilities";
import FetchedImg from "./FetchedImg";
import CustomPopup from "./popup"; // Import the custom popup component

function SortableImage({ image, tags, id, likes, user }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showDragMessage, setShowDragMessage] = useState(false);
  const [showDropMessage, setShowDropMessage] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging, over } =
    useSortable({ id });

  const handleDragMove = (event) => {
    if (isDragging) {
      const { clientX, clientY } = event;
      setCursorPosition({ x: clientX, y: clientY });
    }
  };

  useEffect(() => {
    const dragMoveListener = (event) => {
      handleDragMove(event);
    };

    document.addEventListener("mousemove", dragMoveListener);

    return () => {
      document.removeEventListener("mousemove", dragMoveListener);
    };
  }, [isDragging]);

  const handleDragStart = () => {
    setShowDragMessage(true);
  };

  const handleDragEnd = () => {
    setShowDragMessage(false);
    setShowDropMessage(false);
  };

  const isOverlapping = over && over.id !== id;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: isDragging
          ? "scale(1.1)"
          : transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : "",
        transition: transition || (isDragging ? "transform 0.2s" : ""),
        opacity: isDraggingOver ? 0.5 : isDragging ? 0.7 : 1,
        zIndex: isDraggingOver ? -1 : 1,
      }}
      onMouseEnter={() => setIsDraggingOver(true)}
      onMouseLeave={() => setIsDraggingOver(false)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CustomPopup message="Drag me!" isVisible={showDragMessage} />
      {isDraggingOver && isDragging && (
        <div
          style={{
            position: "fixed",
            zIndex: 1000,
            pointerEvents: "none",
            top: cursorPosition.y - 25,
            left: cursorPosition.x - 25,
          }}
        >
          <img
            src={over.image}
            alt={over.tags}
            width={50}
            height={50}
            style={{
              transform: "scale(0.7)",
              opacity: 0.5,
            }}
          />
        </div>
      )}
      <CustomPopup message="Drop me here!" isVisible={showDropMessage} />
              
      <FetchedImg image={image} tags={tags} id={id} likes={likes} user={user} />
    </div>
  );
}


export default function Homepage() {
  const [responseImage, setResponseImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await searchResult({ q: searchTerm || "nature" });
        setResponseImage(response.hits);
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, [toggle]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
  };

  const handleDragEnd = ({ active, over }) => {
    if (active?.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        const [movedItem] = updatedItems.splice(oldIndex, 1);
        updatedItems.splice(newIndex, 0, movedItem);
        return updatedItems;
      });
    }
  };

  useEffect(() => {
    setItems(
      responseImage.map((o) => ({
        id: o.id,
        image: o.webformatURL,
        tags: o.tags,
        likes: o.likes,
        user: o.user,
      }))
    );
  }, [responseImage]);

  return (
    <div className="relative top-12 p-2">
      <h1 className="header-text text-3xl font-bold mt-[3rem] font-mono m-6 flex items-center justify-center">
        EXPLORE THE BEAUTIFUL NATURE OF IMAGES
      </h1>
      <div className="relative p-2 flex flex-col justify-center gap-5">
        <input
          type="search"
          className="text-primary max-w-[500px] mx-auto rounded-full w-full p-2 search"
          placeholder="search"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          onClick={() => setToggle((prev) => !prev)}
          className="relative px-1 bg-primary text-sm text-white py-1 mx-auto w-fit rounded hover:bg-primary linear text-white"
        >
          Search
        </button>
      </div>
      <div className="flex relative items-start gap-2">
        <DndContext onDragEnd={handleDragEnd}>
          <ul className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-[90vw] mx-auto`}>
            {items.map((item) => (
              <SortableImage
                key={item.id}
                id={item.id}
                image={item.image}
                tags={item.tags}
                likes={item.likes}
                user={item.user}
              />
            ))}
          </ul>
        </DndContext>
      </div>
    </div>
  );
}
