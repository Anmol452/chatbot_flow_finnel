import { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  ReactFlowProvider,
} from '@xyflow/react';
import type { Node, Edge, OnConnect, NodeTypes } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import './style.css'
import TextUpdaterNode from './TextUpdaterNode';
import { BaseNodeFullDemo } from "./Component-example";
import TemplateNode from "../templat/TemplateNode";
import List from "../templat/List/List";
import { Input_buttion } from "../templat/text_buttion/text_buttion";
import Midia_btn from "../templat/midia_btn/Midia_btn"
import { Flow_start } from "../templat/flow_start/Flow_start";
import Sms from "./chatpreview/Sms";
import Btn from "./chatpreview/Btn";
import type { TemplateData } from "../schema/TemplateData";
// import {TemplateNodedata} from '../schema/TemplateData'

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};
console.log(nodeDefaults);


// interface TemplateNodedata {
//   id: string;

// }



const initialNodes: Node<TemplateData>[] = [



  {
    //  id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    id: '1',
    type: "Flow_start",
    position: { x: 100, y: 100 },
    data: {
      id: '1',
      title: "",
      description: "Default description",
      label: "My Node",
      data: {},                        // ✅ required
      position: { x: 100, y: 200 },    // ✅ required
      onDelete: (id) => console.log("delete", id),  // ✅ required
      onChange: (id, newData) => console.log("change", id, newData), // optional
    },
  },


];

const initialEdges: Edge[] = [


];




const nodeTypes: NodeTypes = {
  textUpdater: TextUpdaterNode,
  baseNodeFull: BaseNodeFullDemo,
  Flow_start: Flow_start as any,
  Input_buttion: Input_buttion as any,
  Midia_btn: Midia_btn as any,
  list: List as any,
  TemplateNode: TemplateNode as any
};


