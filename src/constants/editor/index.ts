import { SelectOption } from "@/components/global/input/select/select.types";

export const blockTypeOptions: SelectOption[] = [
  { value: "p", label: "Normal" },
  { value: "h1", label: "Heading 1" },
  { value: "h2", label: "Heading 2" },
  { value: "h3", label: "Heading 3" },
  { value: "blockquote", label: "Quote" },
  { value: "pre", label: "Code Block" },
];

export const fontSizeOptions: SelectOption[] = [
  { value: "1", label: "Small" },
  { value: "3", label: "Normal" },
  { value: "5", label: "Large" },
  { value: "7", label: "Extra Large" },
];

export const fontFamilyOptions: SelectOption[] = [
  { value: "Arial", label: "Arial" },
  { value: "Times New Roman", label: "Times" },
  { value: "Courier New", label: "Courier" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
];
