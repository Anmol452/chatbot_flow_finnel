import { ScrollArea } from "../ui/scroll-area";

const components = [
    {
        id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        name: "Text Buttions",
        type: "Input_buttion",
        // icon: <MessageSquare className="h-5 w-5" />,
        img: '/text_btn.png',
        description: "Send a text message, with optional buttons.",
    },
    {
        id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        name: "Image",
        type: "Midia_btn",
        // icon: <Image className="h-5 w-5" />,
        img: '/media.png',
        description: "Send an image.",
    },
    {
        id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        name: "List",
        type: "List",
        img: '/List.png',
        description: "Send an image or video.",
    },
    {
        id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        name: "Form",
        type: "form",
        // icon: <FileText className="h-5 w-5" />,
        description: "Collect user information.",
    },
    {
       id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        name: "List",
        type: "list",
        // icon: <List className="h-5 w-5" />,
        description: "Display a list of items.",
    },
    {
       id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        name: "k",
        type: "catalogue",
        // icon: <BookMarked className="h-5 w-5" />,
        description: "Show a product catalogue.",
    },
    {
       id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        name: "Product",
        type: "product",
        // icon: <Package className="h-5 w-5" />,
        description: "Feature a single product.",
    },
    {
       id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        name: "Template",
        type: "template",
        // icon: <LayoutTemplate className="h-5 w-5" />,
        description: "Use a pre-defined template.",
    },
];

export default function Menu() {





    const onDragStart = (event: React.DragEvent, nodeType: string, label: string, variant: string) => {
        event.dataTransfer.setData("application/reactflow", JSON.stringify({ nodeType, label, variant }));
        event.dataTransfer.effectAllowed = "move";

    };

     const onDragStarttap = (nodeType: string, label: string, variant: string) => {
          const nodeData = { nodeType, label, variant };
          localStorage.setItem("reactflow-new-node", JSON.stringify(nodeData))

    };

    return (
        <>

            {/* <div
               
            >
                {node.label}
            </div> */}

            <aside className="w-65 h-55 border-r bg-card p-4 flex flex-col gap-4">
                <h2 className="text-lg font-semibold font-headline">Components</h2>
                <ScrollArea className="flex-1 -mr-4">
                    <div className="grid grid-cols-2 gap-3 pr-4">
                        {components.map((component) => (
                            <div
                                key={`${Date.now()}-${Math.floor(Math.random() * 10000)}`}
                                className="flex flex-col items-center justify-center text-center gap-2 p-4 rounded-lg border bg-background hover:bg-muted cursor-grab active:cursor-grabbing transition-colors shadow-sm hover:shadow-md aspect-square"
                                onDragStart={(e) => onDragStart(e, component.type, component.name, "defult")}
                                onClick={() => onDragStarttap(component.type, component.name, "defult")}
                                draggable
                            >
                                <div className="text-primary"><img className="w-7 h-7" src={component.img} alt="" /></div>
                                {/* <div className="text-primary">{component.icon}</div> */}

                                <p className="font-semibold text-sm">{component.name}</p>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </aside>
        </>

    );






    // const handleDragStart = (e: React.DragEvent, componentType: string) => {
    //     e.dataTransfer.setData("application/reactflow", componentType);
    //     e.dataTransfer.effectAllowed = "move";
    // };




    // return (

    //     <Box sx={{ flexGrow: 1 }}>
    //         <Grid container spacing={2}>
    //             <Grid size={12}>
    //                 <Item>Message types</Item>
    //             </Grid>
    //             <Grid size={6}>
    //                 <Item>
    //                     <div
    //                         key={component.name}
    //                         className="box justify-items-center shadow-2xs"
    //                         draggable="true"
    //                         onDragStart={(e) => handleDragStart(e, component.type)}>
    //                         <img src="/text_btn.png" className='w-8 h-8 p-1' alt="Text button" />
    //                         <h2>Text <br /> buttons</h2>
    //                     </div>
    //                 </Item>
    //             </Grid>
    //             <Grid size={6}>
    //                 <Item>
    //                     <div className="box justify-items-center shadow-2xs">
    //                         <img src="/media.png" className='w-8 h-8 p-1' alt="Text button" />
    //                         <h2>Media <br /> buttons</h2>
    //                     </div>
    //                 </Item>
    //             </Grid>
    //             <Grid size={6}>
    //                 <Item>size=4</Item>
    //             </Grid>
    //             <Grid size={6}>
    //                 <Item>size=8</Item>
    //             </Grid>
    //         </Grid>
    //     </Box>

    // )
}