const Flow = () => {
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<TemplateData>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [openChat, setOpenChat] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  // console.log("nodes =", nodes);



  //_____________________________________chat preview____________________________________________
  const openChatPreview = useCallback((node: Node) => {
    setSelectedNode(node);
    setOpenChat(true);
  }, [])

  const closeChat = () => {
    setOpenChat(false);
    setTimeout(() => setSelectedNode(null), 300); // wait for animation
  };



  //    const handleDelete = async (id: string) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/nodes/${id}`);
  //     // UI se bhi hata do
  //     setNodes((nds) => nds.filter((n) => n.id !== id));
  //     setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
  //   } catch (err) {
  //     console.error("Delete error:", err);
  //   }
  // };

  //✅ fetchNodes wrapped in useCallback
  // const fetchNodes = useCallback(async () => {

  //   const res = await axios.get("http://localhost:3000/nodes");
  //   setNodes(
  //     res.data.map((n: any) => ({
  //       id: n.id.toString(),
  //       type: n.type,
  //       data: { label: n.label, variant: n.variant },
  //       position: { x: n.pos_x, y: n.pos_y },
  //     }))
  //   );
  // }, []);




  // useEffect(() => {
  //   fetchNodes();
  // }, []);



  // useEffect(() => {


  //   const fetchFlow = async () => {
  //     const res = await axios.get("http://localhost:3000/flow/1"); // id 1 example
  //     setNodes(res.data.nodes || []);
  //     setEdges(res.data.edges || []);
  //   };
  //   fetchFlow();
  // }, []);



  // const addNode = (nodeType: string, label: string, variant: string, pos_x: number, pos_y: number) => {
  //   const newId = String(id); // id को string बनाना ज़रूरी है reactflow में
  //   setId(id + 1);

  //   const newNode: Node = {
  //     id: newId,
  //     type: nodeType, // ये आपका custom node type हो सकता है
  //     position: { x: pos_x, y: pos_y },
  //     data: { label, variant },
  //   };

  //   shownode()
  //   // setNodes((nds) => [...nds, newNode]);
  // };


  // const shownode = () =>{

  // }
  const handleDelete = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
  }, [setNodes]);


  const handleNodeChange = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  }, [setNodes]);

  // Drop handler
  const onDrop = useCallback(
    async (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = (event.target as Element).getBoundingClientRect();
      const data = event.dataTransfer.getData("application/reactflow");

      if (!data) return;

      const { nodeType, label, variant } = JSON.parse(data);

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      // Save to DB
      // const newNode = {
      //   type: nodeType,
      //   label,
      //   variant,
      //   position,
      // };

      const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`
      // const newNode = {
      const newNode: Node<TemplateData> = {
        id, // React Flow internal id
        type: nodeType,
        position, // React Flow position
        data: {
          id,                   // TemplateData.id
          title: "",
          description: "Default description",
          label,
          variant,
          onDelete: handleDelete,
          onChange: handleNodeChange,
          onPreviewClick: () =>
            openChatPreview({
              id,
              type: nodeType,
              position,
              data: {
                id,
                title: "",
                label,
                variant,
              },
            } as Node),
          data: {},              // ✅ required by TemplateData
          position,              // ✅ required by TemplateData
        },
      };




      // पुराने nodes रखते हुए नया node जोड़ना
      setNodes((nds) => [...nds, newNode]);

      // await axios.post("http://localhost:3000/nodes", newNode);
      // addNode(newNode.type, newNode.label, newNode.variant, position.x, position.y)
      // setNodes((nft) => ...nft , newNode)
      //  setNodes((nds) => [...nds, newNode]);

      // fetchNodes();
    },
    // [fetchNodes]
    [setNodes, handleDelete, handleNodeChange, openChatPreview]
  );






  // Allow drop
  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };


  const updateNodeData = useCallback(
    (id: string, newData: any) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id
            ? { ...node, data: { ...newData, onChange: updateNodeData, openChatPreview: openChatPreview } }
            : node
        )
      );
    },
    [setNodes, openChatPreview]
  );


  // const nodesWithHandler = nodes.map((n) => ({
  //   ...n,
  //   data: { ...n.data, onChange: updateNodeData },
  // }));


  // console.log(setNodes);


  const onConnect: OnConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );


  useEffect(() => {

    const newComponents: React.ReactNode[] = [];
    // const newComponents: TemplateNodedata[] = [];
    if (selectedNode) {
      console.log("selectedNode: ", selectedNode);

      const updated = nodes.find((n) => n.id === selectedNode.id) || null;
      setSelectedNode(updated);

      if (selectedNode?.data?.title) {
        const titleValue =
          typeof selectedNode.data.title === "string"
            ? selectedNode.data.title
            : JSON.stringify(selectedNode.data.title); // object हो तो stringify कर दो

        newComponents.push(<Sms textsms={titleValue} />);
      }

      if (selectedNode?.data?.btntitle0) {
        const btnText =
          typeof selectedNode.data.btntitle0 === "string"
            ? selectedNode.data.btntitle0
            : JSON.stringify(selectedNode.data.btntitle0); // object हो तो stringify कर दो

        newComponents.push(<Btn btntext={btnText} />);
      }


      if (selectedNode?.data?.btntitle1) {
        const btnText =
          typeof selectedNode.data.btntitle1 === "string"
            ? selectedNode.data.btntitle1
            : JSON.stringify(selectedNode.data.btntitle1);

        newComponents.push(<Btn btntext={btnText} />);
      }


        if (selectedNode?.data?.btntitle2) {
        const btnText =
          typeof selectedNode.data.btntitle2 === "string"
            ? selectedNode.data.btntitle2
            : JSON.stringify(selectedNode.data.btntitle2);

        newComponents.push(<Btn btntext={btnText} />);
      }

      // if (selectedNode.data.showEmail) {
      // newComponents.push(<Email subject={selectedNode.data.title} key="email" />);
      // }


      setComponents(newComponents);

      // console.log("sms :", selectedNode.btntitle0);
    }


  }, [selectedNode, nodes]);





  return (
    <>
      <ReactFlowProvider>
        <ReactFlow
          // key={JSON.stringify(nodeTypes)}
          nodes={nodes}
          // nodes={nodesWithHandler}
          //  nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={onDragOver}
          // onNodeClick={onNodeClick}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>




        {/* 🔸 Chat Preview Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-96  border-l shadow-2xl transform transition-transform duration-500 ease-in-out ${openChat ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center p-2 chattop">
            <h2 className="font-semibold text-lg">
              <h2>{(selectedNode?.data as any)?.label || "Preview"}</h2>

            </h2>
            <button
              onClick={closeChat}
              className="close_btn "
            >
              ✖
            </button>
          </div>

          <div className="p-4 overflow-y-auto h-[calc(100%-64px)] bgwts">
            {components}
            <div>


              <p></p>
            </div>
          </div>
        </div>






      </ReactFlowProvider>


      {/* <div className="d" style={{height: "30%", width: "30%", border: "solid red"}}></div> */}
    </>

  );
};

export default Flow;


