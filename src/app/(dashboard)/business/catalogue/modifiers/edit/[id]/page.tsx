import { auth } from "@/auth";
import ModifierAddForm from "@/components/forms/business/store/modifier-form";
import ContainerWrapper from "@/components/global/container-wrapper";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditModifier({ params }: Props) {
  const param = await params;
  const id = Number(param.id);
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");

  return (
    <>
      <ContainerWrapper title="Edit Category">
        <ModifierAddForm modifierId={id} bizid={bizid} />
      </ContainerWrapper>
    </>
  );
}
