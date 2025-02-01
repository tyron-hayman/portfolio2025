"use client";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAsterisk,
  faHandSparkles,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import AnimatedIcon from "./AnimatedIcon";
import Section from "./Section";
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
    <div className={`landing_wrapper relative h-[95vh] flex items-center justify-center`}>
      <div className="relative container mx-auto">
        <div className="container relative z-2 pointer-events-none">
          {pageData.pageData ? (
            <h1
              className="text-[13vw] md:text-[8vw] font-bold text-white uppercase bondini"
              dangerouslySetInnerHTML={{
                __html:
                  pageData.pageData.pages.nodes[0].homepage.initialBox.mainText,
              }}
            ></h1>
          ) : null}
        </div>
      </div>
    </div>
  );
}
