"use client";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import images from "../../../data/beeldToenEnNu.json";

const Beeld = () => {

  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);

  const t = useTranslations("beeld");

  const sortedImages = [...images].sort((a, b) => a.jaar - b.jaar); // Keep import array immutable -> [...copy_array_first]

  const addSlide = (imageObject) => {
    slides.length = 0;
    slides.push(imageObject);

    console.log(imageObject)
  };

  return (
    <>
      <div className="text-lg font-semibold tracking-wide">
        <div className="flex w-full items-center gap-2 rounded-md bg-white py-2 pl-4 text-yellow-950 max-xsm:text-base">
          <span>{t("titel")}</span>
          <span className="max-xsm:hidden">{t("1900heden")}</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))] gap-2">
        {sortedImages.map((image, index) => (
          <div
            key={index}
            className="relative h-[260px] border border-white"
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
    </>
  );
};

export default Beeld;
