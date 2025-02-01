"use client";
import React, { useContext, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import PageDataContext from "@/lib/getPageData";

export default function About() {
  const pageData = useContext(PageDataContext);
  const aboutWrapper = useRef(null);
  const aboutTitle = useRef(null);
  const aboutContent = useRef(null);
  const { scrollYProgress } = useScroll({
    target: aboutWrapper,
    offset: ["-0.5 start", "600px"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 175]);
  const y_sub = useTransform(scrollYProgress, [0, 1], [0, 275]);
  const isInView = useInView(aboutWrapper, { amount: 0.2, once: true });

  const handleHover = () => {
    pageData.setCursorState("images");
  };

  const handleHoverLeave = () => {
    pageData.setCursorState("");
  };

  return (
    <motion.div
      ref={aboutWrapper}
      className="relative w-full py-20 md:py-40"
      animate={{ y: isInView ? 0 : 50, opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {pageData.pageData ? (
        <div className="container mx-auto flex flex-wrap justify-between">
          <div className="w-full">
            <motion.h2
              ref={aboutTitle}
              className="text-white text-8xl leading-[8xl] mb-10 font-black bondini w-2/3"
              style={{ y }}
              transition={{ ease: "easeInOut" }}
            >
              {pageData.pageData.pages.nodes[0].homepage.about.title
                .replace(/<p[^>]*>/g, "")
                .replace(/<\/p>/g, "")}
            </motion.h2>
          </div>
          <div className="w-full xl:w-3/12 mb-10 md:mb-20 xl:mb-0">
            <motion.div
              className="w-full aspect-square rounded-3xl !bg-cover graysale black"
              style={{
                background : `url(${pageData.pageData.pages.nodes[0].homepage.initialBox.landingImage.mediaItemUrl}) center center no-repeat`,
                y: y_sub
              }}
              transition={{ ease: "easeInOut" }}
              onMouseOver={handleHover}
              onMouseLeave={handleHoverLeave}
            ></motion.div>
          </div>
          <div className="w-full xl:w-7/12">
            <motion.h2
                ref={aboutContent}
                className="text-white text-3xl leading-relaxed font-normal"
                style={{ y: y_sub }}
                transition={{ ease: "easeInOut" }}
                >
                {pageData.pageData.pages.nodes[0].homepage.about.content
                    .replace(/<p[^>]*>/g, "")
                    .replace(/<\/p>/g, "")}
                </motion.h2>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}
