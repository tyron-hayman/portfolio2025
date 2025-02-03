"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import PageDataContext from "@/lib/getPageData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faBarcode } from "@fortawesome/free-solid-svg-icons";
import Marquee from "./Marquee";
import checkWebGL from '@/utils/checkWebGlSupport';
import dynamic from "next/dynamic";

const Head = dynamic(() => import('@/components/Head'), {
  ssr: false,
});

export default function Testimonials() {
  const pageData = useContext(PageDataContext);
  const testimonialsWrap = useRef(null);
  const testimonialsTitle = useRef(null);
  const counter = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    target : testimonialsWrap,
    offset: ["start start", "end start"]
  })
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const supportsWebGL = checkWebGL();

  return (
    <motion.div
      ref={testimonialsWrap}
      className="relative w-full py-40 mt-80"
    >
      {pageData.pageData ? (
          <>
          <div ref={testimonialsTitle} className="w-full">
            <Marquee phrase="Kind Words" />
          </div>
          <div className="container mx-auto relative flex mt-32 md:mt-[300px] justify-between">
            <div className="w-3/12 hidden lg:block">
              <div className="sticky top-[150px]">
                <h2 className="text-[14vw] aspect-video font-bold bondini text-white flex items-start justify-start overflow-hidden">
                  <span>0</span>
                  <motion.span ref={counter} className="relative" animate={{ y : `-${33 * activeIndex}%` }}>
                    {pageData.pageData.pages.nodes[0].homepage.testimonials.map((test: Testimonial, index : number) => {
                      return(<span className="block" key={`num${index}`}>{index + 1}</span>)
                    })}
                  </motion.span>
                  </h2>
                { supportsWebGL ? 
                <div className="w-3/4 aspect-square -translate-y-20">
                  {Head ? <Head progress={scrollYProgress} /> : null}
                </div>
                : null }
              </div>
            </div>
            <div className="w-full lg:w-8/12 px-5 md:px-0">
              {pageData.pageData.pages.nodes[0].homepage.testimonials.map((testimonial : Testimonial, index : number) => {
                return(
                  <TestimonialCard key={`test${index}`} {...testimonial} index={index} setIndex={setActiveIndex} />
                )
              })}
            </div>
          </div>
          </>
      ) : null}
    </motion.div>
  );
}

const TestimonialCard = ({
  company,
  content,
  image,
  name,
  index,
  progress,
  setIndex
}: Testimonial) => {
  const card = useRef(null);
  const isInView = useInView(card, { amount : 0.5 })
  const { scrollYProgress } = useScroll({
    target : card,
    offset: ["start 0.5", "end 0.7"]
  })
  const words = content.replace("<p>", "").replace("</p>", "").split(" ")
  const pageData = useContext(PageDataContext);

  useEffect(() => {
    if ( isInView ) { setIndex(index) }
  }, [isInView])

  const handleHover = () => {
    pageData.setCursorState("thanks");
  };

  const handleHoverLeave = () => {
    pageData.setCursorState("");
  };


  const bgStyle = {
    background : `url(${image.mediaItemUrl}) center center no-repeat`
  }


  return (
      <motion.div ref={card} className={`w-full mb-60 last:mb-0`} onMouseOver={handleHover} onMouseLeave={handleHoverLeave}>
          <div className="w-[200px] lg:w-[200px] h-[200px] lg:h-[200px] rounded-full !bg-cover mb-10 mx-auto md:mx-0" style={bgStyle}></div>
          <div className="text-white text-2xl leading-relaxed font-normal flex flex-wrap w-full">
              {words.map( (word, i) => {
                const start = i / words.length
                const end = start + (1 / words.length)
                return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
              })}
          </div>
          <h3 className="text-zinc-400 font-black text-xl mt-10">{name} <FontAwesomeIcon icon={faAsterisk} /> {company}</h3>
      </motion.div>
  );
};

const Word = ({children, progress, range} : { children : any, progress : any, range : any }) => {

  const opacity = useTransform(progress, range, [0, 1])

  return <span className="relative mr-[12px] mt-[6px]">
    <span className="absolute opacity-10">{children}</span>
    <motion.span style={{opacity: opacity}}>{children}</motion.span>
  </span>
}

