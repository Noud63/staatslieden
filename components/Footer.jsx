"use client"
import React, { useEffect, useState } from "react";
import getWeatherData from "@/utils/getWeatherData";

const Footer = () => {
//  const [data1, setData] = useState({});

//  useEffect(() => {
//    const getData = async () => {
//      const { result} = await getWeatherData();
//      setData(result);
     
//    };
//    getData();
//  }, []);

//  "https://openweathermap.org/img/w/02d.png";

//  console.log("Data:", data1);

  return (
    <div className="mt-40 flex h-[500px] w-full items-center justify-center bg-black text-xl text-yellow-800">
      footer
    </div>
  );
};

export default Footer;
