"use client";

import Image from "next/image";
import Link from "next/link";

// const currentUser = getCurrentUser();

export function TestComp({ currentUser }) {
  return (
    <div className="flex gap-2">
      <h2>Global error handling testers</h2>
      <button
        onClick={() => {
          console.log("throwing error");
          throw new Error("Test Error");
        }}
      >
        Trigger Error
      </button>

      <button
        onClick={() => Promise.reject(new Error("Test Promise Rejection"))}
      >
        Trigger Promise Rejection
      </button>

      <div className="wrapper relative h-80">
        <div
          className=" flex h-full w-80 overflow-hidden
        scroll-smooth
        border-[10px] 
        
        border-green-600 [scroll-snap-type:x_mandatory]"
        >
          <div
            className="relative h-full flex-[1_0_100%] snap-start border
          border-red-400
          "
          >
            <Image
              id="image-1"
              src={currentUser.artist.mainImage}
              alt="prfile pic"
              fill
              className=" object-cover"
            />
          </div>
          <div className="relative h-full flex-[1_0_100%] snap-start border border-red-400">
            <Image
              id="image-2"
              src={currentUser.artist.mainImage}
              alt="prfile pic"
              fill
              className=" object-cover"
            />
          </div>
          <div className="relative h-full flex-[1_0_100%] snap-start border border-red-400">
            <Image
              id="image-3"
              src={currentUser.artist.mainImage}
              alt="prfile pic"
              fill
              className=" object-cover"
            />
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
          <Link
            className="button h-2 w-2  rounded-full  bg-white"
            href={"#image-1"}
          />
          <Link
            className="button h-2 w-2 rounded-full  bg-white"
            href={"#image-2"}
          />
          <Link
            className="button h-2 w-2 rounded-full  bg-white"
            href={"#image-3"}
          />
        </div>
      </div>
    </div>
  );
}
