"use client";

import "react-quill/dist/quill.snow.css";
import ReactQuillImport from "react-quill";

// force it to be a normal React component
const ReactQuill = ReactQuillImport as any;

export default function QuillBase(props: any) {
  return <ReactQuill {...props} />;
}
