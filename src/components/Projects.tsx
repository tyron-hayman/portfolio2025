"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue } from "framer-motion";
import PageDataContext from "@/lib/getPageData";
import useDimension from "@/utils/useDimensions";

export default function Projects() {
  const pageData = useContext(PageDataContext);
  const { width, height } = useDimension();
  const projectWrapper = useRef(null);
  const projectContainer = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: projectWrapper,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);
  const blur = useTransform(scrollYProgress, [0, 0.3], ["blur(0px)", "blur(8px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  

  useEffect(() => {
  }, [])

    return (
      <div
        ref={projectWrapper}
        className="w-full relative"
      >
        <motion.div className="container mx-auto mb-80 sticky top-[100px]" style={{ scale, filter : blur, opacity }}>
          <h2 className="text-white text-7xl font-normal bondini">Recent Work</h2>
        </motion.div>
        <div ref={projectContainer} className="w-full relative">
        {pageData.pageData ? (
            <>
            <ProjectNav data={pageData.pageData.pages.nodes[0].homepage.recentWork} activeIndex={activeIndex} />
            {pageData.pageData.pages.nodes[0].homepage.recentWork.map(
              (project: Project, index: number) => {
                return (
                  <ProjectBox
                    key={`project${index}`}
                    {...project}
                    progress={scrollYProgress}
                    index={index}
                    parent={projectWrapper}
                    setActive={setActiveIndex}
                  />
                );
              }
            )}
            </>
        ) : null}
        </div>
      </div>
    );
}

const ProjectBox = ({
  content,
  image,
  role,
  techStack,
  title,
  url,
  year,
  progress,
  index,
  parent,
  setActive
}: Project) => {
  const projectCard = useRef(null)
  const pageData = useContext(PageDataContext);
  const rotate = useTransform(progress, [0, 1], ["-5deg", "-15deg"]);
  const scale = useTransform(progress, [0, 1], [1.1, 1.4]);
  const isInView = useInView(projectCard, { amount : 0.4 })

  const handleHover = () => {
    pageData.setCursorState("projects");
  };

  const handleHoverLeave = () => {
    pageData.setCursorState("");
  };

  const openLink = () => {
    window.open(url);
  };

  useEffect(() => {
    if ( isInView ) {
      setActive(index)
    } else {
      setActive(index - 1)
    }
  }, [isInView]);

  return (
    <motion.div
      ref={projectCard}
      className="w-full h-screen sticky top-0 overflow-hidden bg-black flex items-center justify-center"
      style={{ zIndex : index + 1 }}
      onMouseOver={handleHover}
      onMouseLeave={handleHoverLeave}
      onClick={openLink}
    >
      <div className="absolute inset-x-0 inset-y-0 z-[0] bg-slate-900"></div>
      <motion.div
        className="absolute inset-x-0 inset-y-0 z-[1] !bg-cover opacity-10"
        style={{
          background: `url(${image.mediaItemUrl}) center center no-repeat`,
          rotate,
          scale,
        }}
      ></motion.div>
    </motion.div>
  );
};

const ProjectNav = ({ data, activeIndex = 0 } : ProjectNav) => {
  const projectNav = useRef(null)
  const [active, setActive] = useState<number>(activeIndex)

  useEffect(() => {
    setActive(activeIndex);
  },[activeIndex])

  return(
    <motion.div 
      className={`absolute inset-y-0 inset-x-0 z-[10] pointer-events-none`}
      ref={projectNav}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <h2 className="text-white font-black uppercase text-7xl relative h-[100px] w-2/3 text-center overflow-hidden mix-blend-difference">
          <motion.span className="absolute left-0 top-0 w-full" animate={{ y : -100 * active}} transition={{ duration : 0.35, ease : "easeInOut"}}>
            {data.map((item : any, index : number) => {
              return(
                <span key={`title${index}`} className="block h-[100px]">{item.title}</span>
              )
            })}
          </motion.span>
        </h2>
        <div className="absolute w-[25px] inset-y-0 right-5 z-[2] flex flex-wrap items-center justify-start">
          <div>
            {data.map((item : any, index : number) => {

              return(
                <motion.span key={`tab${index}`} 
                  className={`block h-[5px] rounded-full bg-white my-5`}
                  animate={{ width : index == active ? 15 : 5, background : index == active ? 'rgba(255,255,255,1.0)' : 'rgba(255,255,255,0.5)' }}
                  transition={{ duration : 0.3, ease : "easeInOut" }}
                ></motion.span>
              )
            })}
            </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-center">
          <div>
            <h3 className="text-white font-black uppercase text-center text-sm relative h-[30px] w-[400px] overflow-hidden">
            <motion.span className="absolute left-0 top-0 w-full" animate={{ y : -30 * active}} transition={{ duration : 0.35, ease : "easeInOut"}}>
              {data.map((item : any, index : number) => {
                return(
                  <span key={`role${index}`} className="block h-[30px]">{item.role}</span>
                )
              })}
            </motion.span>
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
