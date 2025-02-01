export {}

declare global {
  interface Project {
    content: string,
    image: any,
    role: string,
    techStack: any,
    title: string,
    url: string,
    year: string,
    progress: any,
    index: number,
    parent: any,
    setActive?: any
  }
  interface Testimonial {
    company: string,
    content: string,
    image: any,
    name: string,
    index: number,
    setIndex?: any,
    progress?: any
  }
  interface ProjectNav {
    data: any,
    inView?: boolean,
    activeIndex?: number
  }
}