export interface WorkModal {
    isActive: boolean, 
    image: string,
    isVideo?: boolean
}

export interface WorkProject {
    title : string, 
    content : any, 
    techStack : any[],
    image: any,
    video: any,
    isVideo: boolean
}