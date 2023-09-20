import { auth } from "../assets/firebase";
import { useNavigate } from "react-router-dom";
import { searchResult } from "../assets/resource";
import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FetchedImg from "./FetchedImg";

export default function Homepage() {
  const [newpos, setNewPos] = useState([]);
  const [responseImage, setResponseImage] = useState([]);
  const [dubImage, setDubImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState();

  useEffect(() => {
    async function fetch() {
      try {
        const response = await searchResult({ q: searchTerm || "nature" });
        console.log(response);
        setDubImage(response.hits);
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

    console.log("Input value changed to: " + inputValue);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => rearrange(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const rearrange =  (id) => {
    console.log(id);
    const imageDrop =  responseImage.filter((o) => id === o.id);
    responseImage.length > 0 &&
    setNewPos((bord) => [...bord, imageDrop[0]]);
    console.log(newpos)
    if (imageDrop) {
      setResponseImage((prev) => prev.filter((o) => o.id !== id));
    }
  };

  return (
    <div className="relative top-12 p-2">
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

      <ul
        className={`grid -container grid-cols-6 border-2  border-primary  p-4 w-[95vw] mx-auto`}
      >
        {responseImage.map((o) => (
          <FetchedImg
            id={o.id}
            image={o.webformatURL}
            tags={o.tags}
            key={o.id}
          />
        ))}
      </ul>

      <ul
        ref={drop}
        className={`grid border-2 m-8 border-primary min-h-[40vh] p-4 w-[90vw] mx-auto
         grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-w-[100px] gap-2`}
      >
        {" "}
        {newpos.length > 0 ? (
          newpos?.map((o) => (
            <FetchedImg
              id={o.id}
              image={o.webformatURL}
              tags={o.tags}
              key={o.id}
            />
          ))
        ) : (
          <h2
            className="text-3xl place-items-center mx-auto text-gray-300/[0.5] absolute
         text-center w-full font-mono font-bold"
          >
            DRAG IMAGE HERE TO REARRANGE
          </h2>
        )}
      </ul>
    </div>
  );
}
