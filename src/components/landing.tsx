"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageDataContext from "@/lib/getPageData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const skillSet: Array<{ title: string; tech: Array<string> }> = [
  { title: "tech", tech: ["HTML", "CSS/SCSS", "Javascript", "PHP"] },
  {
    title: "Frameworks",
    tech: ["ReactJS", "ThreeJS ( Junior )", "NEXTJS", "jQuery"],
  },
  { title: "Workflow", tech: ["GIT", "Docker", "NPM"] },
  { title: "CMS", tech: ["Wordpress", "Sanity"] },
];

export default function Landing() {
  const pageData = useContext(PageDataContext);

  return (
    <div
      className={`landing_wrapper relative h-[100vh] flex items-center justify-center`}
    >
      <div className="relative container mx-auto px-5 md:px-0">
        <div className="container relative z-2 pointer-events-none">
          {pageData.pageData ? (
            <>
              <h1 className="text-6xl leading-6xl font-black text-white">
                {pageData.pageData.pages.nodes[0].homepage.initialBox.mainText}
              </h1>
              <h2 className="text-[14vw] leading-[14vw] text-white relative">
                <WordComponent data={pageData.pageData.pages.nodes[0].homepage.initialBox.mainTextArray} />
              </h2>
            </>
          ) : null}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-[2] mix-blend-difference">
        <div className="container pb-10 mx-5 md:mx-auto">
          <p className="text-white font-black text-xl inline-block">Scroll down for more <FontAwesomeIcon icon={faArrowDown} className="ml-5 animate-bounce"/></p>
        </div>
      </div>
    </div>
  );
}

const WordComponent = ({ data } : { data : any }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => prev < data.length - 1 ? prev + 1 : 0)
    }, 3000);

    return () => {
        clearInterval(intervalId);
    };
  }, [])

  return(
    <>
    {data.map((words : any, index : number) => {
      return(
        <Word key={`word${index}`} word={words.word} index={index} active={activeIndex} />
      )
    })}
    </>
  )
}

const Word = ({ word, index, active } : { word : string, index : number, active : number }) => {

  return(
    <motion.span 
      className={`${index == active ? 'relative' : 'absolute'} left-0 top-0 font-black capitalize`}
      animate={{ opacity : index == active ? 1 : 0 }}
      transition={{ duration : 0.75 }}
    >
      {word}
    </motion.span>
  )
}
