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
    const modalIndex = useAppSelector((state: IRootState) => state.add_image.index);
    return (
            <>
            <div className="w-full mt-[200px] relative z-2 workContainer overflow-x-hidden flex items-center justify-center">
              <div className="container">
                <h3 className='text-white text-3xl font-black tracking-tight mb-[50px] uppercase'><AnimatedIcon icon={faAsterisk} /> Most Recent Work</h3>
                {data ?
                <>
                {data.pages.nodes[0].homepage.recentWork.map( (project : any, index : number) => {
                  return <Project {...project} index={index} key={index} />
                })}
                </>
                : null}
              </div>
            </div>
            {data ?
            <WorkModal isActive={modalStatus} image={modalImage} isVideo={isVideo} data={data.pages.nodes[0].homepage.recentWork} modalIndex={modalIndex} />
            : null}
            </>
    );
}

const Project = ({title, content, techStack, image, video, isVideo, index} : WorkProject) => {
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
    dispatch(toggleMediaAsync({ url, isVideo, index }))
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

const WorkModal = ({ isActive, image, isVideo, data, modalIndex } : WorkModal) => {
  const mouse = useMouse();
  const video = useRef<any>(null);
  const smoothOptions = {damping: 40, stiffness: 300, mass: 0.5}
  const smoothMouse = {
      x: useSpring(mouse.x, smoothOptions),
      y: useSpring(mouse.y, smoothOptions)
  }

  return(
    <motion.div
      className={`workModal w-[400px] h-[400px] overflow-hidden rounded-xl bg-black fixed left-5 top-0 p-2 z-30 pointer-events-none transition-opacity duration-500 ${(isActive) ? 'opacity-100' : 'opacity-0'}`}
      style={{
        x : smoothMouse.x,
        y : smoothMouse.y,
      }}
    >
      <motion.div className='absolute inset-x-0 inset-y-0 z-2 transition-all duration-500'
        style={{
          y : -400 * modalIndex,
          height: 400 * data.length + "px"
        }}
      >
        {data.map((media : any, index : number) => {
          return(
            <div className='w-full h-[400px] flex items-center justify-center'>
              {media.isVideo ?
                <video width="400" height="400" muted autoPlay loop className='h-[100%] aspect-[9/16]'>
                    <source src={media.video.mediaItemUrl} type="video/mp4" />
                     Your browser does not support the video tag.
                   </video>
                  : <img src={media.image.mediaItemUrl} alt="project image" className='w-full h-[auto]' />
              }
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )

}

