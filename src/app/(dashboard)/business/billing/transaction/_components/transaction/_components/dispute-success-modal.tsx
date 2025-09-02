import { motion } from "motion/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";

import { Modal } from "@/components/global/modal";

type DisputeSuccessModalProps = {
  onOpenChange: () => void;
  open: boolean;
};

const DisputeSuccessModal = ({
  onOpenChange,

  open,
}: DisputeSuccessModalProps) => {
  const user = useSession();
  const email = user?.data?.user?.email;
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Success">
      <div className="flex h-60 flex-col items-center justify-center">
        <div className=" flex items-center justify-center">
          <motion.div
            initial={{ scale: 2 }}
            animate={{ scale: 0.8 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          >
            <Image
              src="/images/invoice/green-tick.svg"
              alt="Success Tick"
              width={200}
              height={200}
              className="size-[100px] ease-in"
            />
          </motion.div>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            className="title-5-medium text-black"
          >
            Your dispute is submitted successfully!!!
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            className="text-[16px] font-light text-black"
          >
            We will reach out to you at {email}
          </motion.span>
        </div>
      </div>
    </Modal>
  );
};

export default DisputeSuccessModal;
