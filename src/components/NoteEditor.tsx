"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function NoteEditor({ value, onChange, placeholder }: Props) {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
    clipboard: { matchVisual: false },
  };
  const formats = ["bold", "italic", "underline", "list", "bullet", "align", "link"];
  return (
    <div className="rounded-md border">
      {/* @ts-ignore */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || "Write your note..."}
        style={{ minHeight: 220 }}
      />
    </div>
  );
}
