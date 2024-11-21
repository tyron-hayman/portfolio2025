'use client'
import React, { useEffect, useRef } from 'react';
import type { WorkModal, WorkProject } from '@/app/types';
import { motion, useSpring, useInView } from 'framer-motion';
import { DocumentNode, gql, useQuery} from "@apollo/client";
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import AnimatedIcon from './AnimatedIcon';
import { useSelector } from 'react-redux'
import { toggleModalAsync, toggleMediaAsync } from '@/redux/WorkSlice';
import { IRootState } from '@/app/store';
import useMouse from '@/utils/useMouse';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const query : DocumentNode = gql`query NewQuery {
  pages {
    nodes {
      homepage {
        recentWork {
          title
          url
          year
          role
          content
          techStack {
            tech
          }
          image {
            mediaItemUrl
          }
          video {
            mediaItemUrl
          }
          isVideo
        }
      }
    }
  }
}`;



export default function Work() {
    const { data } = useQuery(query);
    const modalStatus = useAppSelector((state: IRootState) => state.open_modal);
    const modalImage = useAppSelector((state: IRootState) => state.add_image.url);
    const isVideo = useAppSelector((state: IRootState) => state.add_image.isVideo);
    return (
            <>
            <div className="w-full mt-[200px] relative z-2 workContainer overflow-x-hidden flex items-center justify-center">
              <div className="container">
                <h3 className='text-white text-3xl font-black tracking-tight mb-[50px] uppercase'><AnimatedIcon icon={faAsterisk} /> Most Recent Work</h3>
                {data ?
                <>
                {data.pages.nodes[0].homepage.recentWork.map( (project : any, index : number) => {
                  return <Project {...project} key={index} />
                })}
                </>
                : null}
              </div>
            </div>
            <WorkModal isActive={modalStatus} image={modalImage} isVideo={isVideo} />
            </>
    );
}

const Project = ({title, content, techStack, image, video, isVideo} : WorkProject) => {
  const dispatch = useAppDispatch();
  const project = useRef(null)
  const isInView = useInView(project, { once: true })

  let url : string;
  if ( isVideo ) {
    url = video.mediaItemUrl;
  } else {
    url = image.mediaItemUrl;
  }

  const showModal = () => {
    dispatch(toggleModalAsync(true))
    dispatch(toggleMediaAsync({ url, isVideo }))
  }

  const HideModal = () => {
    dispatch(toggleModalAsync(false))
  }

  return (
    <motion.div ref={project} className="py-16 border-white/20 border-t border-solid block relative"
      onMouseOver={showModal} 
      onMouseLeave={HideModal}
      style={{
        transform: isInView ? "none" : "translateY(200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
        <div className='absolute inset-x-0 inset-y-0 z-3 block pointer-events-none' />
        <h2 className='text-6xl text-white font-black uppercase mb-4'>{title.replaceAll("-", " ")}</h2>
        <div className='techStack'>
          <ul className='flex gap-2 items-center'>
            {techStack.map((stack : { tech : string }, index : number) => {
              return(<li key={`tech${index}`} className='bg-indigo-600 px-8 py-2 text-white text-sm font-normal rounded-full block'>{stack.tech}</li>)
            })}
          </ul>
        </div>
    </motion.div>
  )
}

const WorkModal = ({ isActive, image, isVideo } : WorkModal) => {
  const mouse = useMouse();
  const video = useRef<any>(null);
  const smoothOptions = {damping: 40, stiffness: 300, mass: 0.5}
  const smoothMouse = {
      x: useSpring(mouse.x, smoothOptions),
      y: useSpring(mouse.y, smoothOptions)
  }

  function loadVideo() {
    if ( isVideo ) {
      video.current.pause();
      video.current.setAttribute('src', image);
      video.current.load();
      video.current.play();
    }
  }

  useEffect(() => {
    loadVideo();
  });

  return(
    <motion.div
      className={`workModal ${isVideo ? 'w-[200px]' : 'w-[400px]'} rounded-xl bg-indigo-600 fixed left-5 top-0 p-2 z-30 pointer-events-none transition-opacity duration-500 ${(isActive) ? 'opacity-100' : 'opacity-0'}`}
      style={{
        x : smoothMouse.x,
        y : smoothMouse.y,
      }}
    >
    {isVideo ?
      <video ref={video} width="240" height="320" muted className='w-full'>
        <source src='#' type="video/mp4" />
        Your browser does not support the video tag.
      </video>
     : <img src={image} alt="project image" className='w-full h-[auto]' />}
    </motion.div>
  );
}

