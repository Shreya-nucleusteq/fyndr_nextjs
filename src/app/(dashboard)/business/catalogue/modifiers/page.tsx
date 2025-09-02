import { onGetStoreModifier } from "@/actions/catalogue.actions";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/container-wrapper";

import AddModifier from "./_components/add-modifier-button";
import ModifierList from "./_components/modifier-list";

const CatalogModifiers = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");

  const { success, data } = await onGetStoreModifier({ bizid });
  if (!success || !data) return null;

  return (
    <ContainerWrapper title="Modifiers" headerOption={<AddModifier />}>
      <ModifierList modifiers={data?.modifiers || []} bizid={bizid} />
    </ContainerWrapper>
  );
};

export default CatalogModifiers;
