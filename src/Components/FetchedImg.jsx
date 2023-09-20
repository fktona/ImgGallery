import { useDrag } from "react-dnd"

export default function FetchedImg({ image , tags ,  id }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item:{id: id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
      
      console.log(isDragging)
      
  return (
    <div>
<li key={id} ref={drag}
     
     className={`${isDragging ? 'w-8 text-white':'opacity-100'} mt- bg-red-300 text-[10px]
      font-semibold md:text-lg font-danc`}> 
       <img width={250} 
        height={250} alt={tags} 
        src={image} loading="lazy" 
        className="h-[100%] w-[100%] object-fill " />
        <span>{(tags).toUpperCase()}</span></li>
    

    </div>
  )
}
