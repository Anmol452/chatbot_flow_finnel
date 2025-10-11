import { Handle, Position } from "@xyflow/react";
import { useCallback } from "react";
import type { NodeProps } from "@xyflow/react";
import type { TemplateData } from "../schema/TemplateData";


function TemplateNode({ id, data }: NodeProps<TemplateData>) {


  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (data.onChange as (id: string, newData: TemplateData) => void)(
      id,
      { ...data, [e.target.name]: e.target.value } as TemplateData
    );
  }, [data, id]);

  const onImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        (data.onChange as (id: string, newData: TemplateData) => void)(
          id,
          { ...data, image: reader.result } as TemplateData
        );

      };
      reader.readAsDataURL(file);
    }
  }, [data, id]);

  return (
    <div className="p-3 rounded-xl shadow bg-white border w-[220px]">
      <input
        name="title"
        value={String(data.title || "")}
        onChange={onChange}
        placeholder="Enter Title"
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        name="description"
        value={String(data.description || "")}
        onChange={onChange}
        placeholder="Enter Description"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="mb-2"
      />
    
    
      {typeof data.image === "string" && data.image && (
        <img src={data.image} alt="uploaded" className="w-full h-24 object-cover rounded" />
      )}

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}


export default TemplateNode