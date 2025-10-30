
import { AnimatePresence, motion } from "framer-motion";

function TransitionOverlay({ onComplete, btnPosition }) {
  // console.log("from overlay component", btnPosition?.x);
  // console.log("from overlay component", btnPosition);

  const initialX = btnPosition ? btnPosition.left + btnPosition.width / 2 : 0;
  const initialY = btnPosition ? btnPosition.top + btnPosition.height / 2 : 0;

  const transitionVariants = {
    initial: {
      scale: 0,
      x: initialX,
      y: initialY,
      backgroundColor: "#FFFFFF",
      borderRadius: "50%",
    },
    animate: {
      scale: 50,
      // backgroundColor : "#FF0000",
      backgroundColor: "#FFFFFF",
      transition: {
        duration: 0.8,
        ease: [0.87, 0, 0.13, 1],
      },
    },
    exit: {
      scale: 0,

      backgroundColor: "#000000",
      transition: {
        duration: 0.8,
        ease: [0.87, 0, 0.13, 1],
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="fixed h-10 w-10 top-0 left-0 z-50 pointer-events-none"
      // style={{
      //   width: "100px",
      //   height: "100px",
      // }}
      variants={transitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationComplete={onComplete}
    />
  );
}

export default TransitionOverlay;
