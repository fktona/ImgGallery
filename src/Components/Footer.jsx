import { useState } from "react";
import {
  AiFillYoutube,
  AiFillTwitterSquare,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";

export default function Footer() {
  return (
    <div className="flex text-secondary flex-col font-lato relative mt-5 bottom-[-3.5rem] w-full justify-center items-center mt-5 gap-3 p-2">
      <div className="flex w-full gap-4 p-2 items-center justify-center ">
        <AiFillFacebook />
        <AiFillTwitterSquare />
        <AiFillInstagram />
        <AiFillYoutube />
      </div>
      <div className="flex w-full gap-4 p-2 items-center justify-center text-sm">
        <p>Condition of Use</p>
        <p>Privacy & Policy</p>
        <p>Press Room</p>
      </div>
      <p className="flex w-full  font-danc gap-4 p-2 items-center justify-center ">
        © 2023 Veiw Vault by Faith Adetona
      </p>
    </div>
  );
}
