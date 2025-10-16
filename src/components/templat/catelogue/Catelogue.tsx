import { Handle, Position } from "@xyflow/react";
// import { useCallback } from "react";
import type { NodeProps } from "@xyflow/react";
import type { TemplateData } from "../../schema/TemplateData";
import './Liststyle.css'
import { FormHelperText, TextField } from "@mui/material";
import * as React from 'react';
import { Trash, Copy, EyeIcon, Plus } from "lucide-react";





function Catelogue({ id, data }: NodeProps<TemplateData>) {

    const [hover, setHover] = React.useState(false);
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
                <div className="head-text"><img className="img" src="/messiage.png" alt="" /> <h4 className="h4">Catalogue</h4> </div>


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






















                       




                    




                        {typeof data.image === "string" && data.image && (
                            <img src={data.image} alt="uploaded" className="w-full h-24 object-cover rounded" />
                        )}


                    </form>

                </div>
                
                <div className="last-btn mt-4">
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







export default Catelogue