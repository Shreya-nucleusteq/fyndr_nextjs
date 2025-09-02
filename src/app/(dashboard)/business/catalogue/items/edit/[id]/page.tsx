import { auth } from "@/auth";
import ItemAddForm from "@/components/forms/business/store/item-form";
import ContainerWrapper from "@/components/global/container-wrapper";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditItem({ params }: Props) {
  const param = await params;
  const id = Number(param.id);
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");

  return (
    <>
      <ContainerWrapper title="Edit Item">
        <ItemAddForm bizid={bizid} itemId={id} />
      </ContainerWrapper>
    </>
  );
}
