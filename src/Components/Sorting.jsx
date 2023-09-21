import React, { useState, useEffect , useContext} from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import FetchedImg from "./FetchedImg";
import popup from './popup'
import { UserContext } from "../assets/UserContext";



export default function SortableImage({ image, tags, id, likes, user ,isLoading }) {
  const { authUser } = useContext(UserContext);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    over,
  } = useSortable({ id });

  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showDragMessage, setShowDragMessage] = useState(false);

  const handleDragMove = (event) => {
    if (isDragging  ) {
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
    setIsDraggingOver(false);
  };

  const isOverlapping = over && over.id !== id && isDragging;

  const style = {
    transform: isDragging ? "scale(1.1)" : transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : "",
    transition: transition || (isDragging ? "all 0.8s" : ""),
    opacity: isOverlapping ? 0.9 : isDragging ? 0.7 : 1,
    zIndex: isOverlapping ? -1 : 2,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onMouseEnter={() => setIsDraggingOver(true)}
      onMouseLeave={() => setIsDraggingOver(false)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {isDragging && (
       <div classNames="absolute top-0 bg-primary text-white text-3xl z-[444]"> <popup message="Drag me!" isVisible={true} /></div>
      )}
      {isDraggingOver && isDragging && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            transform: CSS.Transform.toString(transform),
            pointerEvents: "none",
            top: cursorPosition.y - 25,
            left: cursorPosition.x - 25,
          }}
        >
          <img
            src={image}
            alt={tags}
            width={50}
            height={50}
            style={{
              opacity: isOverlapping ? 0.5 : 0.7,
            }}
          />
        </div>
      )}
      {/* Your existing image component */}
      <FetchedImg image={image} tags={tags} id={id} likes={likes} user={user} isLoading={isLoading} />
    </div>
  );
}