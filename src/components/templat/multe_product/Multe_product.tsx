import { Handle, Position } from "@xyflow/react";
// import { useCallback } from "react";
import type { NodeProps } from "@xyflow/react";
import type { TemplateData } from "../../schema/TemplateData";
import './Liststyle.css'
import { FormHelperText, TextField } from "@mui/material";
import * as React from 'react';
import { Trash, Copy, CircleX, EyeIcon, Plus } from "lucide-react";





function Multe_product({ id, data }: NodeProps<TemplateData>) {

    const [hover, setHover] = React.useState(false);
    const [inputCount, setInputCount] = React.useState<number>(0);
    const [btndisble, setBtndisble] = React.useState<boolean>(false);
    const [caption, setCaption] = React.useState<string>("");

    console.log(setCaption);

    const nodeData = data as TemplateData; // ✅ TypeScript को बताया कि ये TemplateData है



    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        nodeData.onChange?.(id, {
            ...nodeData,
            [name]: value
        });
    };

    React.useEffect(() => {
        if (inputCount === 3) {
            setBtndisble(true);
        } else {
            setBtndisble(false);
        }
    }, [inputCount]);





    return (
        <>

            <div className="text-hender">
                <Handle
                    type="target"
                    position={Position.Left}
                    id="flow_start"
                    style={{
                        display: "inline-block",
                        right: "262px",
                        top: "300px",
                        width: "7px",
                        height: "577px",
                        background: "transparent",
                        borderRadius: "0",
                        left: "-6px"
                    }}
                />
            </div>


            <div className="p-3 rounded-xl shadow bg-white border w-[220px] hover:border hover:border-green-600" onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)} style={{ display: "block" }}>





                {hover && (
                    <>
                        <div className="btnupbox sp">

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
                                        data.onCopy("List");
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
                                onClick={() => {
                                    if (typeof data.onPreviewClick === "function") {
                                        data.onPreviewClick(id);
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
                                placeholder="Header"
                                name="Listheader"
                                value={String(nodeData.Listheader || "")}
                                onChange={handleChange}
                                inputProps={{ maxLength: 20, style: { textAlign: "left" } }}
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
                                {caption.length}/20
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
                                placeholder="body"
                                name="Listbody"
                                value={String(nodeData.Listbody || "")}
                                onChange={handleChange}
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
                                placeholder="footer"
                                name="Listfooter"
                                value={String(nodeData.Listfooter || "")}
                                onChange={handleChange}
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
                                {caption.length}/60
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



                                <div className="box-source-input">
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


                        <input
                            type="button"
                            name="viewitem"
                            id="viewitem"
                            value="View items"
                            onClick={() => setInputCount(prev => prev + 1)}
                            className="w-full p-2 border rounded input-this text-center text-blue-400"
                            disabled={btndisble}

                        />




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


                    <div className="daymic">
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







export default Multe_product