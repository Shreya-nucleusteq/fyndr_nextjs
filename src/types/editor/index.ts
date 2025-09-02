import { ChangeEventHandler } from "react";

export interface ActiveFormats {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  alignLeft: boolean;
  alignCenter: boolean;
  alignRight: boolean;
  alignJustify: boolean;
}

export interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}
export interface SelectOption {
  value: string;
  label: string;
}

export interface ToolbarSelectProps {
  onChange: (value: string) => void;
  options: SelectOption[];
  defaultValue?: string;
}

export interface LexicalEditorProps {
  onChange?: (html: string) => void;
  value?: string;
  className?: string;
}

export interface ToolBarProps {
  ToolbarButton: React.ComponentType<ToolbarButtonProps>;
  ToolbarSelect: React.ComponentType<ToolbarSelectProps>;
  handleColorChange: (
    type: "foreColor" | "hiliteColor"
  ) => ChangeEventHandler<HTMLInputElement>;
  formatText: (command: string, value?: string) => void;
  insertTable: () => void;
  handleBlockFormat: (value: string) => void;
  insertLink: () => void;
  insertImage: () => void;
  activeFormats: ActiveFormats;
}
