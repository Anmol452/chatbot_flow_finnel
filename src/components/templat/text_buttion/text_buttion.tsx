import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import type { TemplateData } from "../../schema/TemplateData";
import './text.css'
import { FormHelperText, Switch } from "@mui/material";
import * as React from 'react';
import { Trash, Copy, CircleX, EyeIcon, Plus } from "lucide-react";



const label = {
    inputProps: {
        "aria-label": "Switch demo",
        id: "demo-switch2",  // ✅ add unique id
        name: "demoSwitch2"  // ✅ optional, for forms
    }
};



// const : React.FC<NodeProps<TemplateData>> = ({ id, data }) => {
export const Input_buttion: React.FC<NodeProps<TemplateData>> = ({ id, data }) => {
    const [hover, setHover] = React.useState(false);
    // const [ft, setFt] = React.useState<string>("block")
    // const [inputCount, setInputCount] = React.useState<number>(0);
    const [btndisble, setBtndisble] = React.useState<boolean>(false);
    const [switchbtn, setSwitchbtn] = React.useState<boolean>(false);
    //     const nodeData = data as TemplateData;

    //     // const [hup, setHup] = React.useState<string | number>("435px");
    //     // const [topstyle, setTopstyle] = React.useState<string | number>("435px");
    //     // Input node code
    //     const [inputs, setInputs] = React.useState<{ id: number; value: string }[]>([
    //         { id: Date.now(), value: "" },
    //     ]);

    //     // add input (+)
    //     const handleAdd = () => {
    //         setInputs((prev) => [...prev, { id: Date.now(), value: "" }]);
    //     };

    //     // delete input
    //     const handleDelete = (id: number) => {
    //         setInputs((prev) => prev.filter((inp) => inp.id !== id));
    //         // agar nodeData me bhi value save kar rahe ho to waha se bhi hata do:
    //         nodeData.onChange?.(id, { [`btntitle${id}`]: "" });
    //     };

    //     // change handler
    //     const handleChangeValue = (
    //   nameOrEvent: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    //   maybeValue?: string
    // ) => {
    //   if (typeof nameOrEvent === "string") {
    //     nodeData.onChange?.(id, { [nameOrEvent]: maybeValue });
    //   } else {
    //     const { name, value } = nameOrEvent.target;
    //     nodeData.onChange?.(id, { [name]: value });
    //   }
    // };

    const nodeData = data as TemplateData;

    // Count calculate karo (jitne btntitle keys hain)
    const [inputCount, setInputCount] = React.useState<number>(
        Object.keys(nodeData).filter((key) => key.startsWith("btntitle")).length || 0
    );

    // ✅ Add new button field
    const handleAdd = () => {
        const newIndex = inputCount;
        nodeData.onChange?.(id, {
            ...nodeData,
            [`btntitle${newIndex}`]: "",
        });
        setInputCount((prev) => prev + 1);
    };

    // ✅ Delete button field (value bhi clear ho)
//   const handleDelete = (index: number): void => {
//   // Copy old data
//   const newData: TemplateData = { ...nodeData };

//   // 1️⃣ Remove the key at the current index
//   delete newData[`btntitle${index}`];

//   // 2️⃣ Shift remaining keys down
//   for (let i = index + 1; i < inputCount; i++) {
//     newData[`btntitle${i - 1}`] = newData[`btntitle${i}`];
//     delete newData[`btntitle${i}`];
//   }

//   // 3️⃣ Update React Flow node data (trigger re-render)
//   nodeData.onChange?.(id, { ...newData });

//   // 4️⃣ Update input count
//   setInputCount((prev) => prev - 1);
// };


const handleDelete = (index: number): void => {
  // 1️⃣ Get all keys from nodeData
  const keys = Object.keys(nodeData).filter((key) => key.startsWith("btntitle"));

  // 2️⃣ Build new data object
  const newData: TemplateData = {
    label: nodeData.label,
    id: nodeData.id,
    data: nodeData.data,
    position: nodeData.position,
    onDelete: nodeData.onDelete,
    // Copy any other required fields from nodeData if needed
  };

  keys.forEach((key) => {
    const keyIndex = parseInt(key.replace("btntitle", ""));
    if (keyIndex < index) {
      // Copy keys before deleted index
      newData[`btntitle${keyIndex}`] = nodeData[key];
    } else if (keyIndex > index) {
      // Shift keys after deleted index
      newData[`btntitle${keyIndex - 1}`] = nodeData[key];
    }
    // skip keyIndex === index (deleted one)
  });

  // 3️⃣ Update React Flow node data immutably
  nodeData.onChange?.(id, newData);

  // 4️⃣ Update input count
  setInputCount((prev) => prev - 1);
};




    // ✅ Universal change (puri typing support)
    const handleChangenode = (index: number, value: string) => {
        const key = `btntitle${index}`;
        nodeData.onChange?.(id, {
            ...nodeData, // old data rakho
            [key]: value,
        });
    };


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
                                        data.onCopy("Input_buttion");
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
                    <div className="text-hender">
                        <Handle
                            type="target"
                            position={Position.Left}
                            id="flow_start"
                            style={{
                                display: "inline-block",
                                right: "45px",
                                top: "149px",
                                width: "18px",
                                height: "435px",
                                background: "transparent",
                                border: "transparent"
                            }}
                        />
                    </div>
                    {/* <p className="jss1075 text-left">Type, press enter to add keyword</p> */}
                    <form action="" id="form_id">

                        <input
                            name="title"
                            id="title2"
                            value={String(nodeData.title || "")}
                            onChange={handleChange}
                            placeholder="Enter You Text"
                            className="w-full p-2 border rounded mb-2 input-this text-gray-600 h-20 text-left"
                        />



                        {Array.from({ length: inputCount }, (_, i) => (
                            <div key={i}>
                                <div className="relative">
                                    <CircleX
                                        className="size-3 absolute"
                                        onClick={() => handleDelete(i)}
                                    />
                                </div>

                                <input
                                    name={`btntitle${i}`}
                                    value={String(nodeData[`btntitle${i}`] || "")}
                                    id={`btntitleid${i}`}
                                    // value={String(nodeData[`btntitle${i}`] || "")}
                                    onChange={(e) => handleChangenode(i, e.target.value)}
                                    placeholder={`Enter text ${i + 1}`}
                                     className="w-full p-2 border outline-2 outline-red-500/100 rounded  input-this it text-gray-600 h-20 text-center"
                                />

                                <div className="box-source-input">
                                    <Handle
                                        type="source"
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
                                     {(nodeData[`btntitle${i}`]?.length || 0)}/20
                                </FormHelperText>
                            </div>
                        ))}

                        <input
                            type="button"
                            value="+ Add button"
                            onClick={handleAdd}
                            className="w-full p-2 border rounded mb-2 input-this text-center text-stone-900 outline-red-500/100"
                            disabled={btndisble}
                        />


                        <p className="jss1075 text-left">Set Delay</p>







                        <input
                            name="Type_delay"
                            id="Type_delay"
                            value={String(nodeData.Regex || "")}
                            onChange={handleChange}
                            placeholder="Type delay in seconds..."
                            className="w-full p-2 border rounded mb-2 input-this "
                        />
                        <p className="jss1075 jss2">Set Timeout</p><span className="span_btn2"><Switch name="notifications"  {...label} onClick={funSwitchbtn} /></span>

                        `
                        {switchbtn ? (
                            <div>

                                <input
                                    name="time"
                                    id="time"
                                    value={String(nodeData["time"] || "")}
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
                        `


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



                </div>

            </div>


        </>
    );
}




// export default Input_buttion