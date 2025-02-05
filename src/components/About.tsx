"use client";
import React, { useContext, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import PageDataContext from "@/lib/getPageData";

export default function About() {
  const pageData = useContext(PageDataContext);
  const aboutWrapper = useRef(null);
  const services = useRef(null);
  const isInView = useInView(aboutWrapper, { amount: 0.2, once: true });

  const handleHover = () => {
    pageData.setCursorState("images");
  };

  const handleHoverLeave = () => {
    pageData.setCursorState("");
  };

  return (
    <div
      ref={aboutWrapper}
      className="relative w-full mt-40 py-20 md:py-40 aboutSection"
    >
      {pageData.pageData ? (
        <div className="container mx-auto flex flex-wrap justify-between">
          <div className="w-full px-5 md:px-0">
            <motion.h2
              className="text-white text-2xl md:text-6xl leading-snug md:leading-snug font-normal"
              animate={{ y: isInView ? 0 : 50, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            >
              {pageData.pageData.pages.nodes[0].homepage.about.content
                .replace(/<p[^>]*>/g, "")
                .replace(/<\/p>/g, "")}
            </motion.h2>
          </div>
          <div
            ref={services}
            className="w-full relative block lg:flex justify-between my-40 px-5 md:px-0"
          >
            <div className="w-full md:w-4/12 mb-10 md:mb-20 xl:mb-0 px-5 md:px-0">
              <AboutImage
                src={pageData.pageData.pages.nodes[0].homepage.initialBox.landingImage.mediaItemUrl}
                hover={handleHover}
                leave={handleHoverLeave}
              />
            </div>
            <div className="w-full md:w-7/12 mb-10 md:mb-20 xl:mb-0 px-5 md:px-0">
              <h3 className="text-white/50 text-3xl font-black">
                {pageData.pageData.pages.nodes[0].homepage.servicesTitle}
              </h3>
              <div className="mt-10">
                <ul>
                  {pageData.pageData.pages.nodes[0].homepage.services.map(
                    (service: any, index: number) => {
                      return (
                        <ServiceItem
                          item={service}
                          index={index}
                          key={`serv${index}`}
                        />
                      );
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const AboutImage = ({ src, hover, leave } : { src : string, hover : any, leave : any}) => {
  const image = useRef<any>(null)
  const imageInView = useInView(image, { amount: 0.1, once: true });
  return(
    <motion.div
        ref={image}
        className="w-full aspect-square rounded-3xl !bg-cover graysale black"
        style={{
          background: `url(${src}) center center no-repeat`,
        }}
        animate={{ y: imageInView ? 0 : 50, opacity: imageInView ? 1 : 0 }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        onMouseOver={hover}
        onMouseLeave={leave}
      ></motion.div>
  )
}

const ServiceItem = ({
  item,
  index,
}: {
  item: any;
  index: number;
}) => {
  const service = useRef<any>(null)
  const servInView = useInView(service, { amount: 0.1, once: true });

  return (
    <motion.li
      ref={service}
      className="py-5 border-white/20 border-t-2 border-solid md:flex justify-between items-center"
      animate={{ y: servInView ? 0 : 50, opacity: servInView ? 1 : 0 }}
      transition={{ duration: 0.75, ease: "easeInOut", delay: 0.15 * index }}
    >
      <span className="text-white text-4xl font-normal">{item.title}</span>
      <span className="text-white/50 text-xl font-bold block md:inline-block">{item.content}</span>
    </motion.li>
  );
};
