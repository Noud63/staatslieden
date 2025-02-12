"use client";
import React, { useEffect, useState } from "react";
import getWeatherData from "@/utils/getWeatherData";
import Image from "next/image";

const Weatherreport = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data } = await getWeatherData();
      setWeather(data);
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col items-center pr-4 max-xsm:items-end mr-8 max-sm:mr-0 max-sm:pr-0">
        <div
          className={
            weather.temp === undefined
              ? "hidden"
              : "flex items-center text-2xl text-white max-xsm:text-base"
          }
        >
          {`${weather.temp}\xB0C`}
          {weather.icon && (
            <Image
              src={weather?.icon}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="h-[55px] w-[55px] max-sm:h-[40px] max-sm:w-[40px] max-xsm:hidden"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Weatherreport;
