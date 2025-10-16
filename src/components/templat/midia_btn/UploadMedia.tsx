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

export default function UploadMedia({ id, data }: UploadMediaProps) {
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
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
          </SvgIcon>
          <p className="text-sm text-gray-500 m-0">+ Add Media</p>
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
