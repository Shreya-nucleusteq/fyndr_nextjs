"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Modal } from "@/components/global/modal";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFetchStoreLocation } from "@/hooks/catalogues/use-store-location";
import { useUpdateStoreURL } from "@/hooks/catalogues/use-update-store-urls";
import {
  CatalogueItem,
  StoreLocations,
} from "@/types/catalogue/catalogue.types";

import List from "../../../_components/list";
import ListItem from "../../_components/list-Item";

type Props = {
  data: CatalogueItem[];
};

const Catalogue = ({ data }: Props) => {
  const [editUrlVisible, setEditUrlVisible] = useState<boolean>(false);
  const [newUrl, setNewUrl] = useState<string>("");
  const [selectedCatalogues, setSelectedCatalogues] = useState<CatalogueItem>();
  const [catalogueId, setCatalogueId] = useState<number>(0);
  const [fetchLocation, setFetchLocation] = useState<boolean>(false);
  const [locations, setLocations] = useState<StoreLocations[]>([]);
  const [value, setValue] = useState<string>("");

  const router = useRouter();

  const { mutate: updateUrl } = useUpdateStoreURL(() => {
    setEditUrlVisible(false);
    router.refresh();
  });

  const { mutate: fetchStoreLocation } = useFetchStoreLocation((data) => {
    setLocations(data?.locations);
    setFetchLocation(true);
  });

  const handleOnClick = () => {
    const regex = /^[a-zA-Z0-9 ]+$/;
    if (newUrl.trim() === "") {
      alert("Please type new URL to proceed");
    } else if (!regex.test(newUrl)) {
      alert("Special characters not allowed");
    } else {
      updateUrl({ catalogueId: catalogueId!, newUrl });
      setEditUrlVisible(false);
    }
  };

  return (
    <>
      <List
        dataSource={data}
        renderItem={(item, index) => (
          <ListItem
            key={index}
            item={item}
            hideDelete={true}
            onClick={() => {
              // setSelectedItem(item);
              // setShowEdit(true);
              // setIsEdit(true);
            }}
            onStoreUrlClick={() => {
              setCatalogueId(item.objid);
              setSelectedCatalogues(item);
              if (item.url) {
                fetchStoreLocation({ store_url: item.url });
              } else {
                console.error("URL is missing!");
              }
            }}
            onEditClick={() => {
              setNewUrl("");
              setCatalogueId(item.objid);
              setSelectedCatalogues(item);
              setEditUrlVisible(true);
            }}
          />
        )}
      />
      <Modal
        open={editUrlVisible}
        onOpenChange={setEditUrlVisible}
        width="30%"
        title={<p className="text-left text-lg font-medium">Edit URL</p>}
        showCloseButton={true}
        primaryAction={{
          label: "OK",
          onClick: handleOnClick,
          className: "bg-primary text-white hover:bg-secondary-90",
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => setEditUrlVisible(false),
          variant: "outline",
        }}
      >
        <p className="mb-2 text-sm text-gray-700">
          URL: {selectedCatalogues?.url}
        </p>
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Enter new URL"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Modal>
      <Modal
        open={fetchLocation}
        onOpenChange={setFetchLocation}
        title={
          <div className="text-center text-lg font-semibold">Locations</div>
        }
        primaryAction={{
          label: "OK",
          onClick: () => {},
          className: "bg-primary text-white hover:bg-secondary-90",
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => setFetchLocation(false),
          variant: "outline",
        }}
      >
        <p className="mb-4 text-sm text-gray-800">
          URL: {selectedCatalogues?.url}
        </p>

        {locations?.length > 0 ? (
          <RadioGroup
            value={value}
            onValueChange={(val) => setValue(val)}
            className="flex flex-col gap-3"
          >
            {locations?.map((item) => (
              <Label
                key={item.objid}
                className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-300 p-3"
              >
                <RadioGroupItem value={String(item.objid)} />
                <span className="text-sm text-primary">
                  {item.addressLine1}, {item.addressLine2}, {item.city},{" "}
                  {item.postalCode}
                </span>
              </Label>
            ))}
          </RadioGroup>
        ) : (
          <p className="text-gray-500">No location found</p>
        )}
      </Modal>
    </>
  );
};

export default Catalogue;
