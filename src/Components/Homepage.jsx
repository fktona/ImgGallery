import { auth } from "../assets/firebase";
import { useNavigate } from "react-router-dom";
import { searchResult } from "../assets/resource";
import { useState ,useEffect } from 'react'
import { DndProvider ,useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import FetchedImg from "./FetchedImg";
import { useDrop } from "react-dnd";

export default function Homepage () {
   const [newpos , setNewPos] = useState ([])
  const [{isOver}, drop] = useDrop(() => ({
    accept: "image",
    drop:(item) => rearrange(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const rearrange = (id) => {
    imageDrop = imageDrop.filter((o) => id === o.id)
    setNewPos( imageDrop)
  }

  const [responseImage , setResponseImage] = useState([])
  const [searchTerm , setSearchTerm] = useState("")
  const [toggle , setToggle] = useState()
  useEffect(() => {
   async function fetch (){
     try{
   
    const response = await searchResult( {q: searchTerm || "nature" })
    console.log(response)
    setResponseImage(response.hits)
     
  } catch (err){
     console.log(err)
   }
    
   }
   fetch()
   
    }, [toggle])
    
    const handleChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);

    console.log('Input value changed to: ' + inputValue);
  };
  
  
  return(
    <div className=' relative  top-6 p-2'>
    <div className=' relative p-2 flex flex-col justify-center gap-5 '>
<input
      type="search"
      className="text-primary max-w-[500px] mx-auto rounded-full w-full p-2 search"
      placeholder="search"
      value={searchTerm}
      onChange={handleChange}
    />
                   <button onClick={() => setToggle(prv => !prv)}
            className=" relative px-1 bg-primary text-sm  text-white py-1 mx-auto w-fit rounded hover:bg-primary linear text-white"
          > Search
          </button>
     
    </div>

     
     <ul ref={drop}  className={`grid  ${isOver && 'hidden'} grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      min-w-[100px] gap-8  `}>
     {responseImage.map((o)=> <FetchedImg  id={o.id} image={o.webformatURL} 
           tags={o.tags}/>)}</ul>
{/* <ul ref={drop}  className={`grid   grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      min-w-[100px] gap-8  `}>
     {newpos?.map((o)=> <FetchedImg  id={o.id} image={o.webformatURL} 
           tags={o.tags}/>)}</ul> */}
     
    </div>
    
    )
}