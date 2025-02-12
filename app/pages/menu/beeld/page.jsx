"use client";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Image from "next/image";

import images from "../../../../data/beeldToenEnNu.json";

const BeeldPage = () => {

      const [open, setOpen] = useState(false);
      const [slides, setSlides] = useState([]);
      
      const sortedImages = images.sort((a, b) => a.jaar - b.jaar);

      const addSlide = (imageObject) => {
        slides.length = 0;
        slides.push(imageObject);
      };

return (
    <div className="m-auto mt-8 max-w-[1980px] px-6 text-white max-sm:mt-4 max-sm:px-4">
      <div className="text-lg font-semibold tracking-wide">
        <div className="flex w-full items-center gap-2 rounded-md bg-white py-2 pl-4 text-yellow-950 max-xsm:text-base">
          <span>De Staatsliedenbuurt in beeld</span>
          <span className="max-xsm:hidden">(1900-heden)</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {sortedImages.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-[260px] overflow-hidden border border-white max-sm:h-full"
            onClick={() => addSlide(image)}
          >
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                height={300}
                width={300}
                priority="lazy"
                className="h-full w-full cursor-pointer object-cover px-4 pb-12 pt-4"
                onClick={() => setOpen(true)}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm text-white">
              {image.info}
            </div>
          </div>
        ))}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          plugins={[Zoom, Captions]}
          zoom={{
            scrollToZoom: true,
            maxZoomPixelRatio: 5,
          }}
          slides={slides}
          carousel={{ finite: slides.length <= 1 }}
          render={{
            buttonPrev: slides.length <= 1 ? () => null : undefined,
            buttonNext: slides.length <= 1 ? () => null : undefined,
          }}
          styles={{
            container: {
              backgroundColor: "rgb(66, 32, 6, 0.8)",
            },
          }}
        />
      </div>
    </div>
  );
};

export default BeeldPage;
