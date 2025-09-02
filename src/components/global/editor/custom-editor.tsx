"use client";

import React, { useRef, useState, useEffect } from "react";

import {
  ActiveFormats,
  LexicalEditorProps,
  ToolbarButtonProps,
  ToolbarSelectProps,
} from "@/types/editor";

import styles from "./custom-editor.module.css";
import EditorToolbar from "./editor-toolbar";

const CustomEditor: React.FC<LexicalEditorProps> = ({
  onChange,
  value = "",
  className = "",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [, setHtmlContent] = useState<string>("");
  const [activeFormats, setActiveFormats] = useState<ActiveFormats>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    alignJustify: false,
  });

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const updateHtmlContent = (): void => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlContent(html);
      onChange?.(html);
    }
  };

  // Handle input changes
  const handleInput = (): void => {
    updateHtmlContent();
    updateActiveFormats();
  };

  // Update active format states
  const updateActiveFormats = (): void => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setActiveFormats({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strikethrough: document.queryCommandState("strikethrough"),
        alignLeft: document.queryCommandState("justifyLeft"),
        alignCenter: document.queryCommandState("justifyCenter"),
        alignRight: document.queryCommandState("justifyRight"),
        alignJustify: document.queryCommandState("justifyFull"),
      });
    }
  };

  // Handle selection change
  const handleSelectionChange = (): void => {
    updateActiveFormats();
  };

  // Add event listener for selection changes
  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Format text commands
  const formatText = (command: string, value: string | null = null): void => {
    document.execCommand(command, false, value || undefined);
    editorRef.current?.focus();
    updateHtmlContent();
    updateActiveFormats();
  };

  const insertHTML = (html: string): void => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const fragment = range.createContextualFragment(html);
      range.insertNode(fragment);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    updateHtmlContent();
  };

  const handleBlockFormat = (format: string): void => {
    switch (format) {
      case "h1":
        formatText("formatBlock", "<h1>");
        break;
      case "h2":
        formatText("formatBlock", "<h2>");
        break;
      case "h3":
        formatText("formatBlock", "<h3>");
        break;
      case "p":
        formatText("formatBlock", "<p>");
        break;
      case "blockquote":
        formatText("formatBlock", "<blockquote>");
        break;
      case "pre":
        formatText("formatBlock", "<pre>");
        break;
      default:
        formatText("formatBlock", "<p>");
    }
  };

  const insertLink = (): void => {
    const url = prompt("Enter link URL:");
    const text = prompt("Enter display text for the link:");
    if (url && text) {
      insertHTML(
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
      );
    }
  };

  const insertImage = (): void => {
    const url = prompt("Enter image URL:");
    if (url) {
      insertHTML(
        `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`
      );
    }
  };

  const insertTable = (): void => {
    const rowsInput = prompt("Number of rows:");
    const colsInput = prompt("Number of columns:");

    const rows = parseInt(rowsInput || "3");
    const cols = parseInt(colsInput || "3");

    if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
      alert("Please enter valid numbers for rows and columns");
      return;
    }

    let tableHTML =
      '<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;"><tbody>';

    for (let i = 0; i < rows; i++) {
      tableHTML += "<tr>";
      for (let j = 0; j < cols; j++) {
        tableHTML +=
          '<td style="border: 1px solid #ccc; padding: 8px;">Cell</td>';
      }
      tableHTML += "</tr>";
    }

    tableHTML += "</tbody></table>";
    insertHTML(tableHTML);
  };

  const handleColorChange =
    (type: "foreColor" | "hiliteColor") =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      formatText(type, event.target.value);
    };

  // Handle key events
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    // Handle Ctrl+Z (Undo) and Ctrl+Y (Redo)
    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case "z":
          if (event.shiftKey) {
            event.preventDefault();
            formatText("redo");
          } else {
            event.preventDefault();
            formatText("undo");
          }
          break;
        case "y":
          event.preventDefault();
          formatText("redo");
          break;
        case "b":
          event.preventDefault();
          formatText("bold");
          break;
        case "i":
          event.preventDefault();
          formatText("italic");
          break;
        case "u":
          event.preventDefault();
          formatText("underline");
          break;
      }
    }
  };

  const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    onClick,
    active = false,
    children,
    title,
  }) => (
    <button
      onClick={onClick}
      className={`${styles.toolbarItem} ${active ? styles.active : ""}`}
      title={title}
      type="button"
    >
      {children}
    </button>
  );

  const ToolbarSelect: React.FC<ToolbarSelectProps> = ({
    onChange,
    options,
    defaultValue = "p",
  }) => (
    <select
      className={styles.toolbarSelect}
      onChange={(e) => onChange(e.target.value)}
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className={`${styles.editorContainer} ${className}`}>
      <EditorToolbar
        ToolbarButton={ToolbarButton}
        ToolbarSelect={ToolbarSelect}
        handleColorChange={handleColorChange}
        formatText={formatText}
        insertTable={insertTable}
        handleBlockFormat={handleBlockFormat}
        insertLink={insertLink}
        insertImage={insertImage}
        activeFormats={activeFormats}
      />
      <div
        ref={editorRef}
        className={styles.editorContent}
        contentEditable="true"
        onInput={handleInput}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning={true}
      />
    </div>
  );
};

export default CustomEditor;
