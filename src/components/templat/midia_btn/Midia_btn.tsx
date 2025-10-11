import { Handle, Position } from "@xyflow/react";
import { useCallback } from "react";
import type { NodeProps } from "@xyflow/react";
import type { TemplateData } from "../../schema/TemplateData";
import './midia.css'
import { FormHelperText, SvgIcon, Switch, TextField } from "@mui/material";
import * as React from 'react';
import { Trash, Copy, CircleX, EyeIcon, Plus } from "lucide-react";


const label = {
    inputProps: {
        "aria-label": "Switch demo",
        id: "demo-switch2",  // ✅ add unique id
        name: "demoSwitch2"  // ✅ optional, for forms
    }
};



function Midia_btn({ id, data }: NodeProps<TemplateData>) {

    const [hover, setHover] = React.useState(false);
    const [inputCount, setInputCount] = React.useState<number>(0);
    const [btndisble, setBtndisble] = React.useState<boolean>(false);
    const [switchbtn, setSwitchbtn] = React.useState<boolean>(false);
    const [caption, setCaption] = React.useState<string>("");

 React.useEffect(() => {
        if (inputCount === 3) {
            setBtndisble(true);
        } else {
            setBtndisble(false);
        }
    }, [inputCount]);

    const nodeData = data as TemplateData; // ✅ TypeScript को बताया कि ये TemplateData है
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        nodeData.onChange?.(id, { title: e.target.value });
      };



    const onFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const fileType = file.type.split("/")[0]; // e.g. "image", "video", "audio", "application"

            const reader = new FileReader();
            reader.onload = () => {
                const fileData = {
                    ...data,
                    fileName: file.name,
                    fileType: file.type,
                    preview: reader.result, // base64 for quick preview
                };

                if (typeof data.onChange === "function") {
                    data.onChange(id, fileData);
                }
            };

            // 🧠 Agar text ya JSON file ho to as text padho
            if (fileType === "text" || file.type === "application/json") {
                reader.readAsText(file);
            } else {
                reader.readAsDataURL(file); // image/video/audio ke liye
            }
        },
        [data, id]
    );


    const funSwitchbtn = () => {
        if (switchbtn === false) {
            setSwitchbtn(true);
        } else {
            setSwitchbtn(false);
        }
    }




    return (
        <>




            <div className="p-3 rounded-xl shadow bg-white border w-[220px] hover:border hover:border-green-600" onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)} style={{ display:  "block" }}>



                {hover && (
                    <>
                        <div className="btnupbox">

                            <button
                                onClick={() => {
                                    if (typeof data.onDelete === "function") {
                                        data.onDelete(id);
                                    }
                                }}
                                className="btndelete"
                            >
                                <Trash className="size-4" />
                            </button>

                            <button
                                // onClick={() => data.onCopy(id)}
                                 onClick={() => {
                                    if (typeof data.onDelete === "function") {
                                        data.onDelete(id);
                                    }
                                }}
                                className="copybtn"
                            >
                                <Copy className="size-4" />
                            </button>
                        </div>



                        <div className="sidebox">

                            <button
                                // onClick={() => data.onDelete(id)}
                                 onClick={() => {
                                    if (typeof data.onDelete === "function") {
                                        data.onDelete(id);
                                    }
                                }}
                                className="viewbtn p1"
                            >
                                <Plus className="size-4" />
                            </button>


                            <button
                                // onClick={() => data.onCopy(id)}
                                 onClick={() => {
                                    if (typeof data.onCopy === "function") {
                                        data.onCopy(id);
                                    }
                                }}
                                className="viewbtn e1"
                            >
                                <EyeIcon className="size-4" />
                            </button>
                        </div>


                    </>
                )}
                {/* <Handle type="source" position={Position.Right} /> */}
                <div className="head-text"><img className="img" src="/messiage.png" alt="" /> <h4 className="h4">Message</h4> </div>


                <div className="bodystyle border border-red-600 ">
                    {/* <p className="jss1075 text-left">Type, press enter to add keyword</p> */}
                    <form action="" id="media_form_id">

                        <p className="jss1075 text-left">Select media type</p>

                        <select
                            name="Type_delay"
                            id="Media-Type"
                            value={String(data.option || "")}
                            className="w-full p-2 border rounded mb-2 input-this "

                        >
                            <option value="image">IMAGE</option>
                            <option value="video" >VIDEO</option>
                            <option value="audio">AUDIO</option>
                            <option value="file">FILE</option>
                        </select>


                        <p className="jss1075 text-left">Enter or paste url</p>

                        <input
                            type="file"
                            accept="image/*,video/*,audio/*,.pdf,.txt,.json"
                            onChange={onFileChange}
                            name="Type_delay"
                            id="Media-Type"
                            value={String(data.url || "")}
                            className="w-full p-2 border rounded mb-2 input-this "
                            placeholder="Type url..."
                        />





                        <div
                            style={{
                                borderTopLeftRadius: "8px",
                                borderTopRightRadius: "8px",
                                width: "100%",
                                height: "150px",
                                backgroundColor: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "12px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "5px",
                                }}
                            >
                                <SvgIcon>
                                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                                </SvgIcon>
                                <p style={{ margin: 0 }}>+ Add Media</p>
                            </div>
                        </div>



                        <div
                            className="mb-2"
                            style={{
                                backgroundColor: "white",
                                borderTop: "1px solid rgb(234, 230, 223)",
                                borderRadius: "0px 0px 8px 8px",
                            }}
                        >
                            <TextField
                                fullWidth
                                multiline
                                maxRows={10}
                                placeholder="Caption..."
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                inputProps={{ maxLength: 1024, style: { textAlign: "left" } }}
                                variant="outlined" // 👈 yahan standard ki jagah outlined rakho
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            border: "none", // 👈 border remove (flat look)
                                        },
                                        "&:hover fieldset": {
                                            border: "none",
                                        },
                                        "&.Mui-focused fieldset": {
                                            border: "none",
                                        },
                                    },
                                }}
                            />
                            <FormHelperText style={{ marginLeft: "auto", fontSize: "10px", textAlign: "right" }}>
                                {caption.length}/1024
                            </FormHelperText>
                        </div>







                        {Array.from({ length: inputCount }, (_, i) => (

                            <div className="meindev">
                                <div className="d">
                                    <CircleX className="size-3 absolute" onClick={() => setInputCount(prev => prev - 1)} />
                                </div>


                                <input
                                    key={i}
                                    name={`title${i}`}
                                    id={`title2${i}`}
                                    value={String(data[`title${i}`] || "")}
                                    onChange={handleChange}
                                    placeholder={`Enter text ${i + 1}`}
                                    className="w-full p-2 border outline-2 outline-red-500/100 rounded  input-this it text-gray-600 h-20 text-left"
                                />



                                <div className="text-hender daymic">
                                    <Handle
                                        type="source"
                                        // className="my-custom-handle"
                                        position={Position.Top}
                                        id={`daynic-${i}`}
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
                                <FormHelperText style={{ marginLeft: "auto", fontSize: "10px", textAlign: "right", position: "relative", top: "-27px", right: "3px" }}>
                                    {caption.length}/20
                                </FormHelperText>


                            </div>

                        ))}





                        <input
                            type="button"
                            name="Add_button"
                            id="Add_button"
                            value="+ Add button"
                            onClick={() => setInputCount(prev => prev + 1)}
                            className="w-full p-2 border rounded input-this text-center text-stone-900"
                            disabled={btndisble}
                        />
                        <div className="text-hender">
                            <Handle
                                type="target"
                                position={Position.Left}
                                id="flow_start"
                                style={{
                                    display: "inline-block",
                                    right: "245px",
                                    top: "60px",
                                    width: "18px",
                                    height: "400px",
                                    background: "transparent"
                                }}
                            />
                        </div>

                        <p className="jss1075 text-left">Set Delay</p>



                        <input
                            type="text"
                            name="Type_delay"
                            id="Media-Type"
                            value={String(data.url || "")}
                            className="w-full p-2 border rounded mb-2 input-this "
                            placeholder="Type delay in seconds..."
                        />




                        <p className="jss1075 jss2">Set Timeout</p><span className="span_btn2"><Switch name="notifications"  {...label} onClick={funSwitchbtn} /></span>






                        {switchbtn ? (
                            <div>

                                <input
                                    name="time"
                                    id="time"
                                    value={String(data["time"] || "")}
                                    onChange={handleChange}
                                    placeholder="Enter set time"
                                    className="w-full p-2 border rounded mb-2 
                                               input-this text-gray-600 h-20 text-left"
                                />

                                <input
                                    type="button"
                                    name="Add_button"
                                    id="Add_button"
                                    value="After Timeout"
                                    onClick={() => setInputCount(prev => prev + 1)}
                                    className="w-full p-2 border rounded mb-2 input-this text-center text-stone-900 outline-red-500/100"
                                    disabled={btndisble}
                                />
                            </div>


                        ) : null}


                        {typeof data.image === "string" && data.image && (
                            <img src={data.image} alt="uploaded" className="w-full h-24 object-cover rounded" />
                        )}



                    </form>

                </div>
                <input
                    type="button"
                    name="Add_button"
                    id="Add_button"
                    value="+ Add button"
                    onClick={() => setInputCount(prev => prev + 1)}
                    className="w-full p-2 border rounded mb-2 input-this text-center text-stone-900 "
                    disabled={btndisble}
                />

                <div className="last-btn">
                    <div className="con">
                        Connect Component
                    </div>


                    <div className="text-hender">
                        <Handle
                            type="source"
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

            </div>


        </>
    );
}






export default Midia_btn
