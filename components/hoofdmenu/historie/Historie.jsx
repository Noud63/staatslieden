"use client"
import React,{useState} from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import TitleBar from "@/components/TitleBar";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const Historie = () => {

   const [open, setOpen] = useState(false);
   const [slides, setSlides] = useState([]);

  const t = useTranslations("historie");

  const addSlide = (imageObject) => {
    slides.length = 0;
    slides.push(imageObject);
  };


  return (
    <>
      <TitleBar title={t("titel")} />

      <div className="mx-auto w-full max-w-[960px] max-xl:max-w-full">
        <div className="mb-4 mt-4 flex w-full items-center justify-between rounded-md border-b-2 border-yellow-900 bg-yellow-700 px-4 py-2 text-lg shadow-lg max-xsm:text-base">
          Intro
        </div>
        <p className="mt-4 text-lg text-white max-xsm:text-base">
          {t.raw("content_a1")}
        </p>
        <br />

        <div className="mb-4 mt-4 flex w-full items-center justify-between rounded-md border-b-2 border-yellow-900 bg-yellow-700 px-4 py-2 text-lg shadow-lg max-xsm:text-base">
          {t("subtitel")}
        </div>

        <p className="mt-4 text-lg text-white max-xsm:text-base">
          {t.raw("content_a2")}
        </p>

        <div className="mt-1 text-lg text-white max-xsm:text-base">
          <p className="pb-4">{t.raw("content_a3").slice(0, 5)}</p>
          <div
            className="max-xsmd:w-full max-xsmd:pb-4 max-xsmd:mb-4 float-left mr-3 mt-2 w-[280px] bg-white p-2"
            onClick={() =>
              addSlide({
                src: "/images/Sloten_1750.jpg",
                title: "Sloten en Amsterdam 1750",
              })
            }
          >
            <Image
              src="/images/Sloten_1750.jpg"
              alt="Staatsliedenbuurt"
              width={280}
              height={0}
              className="max-xsmd:w-full float-left h-auto w-[280px] cursor-pointer pb-1"
              onClick={() => setOpen(true)}
            />

            <div className="bg-white text-base text-yellow-950">
              <span> {t("kaart_1")}</span>
            </div>
          </div>
          <p>{t.raw("content_a3").slice(5, 10)}</p>
          <p>{t.raw("content_a3").slice(10, t.raw("content_a3").length)}</p>
        </div>

        <div className="mb-4 mt-8 flex w-full items-center justify-between rounded-md border-b-2 border-yellow-900 bg-yellow-700 px-4 py-2 text-lg shadow-lg max-xsm:text-base">
          Moderne tijd
        </div>

        <div className="mt-4 text-lg text-white max-xsm:text-base">
          <p className="pb-4">{t.raw("content_a4").slice(0, 4)}</p>

          <div
            className="max-xsmd:w-full max-xsmd:mb-4 float-start mr-3 mt-2 w-[280px] bg-white p-2"
            onClick={() =>
              addSlide({
                src: "/images/amsterdam_1860.jpg",
                title: "Amsterdam 1860",
              })
            }
          >
            <Image
              src="/images/amsterdam_1860.jpg"
              alt="Staatsliedenbuurt"
              width={280}
              height={0}
              className="max-xsmd:w-full h-auto w-[280px] cursor-pointer pb-1"
              onClick={() => setOpen(true)}
            />

            <div className="bg-white pl-2 text-base text-yellow-950">
              <span> {t("kaart_2")}</span>
            </div>
          </div>
          <p className="mb-4">{t.raw("content_a4").slice(4, t.raw("content_a4").length)}</p>
        </div>

        <div
          className="max-xsmd:w-full max-xsmd:mb-4 float-start mr-3 mt-2 w-[280px] bg-white p-2"
          onClick={() =>
            addSlide({
              src: "/images/amsterdam_1940.jpg",
              title: "Amsterdam 1940",
            })
          }
        >
          <Image
            src="/images/amsterdam_1940.jpg"
            alt="Staatsliedenbuurt"
            width={280}
            height={0}
            className="max-xsmd:w-full h-auto w-[280px] cursor-pointer pb-1"
            onClick={() => setOpen(true)}
          />

          <div className="bg-white text-base text-yellow-950">
            <span> {t("kaart_3")}</span>
          </div>
        </div>

        <div className="text-lg text-white max-xsm:text-base">
          <p>{t.raw("content_a5")}</p>
        </div>

        <div className="mt-4 text-lg text-white max-xsm:text-base">
          <p>{t.raw("content_a6")}</p>
        </div>
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

export default Historie;
