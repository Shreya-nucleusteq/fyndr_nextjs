import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Baseline,
  PaintBucket,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Outdent,
  Indent,
  Link,
  Table,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

import {
  blockTypeOptions,
  fontFamilyOptions,
  fontSizeOptions,
} from "@/constants/editor";
import { ToolBarProps } from "@/types/editor";

import styles from "./custom-editor.module.css";

const EditorToolbar = ({
  handleColorChange,
  ToolbarSelect,
  ToolbarButton,
  formatText,
  insertTable,
  handleBlockFormat,
  insertLink,
  insertImage,
  activeFormats,
}: ToolBarProps) => {
  const foreColorRef: React.RefObject<HTMLInputElement | null> = useRef(null);
  const bgColorRef: React.RefObject<HTMLInputElement | null> = useRef(null);

  const [foreColor, setForeColor] = useState("#7F7F7F");
  const [bgColor, setBgColor] = useState("#7F7F7F0");

  const onColorClick = (ref: React.RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <div className={styles.toolbar}>
      {/* Undo/Redo */}
      <div className={styles.toolbarGroup}>
        <ToolbarButton onClick={() => formatText("undo")} title="Undo (Ctrl+Z)">
          <Undo2 size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => formatText("redo")} title="Redo (Ctrl+Y)">
          <Redo2 size={18} />
        </ToolbarButton>
      </div>

      <div className={styles.toolbarDivider} />

      {/* Block Format */}
      <div className={styles.toolbarGroup}>
        <ToolbarSelect
          onChange={handleBlockFormat}
          options={blockTypeOptions}
        />
      </div>

      <div className={styles.toolbarDivider} />

      {/* Font Controls */}
      <div className={styles.toolbarGroup}>
        <ToolbarSelect
          onChange={(value) => formatText("fontName", value)}
          options={fontFamilyOptions}
        />
        <div className={styles.toolbarDivider} />
        <ToolbarSelect
          onChange={(value) => formatText("fontSize", value)}
          options={fontSizeOptions}
        />
      </div>

      <div className={styles.toolbarDivider} />

      {/* Text Formatting */}
      <div className={styles.toolbarGroup}>
        <ToolbarButton
          onClick={() => formatText("bold")}
          active={activeFormats.bold}
          title="Bold (Ctrl+B)"
        >
          <Bold size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatText("italic")}
          active={activeFormats.italic}
          title="Italic (Ctrl+I)"
        >
          <Italic size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatText("underline")}
          active={activeFormats.underline}
          title="Underline (Ctrl+U)"
        >
          <Underline size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatText("strikethrough")}
          active={activeFormats.strikethrough}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </ToolbarButton>
      </div>

      <div className={styles.toolbarDivider} />

      {/* Colors */}
      <div className={styles.toolbarGroup}>
        <div
          className={styles.colorPickerWrapper}
          onClick={() => onColorClick(foreColorRef)}
          title="Text Color"
          style={{ cursor: "pointer", color: foreColor }}
        >
          <Baseline />
          <input
            type="color"
            ref={foreColorRef}
            className={styles.hiddenColorInput}
            value={foreColor}
            onChange={(e) => {
              setForeColor(e.target.value);
              handleColorChange("foreColor")(e);
            }}
          />
        </div>
        <div
          className={styles.colorPickerWrapper}
          onClick={() => onColorClick(bgColorRef)}
          title="Background Color"
          style={{ cursor: "pointer", color: bgColor }}
        >
          <PaintBucket />
          <input
            type="color"
            ref={bgColorRef}
            className={styles.hiddenColorInput}
            value={bgColor}
            onChange={(e) => {
              setBgColor(e.target.value);
              handleColorChange("hiliteColor")(e);
            }}
          />
        </div>
      </div>

      <div className={styles.toolbarDivider} />

      {/* Alignment */}
      <div className={styles.toolbarGroup}>
        <ToolbarButton
          onClick={() => formatText("justifyLeft")}
          active={activeFormats.alignLeft}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatText("justifyCenter")}
          active={activeFormats.alignCenter}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatText("justifyRight")}
          active={activeFormats.alignRight}
          title="Align Right"
        >
          <AlignRight size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatText("justifyFull")}
          active={activeFormats.alignJustify}
          title="Justify"
        >
          <AlignJustify size={18} />
        </ToolbarButton>
      </div>

      <div className={styles.toolbarDivider} />

      {/* Lists */}
      <div className={styles.toolbarGroup}>
        <ToolbarButton
          onClick={() => formatText("insertUnorderedList")}
          title="Bullet List"
        >
          <List size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatText("insertOrderedList")}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatText("outdent")}
          title="Decrease Indent"
        >
          <Outdent size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatText("indent")}
          title="Increase Indent"
        >
          <Indent size={18} />
        </ToolbarButton>
      </div>

      <div className={styles.toolbarDivider} />

      {/* Insert */}
      <div className={styles.toolbarGroup}>
        <ToolbarButton onClick={insertLink} title="Insert Link">
          <Link size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={insertImage} title="Insert Image">
          <Image
            height={18}
            width={18}
            src="/icons/image-icon.svg"
            alt="Insert Image"
          />
        </ToolbarButton>
        <ToolbarButton onClick={insertTable} title="Insert Table">
          <Table size={18} />
        </ToolbarButton>
      </div>
    </div>
  );
};

export default EditorToolbar;
