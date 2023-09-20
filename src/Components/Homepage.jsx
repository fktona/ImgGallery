import { useNavigate } from "react-router-dom";
import { searchResult } from "../assets/resource";
import { useState, useEffect } from "react";
import FetchedImg from "./FetchedImg";

export default function Homepage() {
  const [responseImage, setResponseImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState();

  useEffect(() => {
    async function fetch() {
      try {
        const response = await searchResult({ q: searchTerm || "nature" });
        console.log(response);
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

  

  return (
    <div className="relative top-12 p-2">
      <h1 className="header-text text-3xl font-bold mt-[3rem] font-mono m-6 flex items-center 
      justify-center">EXPLORE THE BEAUTIFUL NATURE OF IMAGES</h1>
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
      <ul 
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-[90vw] mx-auto`}
      > {responseImage.map((o) => (
          <FetchedImg
            id={o.id}
            image={o.webformatURL}
            tags={o.tags}
            likes={o.likes}
            user={o.user}
            key={o.id}
          />
        ))}
      </ul>

     
      </div> 

    </div>
  );
}
