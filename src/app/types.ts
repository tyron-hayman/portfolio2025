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
    content : any, 
    techStack : any[],
    image: any,
    video: any,
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