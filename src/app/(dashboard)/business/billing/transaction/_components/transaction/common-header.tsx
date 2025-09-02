import TransactionSlider from "./months-slider";
import ReceivableDropdown from "./receivable-dropdown";
import TransactionInput from "./transaction-input";

type Props = {
  type: "receivable" | "payable";
};

const CommonHeader = ({ type }: Props) => {
  return (
    <>
      <div className="my-4 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-lg flex-1">
          <div className="relative">
            <TransactionInput />
          </div>
        </div>
        <div className="flex w-full flex-col items-end md:w-[300px]">
          <TransactionSlider />
        </div>
        {type === "receivable" && (
          <div>
            <ReceivableDropdown />
          </div>
        )}
      </div>
      <hr className="mb-2 border-gray-300" />
      <div className="mb-3 grid grid-cols-3 gap-4 text-sm font-semibold text-gray-600">
        <div className="text-left">
          {type === "receivable" ? "Username" : "Offer Name"}
        </div>
        <div className="text-center">Date</div>
        <div className="ml-24">Amount</div>
      </div>
    </>
  );
};

export default CommonHeader;
