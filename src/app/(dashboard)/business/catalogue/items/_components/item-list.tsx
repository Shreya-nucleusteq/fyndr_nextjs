"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { onDeleteItem } from "@/actions/catalogue.actions";
import toast from "@/components/global/toast";
import { StoreItem } from "@/types/catalogue/catalogue.types";
import { useItemStore } from "@/zustand/stores/store-item.store";

import List from "../../../_components/list";
import ListItem from "../../_components/list-Item";

type Props = {
  items: StoreItem[];
  bizid: number;
};

const ItemList = ({ items, bizid }: Props) => {
  const router = useRouter();
  const setItems = useItemStore((state) => state.setItems);
  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  const handleEdit = (id: number) => {
    router.push(`/business/catalogue/items/edit/${id}`);
  };

  const handleDelete = async (objid: number) => {
    await onDeleteItem({ objid, bizid });
    toast.success({
      message: "Item deleted Successfully",
    });
  };
  return (
    <List
      dataSource={items}
      renderItem={(item, index) => (
        <ListItem
          key={index}
          item={item}
          deletePress={() => handleDelete(item.objid)}
          onClick={() => handleEdit(item.objid)}
        />
      )}
    />
  );
};

export default ItemList;
