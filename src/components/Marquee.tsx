import { motion } from "framer-motion";
import useDimension from "@/utils/useDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";

  const Marquee = ({ word1, word2 } : { word1 : string, word2:string }) => {
    const dimension = useDimension();
    const textClass = "text-white font-black text-[20vw] md:text-[8vw] md:leading-[10vw]"
    const iconClass = "text-2xl align-middle leading-[1]"

    return (
        <div className="marquee">
            <ul className="marquee__content">
            <li className={textClass}>{word1} <strong>{word2}</strong> <FontAwesomeIcon className={iconClass} icon={faAsterisk} /></li>
            <li className={textClass}>{word1} <strong>{word2}</strong> <FontAwesomeIcon className={iconClass} icon={faAsterisk} /></li>
            <li className={textClass}>{word1} <strong>{word2}</strong> <FontAwesomeIcon className={iconClass} icon={faAsterisk} /></li>
            </ul>
        
            <ul aria-hidden="true" className="marquee__content">
            <li className={textClass}>{word1} <strong>{word2}</strong> <FontAwesomeIcon className={iconClass} icon={faAsterisk} /></li>
            <li className={textClass}>{word1} <strong>{word2}</strong> <FontAwesomeIcon className={iconClass} icon={faAsterisk} /></li>
            <li className={textClass}>{word1} <strong>{word2}</strong> <FontAwesomeIcon className={iconClass} icon={faAsterisk} /></li>
            </ul>
        </div>
    );
  };
  export default Marquee;