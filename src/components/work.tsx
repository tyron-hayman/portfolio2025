'use client'
import React from 'react';
import type { WorkModal, WorkProject } from '@/app/types';
import { motion, useSpring } from 'framer-motion';
import { DocumentNode, gql, useQuery} from "@apollo/client";
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import AnimatedIcon from './AnimatedIcon';
import { toggleModalAsync, toggleMediaAsync } from '@/redux/WorkSlice';
import { IRootState } from '@/app/store';
import useMouse from '@/utils/useMouse';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Section from './Section';
import type { RecentWork } from '@/app/types';
import Image from 'next/image';

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
    const modalImage = useAppSelector((state: IRootState) => state.add_image.mediaUrl);
    const isVideo = useAppSelector((state: IRootState) => state.add_image.isVideo);
    const modalIndex = useAppSelector((state: IRootState) => state.add_image.index);
    return (
      <>
        <Section sectionClass="workSection">
            <div className="w-full mt-[200px] relative z-2 workContainer overflow-x-hidden flex items-center justify-center">
              <div className="container px-5 md:px-0">
                <h3 className='text-white text-3xl font-light italic tracking-tight mb-[50px] uppercase cormorant'><AnimatedIcon icon={faAsterisk} /> Most Recent Work</h3>
                {data ?
                <>
                {data.pages.nodes[0].homepage.recentWork.map( (project : RecentWork, index : number) => {
                  return <Project {...project} index={index} key={index} />
                })}
                </>
                : null}
              </div>
            </div>
          </Section>
            {data ?
            <WorkModal isActive={modalStatus} image={modalImage} isVideo={isVideo} data={data.pages.nodes[0].homepage.recentWork} modalIndex={modalIndex} />
            : null}
      </>
    );
}

const Project = ({title, url, content, techStack, image, video, isVideo, index} : WorkProject) => {
  const dispatch = useAppDispatch();

  let mediaUrl : string;
  if ( isVideo ) {
    mediaUrl = video.mediaItemUrl;
  } else {
    mediaUrl = image.mediaItemUrl;
  }

  const showModal = () => {
    dispatch(toggleModalAsync(true))
    dispatch(toggleMediaAsync({ mediaUrl, isVideo, index }))
  }

  const HideModal = () => {
    dispatch(toggleModalAsync(false))
  }

  return (
    <motion.div className="py-16 border-white/20 border-t border-solid block relative"
      onMouseOver={showModal} 
      onMouseLeave={HideModal}
    >
        <div className='absolute inset-x-0 inset-y-0 z-3 block pointer-events-none' />
        <div className='md:flex items-center justify-between'>
          <div className='mb-8 md:mb-0'>
            <h2 className='text-4xl md:text-6xl text-white font-black uppercase mb-4'>{title.replaceAll("-", " ")}</h2>
            <div className='block md:hidden text-xl leading-relaxed mb-4 text-white' dangerouslySetInnerHTML={{ __html: content }} />
            <div className='techStack'>
              <ul className='flex items-center gap-[10px] flex-wrap'>
                {techStack.map((stack : { tech : string }, index : number) => {
                  return(<motion.li key={`tech${index}`} className='border-white border border-solid px-8 py-2 text-white text-sm font-normal rounded-full block'>{stack.tech}</motion.li>)
                })}
              </ul>
            </div>
          </div>
          <div>
            {url ?
              <a href={url} target="_blank" className='transition-all duration-500 bg-white hover:bg-black px-8 py-2 text-black hover:text-white text-2xl font-normal rounded-full inline-block'>Visit</a>
            : <p className='text-white text-lg font-normal'>Campaign Ended / Changed</p>}
          </div>
        </div>
    </motion.div>
  )
}

const WorkModal = ({ isActive, data, modalIndex } : WorkModal) => {
  const mouse = useMouse();
  const smoothOptions = {damping: 40, stiffness: 300, mass: 0.5}
  const smoothMouse = {
      x: useSpring(mouse.x, smoothOptions),
      y: useSpring(mouse.y, smoothOptions)
  }

  return(
    <motion.div
      className={`workModal w-[400px] h-[400px] overflow-hidden hidden md:block rounded-xl fixed left-5 top-0 p-2 z-30 pointer-events-none transition-opacity duration-500 ${(isActive) ? 'opacity-100' : 'opacity-0'}`}
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
        {data.map((media : RecentWork, index : number) => {
          let bgColor: string;
          if ( (index % 2) == 0 ) {
            bgColor = 'bg-slate-800';
          } else {
            bgColor = 'bg-slate-900';
          }
          return(
            <div className={`w-full h-[400px] flex items-center justify-center ${bgColor}`} key={`modal${index}`}>
              {media.isVideo ?
                <video width="400" height="400" muted autoPlay loop className='h-[90%] aspect-[9/16]'>
                    <source src={media.video.mediaItemUrl} type="video/mp4" />
                     Your browser does not support the video tag.
                   </video>
                  : <Image src={media.image.mediaItemUrl} width={400} height={400} alt="project image" className='w-[90%] h-[auto]' />
              }
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )

}

