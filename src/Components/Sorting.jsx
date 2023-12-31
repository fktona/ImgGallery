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
    const [isReducedWidth, setIsReducedWidth] = useState(false);
    
  const handleDragMove = (event) => {
    // if (isDragging  ) {
    // const { clientX, clientY } = event;
    // setCursorPosition({ x: clientX, y: clientY });
    // }
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
  
};


  const handleDragEnd = () => {
   
    setShowDragMessage(false);
    setIsDraggingOver(false);
  };

  const isOverlapping = over && over.id !== id && isDragging;

  const styles = {
  //transform: isDragging ? "scale(1.1) translate(5px ,5px)" : transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : CSS.Transform.toString(transform),
transform: CSS.Transform.toString(transform),
transition: (isDragging ? "all 0.6s" : "0.8s"),
opacity: isOverlapping ? 0.7: isDragging ? 0.7 : 1,
  zIndex: isOverlapping ? 20: 1,
};


  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={styles}
    onMouseEnter={() => setIsDraggingOver(true)}
      onMouseLeave={() => setIsDraggingOver(false)}
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    >

      {isDraggingOver &&isDragging && (
        <div
          style={{
           position: "absolute",
         //   zIndex: 10000,
         
       //   transform: CSS.Transform.toString(transform),
          transition: "all 0.4s linear",
            pointerEvents: "none",
            top: cursorPosition.y - 25,
            left: cursorPosition.x - 25,
          }} 
        >
          <img
            src={image}
            alt={tags}
            width={250}
            height={250}
          style={{
              //opacity: isOverlapping ? 1 : 1,
            //position: 'relative',
              zIndex:100,
           }}
          />
        </div>
      )}
      {/* Your existing image component */}
      <FetchedImg image={image} tags={tags} id={id} likes={likes} user={user} isLoading={isLoading} />
    </div>
  );
}