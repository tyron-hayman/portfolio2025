"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import PageDataContext from "@/lib/getPageData";

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
    <div className={`landing_wrapper relative h-[100vh] flex items-center justify-center`}>
      <div className="relative container mx-auto px-5 md:px-0">
        <div className="container relative z-2 pointer-events-none">
          {pageData.pageData ? (
            <h1
              className="text-[13vw] sm:text-[8vw] md:text-[8vw] font-bold text-white uppercase bondini"
            >
              {pageData.pageData.pages.nodes[0].homepage.initialBox.mainText.split(" ").map((word : any, index : number) => {
                return(
                  <span key={`landingword${index}`} className="inline-block pr-10 overflow-hidden">
                    <motion.span 
                      className="block" 
                      animate={{ y : pageData.loading ? 200 : 0, opacity : pageData.loading ? 0 : 1 }} 
                      transition={{ duration : 0.75, ease : 'easeInOut', delay : 0.75 }}
                    >
                      {word}
                    </motion.span>
                  </span>
                )
              })}
            </h1>
          ) : null}
        </div>
      </div>
    </div>
  );
}
