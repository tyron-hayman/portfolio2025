import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentNode, gql, useQuery} from "@apollo/client";
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import AnimatedIcon from './AnimatedIcon';
import Section from './Section';

const query : DocumentNode = gql`query NewQuery {
  pages {
    nodes {
      homepage {
        workExperience {
          company
          desc
          role
          yearFrom
          yearTo
        }
        about {
          content
        }
      }
    }
  }
  themeSettingsNext {
    themeSettings {
      globalMainImage {
        mediaItemUrl
      }
    }
  }
}`;

export default function ProfileCV() {
    const { data } = useQuery(query);
    return (
        <Section>
        <div className='w-full py-[100px] flex justify-center relative z-2'>
            {data ?
            <div className='container flex justify-between'>
                <div className='w-2/12'>
                    <div className='rounded-full sticky top-20 relative !bg-cover w-full aspect-square overflow-hidden' style={{ background : `url(${data.themeSettingsNext.themeSettings.globalMainImage.mediaItemUrl}) center center no-repeat`}}>
                        <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 absolute inset-x-0 inset-y-0 z-1 mix-blend-color' />
                    </div>
                </div>
                <div className='w-9/12'>
                <div className='mb-[100px] text-white leading-loose text-3xl font-normal' dangerouslySetInnerHTML={{ __html: data.pages.nodes[0].homepage.about.content}}></div>
                <h3 className='text-white text-3xl font-black tracking-tight mb-[50px] uppercase'><AnimatedIcon icon={faAsterisk} /> Experience</h3>
                {data.pages.nodes[0].homepage.workExperience.map((exp : any, index : number) => {
                    return(
                        <div className='py-16 border-white/20 border-t border-solid block relative flex items-center justify-between'>
                            <div className='w-9/12'>
                            <h3 className='text-white font-light uppercase text-3xl mb-5'>{exp.company}</h3>
                            <div className='text-xl text-white font-normal leading-relaxed' dangerouslySetInnerHTML={{ __html : exp.desc }} />
                            </div>
                            <div>
                                <p className='text-xl text-white font-black'>
                                    {exp.yearFrom}- 
                                    {exp.yearTo ?
                                        exp.yearTo
                                    : 'Current'}
                                </p>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
            : null}
        </div>
        </Section>
    );
}