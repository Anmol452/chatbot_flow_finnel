import type { XYPosition } from "@xyflow/react";


export interface TemplateData extends Record<string, unknown>  {
  label: string;
  title?: string;
  description?: string;
  image?: string | ArrayBuffer | null | any;
  id: string;
  data: Record<string, unknown>;
  selected?: boolean;
  xPos?: number;
  yPos?: number;
  width?: number;
  height?: number;
  type?: string;
  position: XYPosition;
  onDelete: (id: string) => void;
  onChange?: (id: string, newData: TemplateData) => void;
  handleDelete?: (id: string, newData: any) => void;
  Regex?: string;
  btntitle0?: string;
  btntitle1?: string;
  btntitle2?: string;
  tags?: string[];
  preview?: string | null;
  fileName?: string;
  fileType?: string;
  imageFile?: File | null;
  fileupload?: string | null;
  url?: string | null;
  fileId?: string;
  dataimg?:  Record<string, unknown>;
  fileData?: {
    preview: string | null;
    type: string | null;
    name: string | null;
  };
  // ✅ corrected function prop names
  
  // onFileUpload?: (id: string, file: File) => void; // ✅ corrected
  // onFileSelect?: (file: File) => void; // ✅ corrected
  // openChatPreview?: (id: string) => void; // ✅ corrected
  // onPreviewClick?: () => void;
  [key: string]: any; 
   
}


// TemplateData.ts
// export interface TemplateData {
//   label: string;
//   onChange?: (id: string, newData: any) => void;
// }
