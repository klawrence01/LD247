"use client";

import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("./QuillBase"), {
  ssr: false,
}) as any;

type NoteEditorProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

export default function NoteEditor({
  value,
  onChange,
  placeholder,
}: NoteEditorProps) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <QuillEditor
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      modules={modules}
    />
  );
}
