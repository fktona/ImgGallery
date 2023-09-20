import { useDrag } from "react-dnd";
import React, { useRef } from "react";

export default function FetchedImg({ image, tags, id }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const imageRef = useRef(null);

  // Apply the "undragged" class conditionally based on isDragging state
  const imgClass = isDragging ? "opacity-50" : "";

  return (
    <div className={`cursor-pointer ${imgClass}`}>
      <li
        key={id}
        ref={(node) => {
          drag(node);
          imageRef.current = node;
        }}
        className="text-[10px] font-semibold font-danc"
      >
        <img
          width={250}
          height={250}
          alt={tags}
          src={image}
          loading="lazy"
          className="h-[50%] w-[50%] object-fill"
        />
        <span>{tags}</span>
      </li>
    </div>
  );
}
