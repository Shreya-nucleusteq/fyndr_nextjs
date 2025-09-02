import { onGetAccount } from "@/actions/auth.actions";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/container-wrapper";
import { RouteParams } from "@/types/global";

import Summary from "./_components/summary/index";
import Transaction from "./_components/transaction";
import InvoiceCreateButton from "./_components/transaction/_components/invoice-edit/invoice-create-button";

const BusinessPage = async ({
  searchParams,
}: Pick<RouteParams, "searchParams">) => {
  const { month, months, status, channel, search } = await searchParams;
  const session = await auth();
  const email = session?.user.email;
  const token = session?.accessToken;
  if (!email) throw new Error("Email is required");
  if (!token) throw new Error("Session expired!!");

  const { success, data } = await onGetAccount({
    payload: {
      email,
      regMode: "facebook",
      accessToken: token,
    },
  });

  if (!success || !data) return null;
  const { bizid, indvid } = data;
  if (!bizid) return null;

  return (
    <>
      <div className="mx-auto w-[90%] max-w-screen-xl space-y-4 ">
        <ContainerWrapper
          title="My Orders"
          headerOption={<InvoiceCreateButton />}
          noPadding
        >
          <Summary month={month} bizid={bizid} />
        </ContainerWrapper>
        <ContainerWrapper>
          <Transaction
            bizid={bizid}
            months={months}
            status={status}
            channel={channel}
            indvid={indvid}
            search={search}
            searchParams={searchParams}
          />
        </ContainerWrapper>
      </div>
    </>
  );
};

export default BusinessPage;
