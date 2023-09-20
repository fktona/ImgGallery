import { auth } from "../assets/firebase";
import { useNavigate } from "react-router-dom";
import { searchResult } from "../assets/resource";
import { useState ,useEffect } from 'react'
import { DndProvider ,useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


export default function Homepage () {
  
  const [{ isDragging }, drag] = useDrag(() => ({
  type: "image",
  collect: (monitor) => ({
    isDragging: !!monitor.isDragging()
  })
}))

console.log(isDragging)


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

     
     <ul  className={`grid grid-cols-2 md:grid-cols-3 min-w-[100px] gap-8 ${isDragging ? 'opacity-25':'opacity-100'} `}>
     {responseImage.map((o)=> <li ref={drag}
     
     className=" mt-6 bg-red-300 text-[10px] font-semibold md:text-lg font-danc">  <img width={250} height={250} alt={o.tags} src={o.webformatURL} loading="lazy" className="h-[100%] w-[100%] object-fill " /><span>{(o.tags).toUpperCase()}</span></li>)}
     </ul>

     
    </div>
    
    )
}