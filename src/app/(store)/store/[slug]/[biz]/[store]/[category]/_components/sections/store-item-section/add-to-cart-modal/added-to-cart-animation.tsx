// 3. Trigger the animation in your handleAddToCart function
// const handleAddToCart = () => {
//   startTransition(async () => {
//     onAddToCart("APPOINTMENT_PER_ITEM", selectedAppointments);
//   });
//   setCurrentSessionAddedToCart(true);
//   setShowSuccessAnimation(true); // Add this line
// };

import Image from "next/image";
import { useEffect, useState } from "react";

import { MotionDiv } from "@/components/global/animations/motion-elements";
import ASSETS from "@/constants/assets";

interface AddedToCartAnimationProps {
  show: boolean;
  onAnimationComplete?: () => void;
}

const AddedToCartAnimation = ({
  show,
  onAnimationComplete,
}: AddedToCartAnimationProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (show) {
      setShouldRender(true);

      // Auto-hide after 1 second
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show && !shouldRender) return null;

  return (
    <MotionDiv
      initial={{ y: "100%", opacity: 0 }}
      animate={{
        y: shouldRender ? "0%" : "100%",
        // opacity: shouldRender ? 1 : 0,
        opacity: 1,
      }}
      exit={{ y: "100%", opacity: 1 }}
      transition={{
        type: "keyframes",
        damping: 25,
        stiffness: 300,
        duration: 0.3,
      }}
      onAnimationComplete={() => {
        if (!shouldRender && onAnimationComplete) {
          onAnimationComplete();
        }
      }}
      //   className="heading-6 flex-between flex w-full rounded-t-10 bg-[#E1F4E5] p-4 text-custom-green-2nd shadow-top"
      className="heading-6 flex-between absolute inset-x-0 -top-16 z-0 flex w-full rounded-t-10 bg-[#E1F4E5] p-4 text-custom-green-2nd shadow-top"
    >
      <p>Item added successfully to the cart.</p>
      <Image
        src={ASSETS.GIFS.ADDED_TO_CART}
        alt="added to cart"
        height={50}
        width={50}
        className="size-8"
      />
    </MotionDiv>
  );
};

export default AddedToCartAnimation;
