import { motion, AnimatePresence } from "framer-motion";

function PageTransition({ children, route }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={route}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.3,
        }}
        variants={{
          initialState: {
            opacity: 0,
            // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          animateState: {
            opacity: 1,
            // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          exitState: {
            opacity: 0,
            // clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          },
        }}
        className="base-page-size"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
