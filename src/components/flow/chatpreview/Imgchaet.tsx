import React, { useState, useRef, useEffect } from "react";
import "./chat.css";

interface FileData {
  preview: string | null;
  type: string | null;
  name: string | null;
}

interface ImgchaetProps {
  fileData?: FileData | string | null;
}

const Imgchaet: React.FC<ImgchaetProps> = ({ fileData }) => {
  const [data, setData] = useState<FileData>({
    preview: null,
    type: null,
    name: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🧠 Load file data if provided from props (React Flow)
  useEffect(() => {
    if (!fileData) return;

    if (typeof fileData === "string") {
      // string ho to assume karo ye base64 hai
      setData({ preview: fileData, type: "image/*", name: "Uploaded" });
    } else {
      setData(fileData);
    }
  }, [fileData]);

  const handleClick = () => fileInputRef.current?.click();

  


  return (
    <div className="flex flex-col gap-3 pt-4 pb-4">
      <div
        onClick={handleClick}
        className="flex flex-col items-center justify-center w-56 h-56 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:bg-gray-50 transition-all overflow-hidden"
      >
        {data.preview ? (
          <>
            {data.type?.startsWith("image/") && (
              <img src={data.preview} alt="preview" className="w-full h-full object-cover" />
            )}
            {data.type?.startsWith("video/") && (
              <video src={data.preview} className="w-full h-full object-cover" controls />
            )}
            {data.type?.startsWith("audio/") && (
              <audio src={data.preview} controls className="w-full" />
            )}
            {data.type === "application/pdf" && (
              <embed src={data.preview} type="application/pdf" className="w-full h-full" />
            )}
          </>
        ) : (
          <p className="text-gray-500 text-sm">+ Upload Image / Video / Audio / PDF</p>
        )}
      </div>

     

      
    </div>
  );
};

export default Imgchaet;
