import { auth } from "@/auth";
import CategoryAddForm from "@/components/forms/business/store/category-form";
import ContainerWrapper from "@/components/global/container-wrapper";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCategory({ params }: Props) {
  const param = await params;
  const id = Number(param.id);
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");

  return (
    <>
      <ContainerWrapper title="Edit Category">
        <CategoryAddForm categoryId={id} bizid={bizid} />
      </ContainerWrapper>
    </>
  );
}
