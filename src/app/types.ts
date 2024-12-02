import {IconDefinition, IconProp} from "@fortawesome/fontawesome-svg-core";

export type Props = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

export interface WorkModal {
    isActive: boolean, 
    image: string,
    isVideo?: boolean,
    data: any[],
    modalIndex: number
}

export interface WorkProject {
    title : string,
    url: string,
    content : string, 
    techStack : Array<any>,
    image: { mediaItemUrl : string },
    video: { mediaItemUrl : string },
    isVideo: boolean,
    index: number
}

export interface Bubble {
    factor: number,
    speed: number,
    xFactor: number,
    yFactor: number,
    zFactor: number
}

export interface SocialLinks {
    url : string, 
    icon : IconDefinition
}

export interface SocialIcons {
    url : string,
    icon : IconProp,
    delay : number
}

export interface NavLinks {
    url : string,
    title : string,
    target: string
}

export interface WorkExp {
    company: string,
    desc: string,
    role: string,
    yearFrom: string,
    yearTo: string
}

export interface RecentWork {
    title: string,
    url: string,
    year: string,
    role: string,
    content: string,
    techStack: Array<string>,
    image: { mediaItemUrl : string },
    video: { mediaItemUrl : string },
    isVideo: boolean
}