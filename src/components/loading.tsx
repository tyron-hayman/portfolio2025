import { useContext } from "react";
import { motion, animate } from "framer-motion";
import { useState, useEffect } from "react";
import useDimension from "@/utils/useDimensions";
import PageDataContext from "@/lib/getPageData";

export default function Loader() {
  const [loadingNum, setLoadingNum] = useState<number>(0);
  const { width, height } = useDimension();
  const pageData = useContext(PageDataContext);


  useEffect(() => {
    animate(0, 100, {
      duration: 2,
      onUpdate: (latest) => {
        setLoadingNum(Math.round(latest));
        if ( latest == 100 ) {
          pageData.setLoading(false)
        }
      }
    });
  }, []);

  return (
    <motion.div className="siteLoader fixed z-[999] inset-x-0 inset-y-0 overflow-hidden bg-slate-700"
    animate={{ y : pageData.loading ? 0 : -height - 300 }}
    transition={{ duration : 0.5, ease : 'easeInOut', delay : 0.5 }}
    >
        <div className='relative w-full h-screen'>
          <motion.div className='absolute p-10 text-right right-0 bottom-0'
            animate={{ x: pageData.loading ? 0 : 300, opacity: pageData.loading ? 1 : 0 }}
            transition={{ duration : 0.5, ease : 'easeInOut'}}
          >
              <p className='text-white font-black text-[20vw]'>
              {loadingNum}%
              </p>
              <p className='text-white/30 font-black text-[2vw]'>Loading...</p>
          </motion.div>
          <motion.div className='absolute top-0 left-0 p-10'
            animate={{ x: pageData.loading ? 0 : -300, opacity: pageData.loading ? 1 : 0 }}
            transition={{ duration : 0.5, ease : 'easeInOut'}}
          >
              <p className='text-white font-black text-lg'>
                TYRONHAYMAN
              </p>
          </motion.div>
        </div>
    </motion.div>
  );
}