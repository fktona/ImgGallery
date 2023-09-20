
import React, { useRef } from "react";
import {MdFavorite} from "react-icons/md"

export default function FetchedImg({ image, tags, id , likes , user}) {
  

  return (
    <div className={`cursor-pointer  relative `}>
      <li
        key={id}
       
      
        className="text-[10px] w-full relative font-semibold font-danc"
      >
        <img
          width={250}
          height={250}
          alt={tags}
          src={image}
          loading="lazy"
          className="lg:h-[400px] w-full relative h-[250px] object-cover"
        />
        <span className="relative flex flex-col
         items-center justify-center text-[12px] gap-3
         bottom-0 text-center min-h-[15%]
          bg-secondary   py-2 z-[2]"> 
          
          <span>{tags}</span> 
          <span className="font-mono"> Created by: {user}</span> </span>
          <span className=" flex items-center justify-start 
           text-lg font-popi gap-2
         top-0 text-center text-white min-h-[15%]
           w-full px-4 py-2 z-[2]">{likes} < MdFavorite /></span>

      </li>
    </div>
  );
}
