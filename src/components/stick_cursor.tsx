import { useEffect, useState, useContext } from "react";
import { useSpring, useMotionValue, motion } from "framer-motion";
import PageDataContext from "@/lib/getPageData"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faArrowDown, faHandSpock, faHandsClapping, faEnvelope } from '@fortawesome/free-solid-svg-icons';



export default function StickCursor() {
    const [cursorActive, setCursorActive] = useState<string>("")
    const pageData = useContext(PageDataContext);
    const cursorSize = 25;
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    }

    const smoothOptions = {damping: 25, stiffness: 250, mass: 0.5}
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions)
    }

    const manageMouseMove = ( e : MouseEvent ) => {
        const { clientX, clientY } = e;
        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
    }

    useEffect( () => {
        let atags = document.querySelectorAll('.projectBoxes');
        for(let ai = 0; ai < atags.length; ai++) {
            atags[ai].addEventListener("mouseover", handleHover);
            atags[ai].addEventListener("mouseleave", handleNotHover);
        }
        window.addEventListener("mousemove", manageMouseMove);
        return () => {
        window.removeEventListener("mousemove", manageMouseMove)
        for(let ai = 0; ai < atags.length; ai++) {
            atags[ai].addEventListener("mouseover", handleHover);
            atags[ai].addEventListener("mouseleave", handleNotHover);
        }
        }
    }, [])

    const handleHover = () => {
        setCursorActive("projects")
        console.log("hovered")
    }

    const handleNotHover = () => {
        setCursorActive("")
    }

    return (
        <motion.div 
            style={{
                left: smoothMouse.x, 
                top: smoothMouse.y,
            }} 
            className={
                `fixed w-[50px] h-[50px] block z-[100] pointer-events-none rounded-full hidden md:block border-2 border-white border-solid`
            }>
             <motion.div className={`absoluste flex items-center justify-center left-0 top-0 w-[50px] h-[50px] rounded-full transition-all duration-500 opacity-0 ${(pageData.cursorState == "projects") ? 'scale-150 opacity-100 bg-blue-700' : null} ${(pageData.cursorState == "links") ? 'scale-150 opacity-100 bg-rose-700' : null} ${(pageData.cursorState == "images") ? 'scale-150 opacity-100 bg-indigo-700' : null} ${(pageData.cursorState == "thanks") ? 'scale-150 opacity-100 bg-pink-500' : null} ${(pageData.cursorState == "email") ? 'scale-150 opacity-100 bg-emerald-500' : null}`}>
                {pageData.cursorState == "projects" ? 
                <FontAwesomeIcon className="text-md text-white" icon={faArrowUpRightFromSquare} />
                : null}
                {pageData.cursorState == "links" ? 
                <FontAwesomeIcon className="text-md text-white" icon={faArrowDown} />
                : null}
                {pageData.cursorState == "images" ? 
                <FontAwesomeIcon className="text-md text-white" icon={faHandSpock} />
                : null}
                {pageData.cursorState == "thanks" ? 
                <FontAwesomeIcon className="text-md text-white" icon={faHandsClapping} />
                : null}
                {pageData.cursorState == "email" ? 
                <FontAwesomeIcon className="text-md text-white" icon={faEnvelope} />
                : null}
             </motion.div>
        </motion.div>
    );
}