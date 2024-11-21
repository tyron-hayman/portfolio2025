import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from "framer-motion";

const AnimatedIcon = ({ icon } : { icon : IconDefinition}) => {
  return (
    <motion.span 
        className="inline-block mr-4"
        animate={{
            rotate: ['-360deg', '0deg'],
            transition: {
                ease: 'linear',
                duration: 5,
                repeat: Infinity,
            }
        }}
    >
        <FontAwesomeIcon icon={icon} />
    </motion.span>
  );
}

export default AnimatedIcon;