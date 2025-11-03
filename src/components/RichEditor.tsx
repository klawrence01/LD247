"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  defaultHTML?: string;
  nameHtml?: string; // hidden input name for HTML payload
  nameText?: string; // hidden input name for plain-text fallback
};

export default function RichEditor({
  defaultHTML = "",
  nameHtml = "body_html",
  nameText = "body_text",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(defaultHTML);
  const [text, setText] = useState("");

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = defaultHTML;
      setHtml(defaultHTML);
      setText(ref.current.innerText || "");
    }
  }, [defaultHTML]);

  const onInput = () => {
    if (!ref.current) return;
    setHtml(ref.current.innerHTML);
    setText(ref.current.innerText || "");
  };

  const fmt = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    onInput();
  };

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (!url) return;
    fmt("createLink", url);
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border rounded-t-lg px-2 py-1 text-sm">
        <button type="button" onClick={() => fmt("bold")} className="px-2 py-1 border rounded">B</button>
        <button type="button" onClick={() => fmt("italic")} className="px-2 py-1 border rounded">I</button>
        <button type="button" onClick={() => fmt("underline")} className="px-2 py-1 border rounded">U</button>
        <button type="button" onClick={() => fmt("insertUnorderedList")} className="px-2 py-1 border rounded">• List</button>
        <button type="button" onClick={() => fmt("insertOrderedList")} className="px-2 py-1 border rounded">1. List</button>
        <button type="button" onClick={addLink} className="px-2 py-1 border rounded">Link</button>
        <button type="button" onClick={() => fmt("removeFormat")} className="px-2 py-1 border rounded">Clear</button>
      </div>

      {/* Editable area */}
      <div
        ref={ref}
        onInput={onInput}
        contentEditable
        className="min-h-[180px] border-x border-b rounded-b-lg px-3 py-2 focus:outline-none"
        suppressContentEditableWarning
        aria-label="Note editor"
      />

      {/* Hidden fields posted with the form */}
      <input type="hidden" name={nameHtml} value={html} />
      <input type="hidden" name={nameText} value={text} />
    </div>
  );
}
