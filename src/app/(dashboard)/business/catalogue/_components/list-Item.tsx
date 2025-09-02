"use client";
import { Trash2, SquarePen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import HtmlContent from "@/components/global/html-content";
import { Modal } from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import ASSETS from "@/constants/assets";
import { API_BASE_URL } from "@/environment";

import StoreUrl from "../list/_components/copy-store-url";

interface ListItemProps {
  deletePress?: () => void;
  onClick?: () => void;
  hideDelete?: boolean;
  onEditClick?: () => void;
  onStoreUrlClick?: () => void;
  item: {
    images?: { img?: string; img_url?: string }[];
    name: string;
    description?: string;
    url?: string;
  };
}

const ListItem: React.FC<ListItemProps> = ({
  deletePress,
  onClick,
  hideDelete,
  onEditClick,
  onStoreUrlClick,
  item: { images, name, description, url },
}) => {
  const [visible, setVisible] = useState(false);
  const storeUrl = `${API_BASE_URL}/catalogue/store/${url}`;

  const avatarSrc =
    images?.[0]?.img || images?.[0]?.img_url || ASSETS.IMAGES.PLACEHOLDER.FYNDR;

  return (
    <>
      <div className="flex items-start gap-4 rounded-md border bg-white p-4 shadow-sm">
        <Image
          src={avatarSrc}
          alt="thumbnail"
          onClick={onClick}
          width={80}
          height={80}
          className="size-20 cursor-pointer rounded object-cover"
        />
        <div onClick={onClick} className="flex flex-1 flex-col gap-2">
          <h5 className="cursor-pointer text-lg font-semibold">{name}</h5>

          {description?.trim() && (
            <div className="max-h-24 overflow-hidden text-sm text-gray-600">
              {<HtmlContent htmlString={description} />}
            </div>
          )}

          {url && (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">URL:</span>
              <span
                className="cursor-pointer text-blue-600 underline"
                onClick={onStoreUrlClick}
              >
                {`${API_BASE_URL}/catalogue/store/${url}`}
              </span>
              <StoreUrl storeUrl={storeUrl} />
            </div>
          )}
        </div>

        <div
          className={`flex-center gap-4 ${
            hideDelete ? "flex-col" : "flex-row"
          }`}
        >
          <SquarePen
            onClick={onClick}
            className="flex-center text-primary-90"
          />
          {hideDelete && (
            <Button
              className="border border-gray-200 bg-white text-black hover:bg-white"
              onClick={onEditClick}
            >
              Edit URL
            </Button>
          )}

          {!hideDelete && (
            <Trash2 className="text-red-500" onClick={() => setVisible(true)} />
          )}
        </div>
      </div>
      <Modal
        open={visible}
        onOpenChange={setVisible}
        width="30%"
        title={
          <p className="text-left text-lg font-medium">{`Delete ${name}`}</p>
        }
        showCloseButton={true}
        primaryAction={{
          label: "OK",
          onClick: async () => {
            await deletePress?.();
            setVisible(false);
          },
          className: "bg-primary text-white hover:bg-secondary-90",
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => setVisible(false),
          variant: "outline",
        }}
      >
        {"Are you sure you want to proceed ?"}
        <></>
      </Modal>
    </>
  );
};

export default ListItem;
