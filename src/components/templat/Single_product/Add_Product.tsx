import React, { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { SvgIcon } from "@mui/material";
// import { NodeProps } from "@xyflow/react";
import { TemplateData } from "../../schema/TemplateData";

// ✅ unique id generator
const generateUniqueId = () =>
  "upload_" + Date.now() + "_" + Math.floor(Math.random() * 10000);

interface UploadMediaProps {
  id: string;
  data: {
    fileupload?: string;
    fileType?: string;
    fileName?: string;
    onChange?: (id: string, updatedData: any) => void;
  };
}

export default function Add_Product({ id, data }: UploadMediaProps) {
  const nodeData = data as TemplateData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uniqueId = useMemo(() => generateUniqueId(), []);

  const [preview, setPreview] = useState<string | null>(
    typeof nodeData.fileupload === "string" ? nodeData.fileupload : null
  );

  // 🔁 update preview when data.fileupload changes from outside
  useEffect(() => {
    if (typeof nodeData.fileupload === "string") {
      setPreview(nodeData.fileupload);
    }
  }, [nodeData.fileupload]);

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setPreview(base64);

        // ✅ Update full node data — same pattern as your handleChange
        nodeData.onChange?.(id, {
          ...nodeData,
          fileupload: base64,
          fileId: uniqueId,
          fileName: file.name,
          fileType: file.type,
        });
      };

      reader.readAsDataURL(file);
    },
    [id, nodeData, uniqueId]
  );

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:bg-gray-50 transition-all overflow-hidden"
    >
      {preview ? (
        <>
          {/* Dynamic file preview */}
          {nodeData.fileType?.startsWith("image/") ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : nodeData.fileType?.startsWith("video/") ? (
            <video src={preview} className="w-full h-full object-cover" controls />
          ) : nodeData.fileType?.startsWith("audio/") ? (
            <audio src={preview} controls className="w-full" />
          ) : nodeData.fileType === "application/pdf" ? (
            <embed src={preview} type="application/pdf" className="w-full h-full" />
          ) : (
            <p className="text-sm text-gray-500">File selected: {nodeData.fileName}</p>
          )}
        </>
      ) : (
        <>
          <SvgIcon>
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 
  0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.82 12l1.1 2h6.16l1.1-2H7.82zM20 
  8h-3.31l-1.9-4.57C14.62 3.17 14.34 3 14 3H10c-.34 0-.62.17-.79.43L7.31 8H4c-.55 0-1 
  .45-1 1s.45 1 1 1h1l2.6 5.59c.15.35.5.41.7.41h8c.2 0 .55-.06.7-.41L19 10h1c.55 0 
  1-.45 1-1s-.45-1-1-1z" />
          </SvgIcon>
          <p className="text-sm text-gray-500 m-0">+ Add Product</p>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*,audio/*,application/pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
