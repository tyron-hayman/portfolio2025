import { motion } from "framer-motion";
import useDimension from "@/utils/useDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";

  const Marquee = ({ phrase } : { phrase? : string }) => {
    const dimension = useDimension();
    const textClass = "text-white bondini font-light uppercase text-5xl md:text-8xl"
    const iconClass = "text-2xl align-middle leading-[1]"

    return (
        <div className="marquee bg-indigo-500/10 py-10">
            <ul className="marquee__content">
            <li className={textClass}>{phrase} <FontAwesomeIcon className={iconClass} icon={faAsterisk} /></li>
            <li className={textClass}>{phrase} <FontAwesomeIcon className={iconClass} icon={faAsterisk} /></li>
            <li className={textClass}>{phrase} <FontAwesomeIcon className={iconClass} icon={faAsterisk} /></li>
            </ul>
        
            <ul aria-hidden="true" className="marquee__content">
            <li className={textClass}>{phrase} <FontAwesomeIcon className={iconClass} icon={faAsterisk} /></li>
            <li className={textClass}>{phrase} <FontAwesomeIcon className={iconClass} icon={faAsterisk} /></li>
            <li className={textClass}>{phrase} <FontAwesomeIcon className={iconClass} icon={faAsterisk} /></li>
            </ul>
        </div>
    );
  };
  export default Marquee;