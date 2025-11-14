"use client"
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { ChevronDown } from "lucide-react";

const Description = ({ naam }) => {

  const [expand, setExpand] = useState(false);
  const textRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState(0)
  const [showChevron, setShowChevron] = useState(false);

// 👉 responsive collapsed height
  const [collapsedHeight, setCollapsedHeight] = useState(
    window.innerWidth < 618 ? 150 : scrollHeight
  );


  useLayoutEffect(() => {

    const mq = window.matchMedia("(max-width: 618px)");

  const updateSizes = () => {
    // responsive collapsed height
    const newCollapsedHeight = mq.matches ? 150 : 74;
    setCollapsedHeight(newCollapsedHeight);

    // recalc scrollHeight for new width
    if (textRef.current) {
      const sh = textRef.current.scrollHeight;
      setScrollHeight(sh);

      // decide Chevron visibility
      setShowChevron(sh > newCollapsedHeight);
    }
  };

  updateSizes();
  mq.addEventListener("change", updateSizes);

  return () => mq.removeEventListener("change", updateSizes);
  }, [naam.desc, collapsedHeight]);


return (
    <>
      <div
        ref={textRef}
        className="mt-2 text-yellow-900 overflow-hidden transition-all duration-500"
        style={{
          maxHeight: expand
            ? `${scrollHeight}px`
            : `${collapsedHeight}px`,
        }}
      >
        {naam.desc}
      </div>
      
      {showChevron && (
        <div
          className="flex w-full cursor-pointer justify-center mt-1"
          onClick={() => setExpand(!expand)}
        >
          <ChevronDown
            color="#713f12"
            size={30}
            className={`transition-transform duration-300 ${
              expand ? "rotate-180" : ""
            }`}
          />
        </div>
      )}
    </>
  );
};

export default Description;
