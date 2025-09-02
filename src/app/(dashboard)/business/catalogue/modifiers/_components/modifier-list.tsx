"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { onDeleteModifier } from "@/actions/catalogue.actions";
import toast from "@/components/global/toast";
import { StoreModifier } from "@/types/catalogue/catalogue.types";
import { useModifierStore } from "@/zustand/stores/store-modifier.store";

import List from "../../../_components/list";
import ListItem from "../../_components/list-Item";

type Props = {
  modifiers: StoreModifier[];
  bizid: number;
};

const ModifierList = ({ modifiers, bizid }: Props) => {
  const router = useRouter();
  const setModifiers = useModifierStore((state) => state.setModifiers);

  useEffect(() => {
    setModifiers(modifiers);
  }, [modifiers, setModifiers]);

  const handleDelete = async (objid: number) => {
    await onDeleteModifier({ objid, bizid });
    toast.success({
      message: "Modifier deleted Successfully",
    });
  };

  const handleEdit = (id: number) => {
    router.push(`/business/catalogue/modifiers/edit/${id}`);
  };

  return (
    <List
      dataSource={modifiers}
      renderItem={(item, index) => {
        const newItem = { ...item, name: item.modName };
        return (
          <ListItem
            key={index}
            item={newItem}
            deletePress={() => handleDelete(newItem.objid)}
            onClick={() => handleEdit(item.objid)}
          />
        );
      }}
    />
  );
};

export default ModifierList;
