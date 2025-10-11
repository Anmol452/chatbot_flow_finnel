import { Handle, Position } from "@xyflow/react";
// import { useCallback } from "react";
import type { NodeProps } from "@xyflow/react";
import type { TemplateData } from "../../schema/TemplateData";
import './Liststyle.css'
import { FormHelperText, Switch, TextField } from "@mui/material";
import * as React from 'react';
import { Trash, Copy, CircleX, EyeIcon, Plus } from "lucide-react";


const label = {
    inputProps: {
        "aria-label": "Switch demo",
        id: "demo-switch2",  // ✅ add unique id
        name: "demoSwitch2"  // ✅ optional, for forms
    }
};



function List({ id, data }: NodeProps<TemplateData>) {

    const [hover, setHover] = React.useState(false);
    const [inputCount, setInputCount] = React.useState<number>(0);
    const [btndisble, setBtndisble] = React.useState<boolean>(false);
    const [switchbtn, setSwitchbtn] = React.useState<boolean>(false);
    const [caption, setCaption] = React.useState<string>("");

      const nodeData = data as TemplateData; // ✅ TypeScript को बताया कि ये TemplateData है
    
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            nodeData.onChange?.(id, { title: e.target.value });
        };

    React.useEffect(() => {
        if (inputCount === 3) {
            setBtndisble(true);
        } else {
            setBtndisble(false);
        }
    }, [inputCount]);


    // const onImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             data.onChange(id, { ...data, image: reader.result });
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // }, [data, id]);

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
                onMouseLeave={() => setHover(false)} style={{ display: "block" }}>



                {hover && (
                    <>
                        <div className="btnupbox">

                            <button
                                // onClick={() => data.onDelete(id)}
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
                                    if (typeof data.onCopy === "function") {
                                        data.onCopy(id);
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

                        <div
                            className=""
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



                        <div
                            className=""
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
                                            border: "none", 
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


                        {/* <p className="jss1075 text-left">Select media type</p> */}






















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
                                    // onChange={(e) => data.onChange(id, { [`title${i}`]: e.target.value })}
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
                                    {caption.length}/24
                                    
                                </FormHelperText>

                               <input
                                    type="button"
                                    name="Add_button"
                                    id="Add_button"
                                    value="+ Add Section"
                                    onClick={() => setInputCount(prev => prev + 1)}
                                    className="w-full p-2 border rounded input-this text-center text-stone-900"
                                    disabled={btndisble}
                                />
                            </div>

                        ))}





                        <input
                            type="button"
                            name="Add_button"
                            id="Add_button"
                            value="+ Add Section"
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
                                    className="w-full p-2 border rounded mb-2 input-this text-gray-600 h-20 text-left"
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


                {/* <Handle
                    type="target"
                    position={Position.Left}
                    id="target1"
                    style={{
                        top: "50%",
                        transform: "translateY(-50%)",
                        // background: "#fff",
                        // border: "2px solid green",
                        width: "10px",
                        height: "10px",
                    }}
                /> */}





            </div>


        </>
    );
}







export default List