import React from "react";
import { MdFavorite } from "react-icons/md";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

export default function FetchedImg({ image, tags, id, likes, user , isLoading ,img }) {
  // You can define when to show the skeleton based on whether the image is available or not.

  return (
    <div className={`cursor-pointer  flex flex-col relative`}>
      <li key={id} className="text-[10px] h-full w-full relative font-semibold font-danc">
        {isLoading ? (
          // Skeleton Loading
          <>
            <SkeletonTheme baseColor="#202020" highlightColor="#444"  >
            <Skeleton width={200} height={230}  className="relative    " />
            <Skeleton width={200} height={70}  className="relative h-full " />
           
            </SkeletonTheme >
          </>
        ) : (
          // Image Content
          <>
            <img
              width={250}
              height={250}
              alt={tags}
              src={image || img}
              loading="lazy"
              className="lg:h-[400px] h-[100%] w-full relative min-h-[250px] object-cover"
            />
            <span className="relative text-white flex flex-col items-center justify-center font-bold text-[12px] gap-3 bottom-0 text-center  bg-secondary py-2 z-[2]">
              <span>{tags}</span>
              <span className="font-mono ">Created by: {user}</span>
            </span>
            <span className="flex bg-black/[0.5] w-fit absolute items-center justify-start text-lg font-popi gap-2 top-2 left-2 text-center text-white rounded-3xl px-2 py-1 z-[2]">
              {likes} <MdFavorite />
            </span>
          </>
        )}
      </li>
    </div>
  );
}
