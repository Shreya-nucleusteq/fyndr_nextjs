import React from "react";
import { QRCode } from "react-qrcode-logo";

import Invoicefooter from "@/components/global/invoice/invoice-footer";
import { Modal } from "@/components/global/modal";

type ShowQrModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  objid: number | null;
  fulfiled?: string | null;
};

const ShowQrModal = ({
  open,
  onOpenChange,
  objid,
  fulfiled,
}: ShowQrModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onOpenChange={onOpenChange}
        title="QR Code"
        footerContent={<Invoicefooter />}
        footerClassName="p-0"
      >
        <div className="flex flex-col  gap-2 rounded-10 border border-secondary-20 px-3 pt-2 ">
          <div className="flex justify-center align-middle">
            <QRCode
              value={`INV-${(objid + "").padStart(10, "0")}`}
              size={300}
              logoWidth={80}
              fgColor={fulfiled ? "#ccc" : "#000"}
              logoImage={"/images/blueFyndr.png"}
            />
          </div>
          <div className="mb-2 flex justify-center align-middle">
            <span className="text-[16px] font-semibold text-primary">{`INV-${(objid + "").padStart(10, "0")}`}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShowQrModal;
