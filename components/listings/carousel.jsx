"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Carousel({ images }) {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const next = () => {
    setCurrentPhoto((currentPhoto + 1) % images.length);
  };

  const prev = () => {
    setCurrentPhoto((currentPhoto - 1) % images.length);
  };

  return (
    <div className="relative inset-0 -left-4 flex aspect-square overflow-hidden">
      <div className="h-96 w-96">
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          //TODO:  What about when there is not image??
          src={images[0]}
          alt="profile picture"
          className="object-cover"
        />
      </div>
      <div className="h-96 w-96">
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          //TODO:  What about when there is not image??
          src={images[0]}
          alt="profile picture"
          className="object-cover"
        />
      </div>
      <div className="h-96 w-96">
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          //TODO:  What about when there is not image??
          src={images[0]}
          alt="profile picture"
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-1/3 flex w-full justify-between">
        <ChevronLeft className="rounded-full  text-white" />
        <ChevronRight className="rounded-full  text-white" />
        {/* <ChevronRight /> */}
      </div>
    </div>
  );
}
