import React, { useState, useEffect , useContext} from "react";
import usePage from "../assets/usePage";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import SortableImage from "./Sorting"
import { UserContext } from "../assets/UserContext";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import FetchedImg from "./FetchedImg";

export default function Homepage() {
  const { authUser } = useContext(UserContext);
  const [responseImage, setResponseImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPage] = useState("");
  const [toggle, setToggle] = useState();
  const [items, setItems] = useState([]);
  const [loginMsg, setLoginMsg] = useState(false);
  const [dragMsg, setDragMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
const {
  pages,
  setPages,
  setCurrentPage,
  currentPage
} = usePage(totalPages);

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;
const perPage = 24

useEffect(() => {
  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}?key=${apiKey}&q=${searchTerm || 'nature'}&page=${currentPage}&per_page=${perPage}`)
      if (response.ok) {
        const data = await response.json();
        const { hits, totalHits } = data;
        setResponseImage(hits);
        setTotalPage(totalHits);
        console.log(data); // Log the entire data object
      } else {
        console.error('Failed to fetch data from Pixabay API');
      }
    } catch (err) {
      console.error('An error occurred while fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }

  fetchData();
}, [toggle, currentPage ,authUser]);


  const handleChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
  };

  const handleDragEnd = ({ active, over }) => {
    
    if (authUser !== null){
    if (active?.id !== over?.id) {
      setDragMsg(true)
      setTimeout(() => {
        setDragMsg(false)
        }, [4000])
    
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        const [movedItem] = updatedItems.splice(oldIndex, 1);
        updatedItems.splice(newIndex, 0, movedItem);
        return updatedItems;
      });
    }
  }
    else{
      setLoginMsg(true)
      setTimeout(() => {
        setLoginMsg(false)
        }, [4000])
    }
  }

  useEffect(() => {
    setItems(
      responseImage.map((o) => ({
        id: o?.id,
        image: o?.webformatURL,
        tags: o?.tags,
        likes: o?.likes,
        user: o?.user,
      }))
    );
  }, [responseImage]);

  return (
    <div className="relative top-12 p-2">
      <h1 className="header-text tracking-[5px] text-3xl font-bold mt-[3rem] font-mono m-6 flex items-center justify-center">
        EXPLORE THE BEAUTIFUL NATURE OF IMAGES
      </h1>
      <div className="relative p-4 flex mb-6 flex-col justify-center gap-5">
        <input
          type="search"
          className="text-primary text-md  max-w-[500px] mx-auto rounded-full w-full p-2 search"
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
   {loginMsg &&  <p className= " poplogin fixed inset-x-0 z-[20] text-white py-1 px-3 md:text-lg  text-md mx-auto w-fit bg-primary font-semibold m-8"> You Moved An Image </p>  }
   
      {dragMsg && <p className= " poplogin fixed inset-x-0 z-[20] text-white py-1 px-3 md:text-lg  text-md mx-auto w-fit bg-primary font-semibold m-8"> You Moved An Image </p>  }
      
      
      <div className="flex relative items-start gap-2">
        
     
        <DndContext onDragEnd={ handleDragEnd}>
          <ul className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full items-center mx-auto`}>
            {items.map((item) => (
              <SortableImage
                key={item.id}
                id={item.id}
                image={item.image}
                tags={item.tags}
                likes={item.likes}
                user={item.user}
                isLoading= {isLoading}
              />
            ))}
          </ul>
        </DndContext> 
                </div>
        
        {responseImage.length < 1 && searchTerm && <p  className="text-white text-3xl w-full flex justify-center text-secondary">  No Results Found </p>}
 
        
               <ul className="flex flex-wrap items-center justify-center gap-2">
       { responseImage && pages?.map((o => <li key={o} onClick = { () => setCurrentPage(o)} 
       className={`p-3 text-center
     min-w-[50px] text-white shadow-secondary  shadow-sm ${currentPage === o ?'border-2 border-action shadow-none  rounded-b-md':null}`}>{o}</li> ))}
      </ul>
    </div>
  );
}
