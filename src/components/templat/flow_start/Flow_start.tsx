import { Handle, Position } from "@xyflow/react";
import React, { useCallback } from "react";
import type { NodeProps } from "@xyflow/react";
import type { TemplateData } from "../../schema/TemplateData";
import './style.css'
import { Switch } from "@mui/material";
import TagInput from "./TagInput";

const label = {
  inputProps: {
    "aria-label": "Switch demo",
    // id: "demo-switch",  // ✅ add unique id
    name: "demoSwitch2",
    id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  }
};


export const Flow_start: React.FC<NodeProps<TemplateData>> = ({ id, data }) => {
  // const [tags, setTags] = useState<string[]>(initialTags || data.tags || []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (typeof data.onChange === "function") {
        data.onChange(id, { ...data, [e.target.name]: e.target.value });
      }
    },
    [data, id]
  );


  // ✅ new TagInput change handler
  const onTagsChange = useCallback(
    (tags: string[]) => {
      if (typeof data.onChange === "function") {
        data.onChange(id, { ...data, tags }); // update tags array in node data
      }
    },
    [data, id]
  );









  return (
    <div className="p-3 rounded-xl shadow bg-white border w-[220px] main">
      {/* <Handle type="source" position={Position.Right} /> */}
      <div className="head"><img className="img" src="/flow_logo.png" alt="" /> <h4 className="h4">Flow Start</h4>
        <div className="hender">
          <Handle
            type="source"
            // className="my-custom-handle"
            position={Position.Top}
            id="flow_start"
            style={{
              display: "inline-block",
              right: "17px",
              background: "#fff",
              border: "green solid 2px",
              width: "10px",
              height: "10px",
            }}
          />



        </div>
      </div>





      <div className="bodystyle">
        <form id="swm">
          <p className="jss1075 text-left">Type, press enter to add keyword</p>

          <TagInput
            initialTags={Array.isArray(data.tags) ? data.tags : []}
            placeholder="Type and press Enter..."
            onChange={onTagsChange}
           
          />

          {/* <input
            name="title"
            id="title"
            value={String(data.title || "")}
            onChange={onChange}
            placeholder="Enter Title"
            className="w-full p-2 border rounded mb-2 input-this text-gray-600"
          /> */}


          <p className="jss1075 jss2">Enter regex to match substring trigger. Enable toggle for case sensitive regex.</p><span className="span_btn">
            <Switch name="notifications2" {...label} />

            {/* <TextField label="Email" />      // warning: id/name missing
                        <Switch {...label} /> */}


          </span>

          <input
            name="Regex"
            id="Regex"
            value={String(data.Regex || "")}
            onChange={onChange}
            placeholder="Enter Regex"
            className="w-full p-2 border rounded mb-2 input-this text-center "
          />

          <p className="jss1075 text-left">Add upto 5 template to begin flow</p>

          <input
            type="button"
            name="Choose_Template"
            id="Choose_Template"
            value="Choose Template"
            className="w-full p-2 border rounded mb-2 input-this text-center text-stone-900"
          />


          <p className="jss1075 text-left">Add upto 1 Campaign to begin flow</p>

          <input
            type="button"
            name="Choose_QR_Campaign"
            id="Choose_QR_Campaign"
            value="Choose QR Campaign"
            className="w-full p-2 border rounded mb-2 input-this text-center text-stone-900"
          />

          <p className="jss1075 text-left">Add upto 20 Meta Ads to begin flow</p>

          <input
            type="button"
            name="Choose_Facebook_Ad"
            id="Choose_Facebook_Ad"
            value="Choose Facebook Ad"
            className="w-full p-2 border rounded mb-2 input-this text-center text-stone-900"
          />

          {String(data.image && (
            <img src={String(data.image)} alt="uploaded" className="w-full h-24 object-cover rounded" />
          ))}
        </form>
      </div>

      {/* <Handle type="target" position={Position.Left} /> */}
      <Handle type="source" id="kjl" position={Position.Right} />
    </div>
  );
}





// export default Flow_start