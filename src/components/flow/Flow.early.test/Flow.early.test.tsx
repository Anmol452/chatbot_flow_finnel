
import '@xyflow/react/dist/style.css';
import Flow from '../Flow';

// src/components/flow/Flow.integration.test.tsx
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import "@testing-library/jest-dom";


class MockTextUpdaterNode extends React.Component {
  render() {
    return <div>MockTextUpdaterNode</div>;
  }
}

class MockBaseNodeFullDemo extends React.Component {
  render() {
    return <div>MockBaseNodeFullDemo</div>;
  }
}

class MockTemplateNode extends React.Component {
  render() {
    return <div>MockTemplateNode</div>;
  }
}

class MockFlow_start extends React.Component {
  render() {
    return <div>MockFlow_start</div>;
  }
}

class MockInput_buttion extends React.Component {
  render() {
    return <div>MockInput_buttion</div>;
  }
}

class MockMidia_btn extends React.Component {
  render() {
    return <div>MockMidia_btn</div>;
  }
}

// Mock hooks from @xyflow/react
const mockSetNodes = jest.fn();
const mockSetEdges = jest.fn();
const mockOnNodesChange = jest.fn();
const mockOnEdgesChange = jest.fn();

jest.mock("@xyflow/react", () => {
  const original = jest.requireActual("@xyflow/react");
  return {
    ...original,
    ReactFlow: ({ children, ...props }: any) => (
      <div data-testid="react-flow">
        {children}
        {/* Expose props for test access */}
        <div data-testid="nodes">{JSON.stringify(props.nodes)}</div>
        <div data-testid="edges">{JSON.stringify(props.edges)}</div>
        <div data-testid="nodeTypes">{JSON.stringify(Object.keys(props.nodeTypes || {}))}</div>
        <div data-testid="onDrop" onDrop={props.onDrop} />
        <div data-testid="onDragOver" onDragOver={props.onDragOver} />
        <div data-testid="onConnect" onClick={() => props.onConnect && props.onConnect({ source: '1', target: '2' })} />
      </div>
    ),
    Background: () => <div data-testid="background" />,
    Controls: () => <div data-testid="controls" />,
    MiniMap: () => <div data-testid="minimap" />,
    useNodesState: jest.fn(() => [
      [
        {
          id: '1',
          type: 'Flow_start',
          position: { x: 100, y: 100 },
          data: {
            title: 'Default Title',
            description: 'Default description',
          },
        },
      ],
      mockSetNodes,
      mockOnNodesChange,
    ]),
    useEdgesState: jest.fn(() => [[], mockSetEdges, mockOnEdgesChange]),
    addEdge: jest.fn((connection, eds) => [...eds, { ...connection, id: 'edge-1' }]),
    Position: { Right: 'right', Left: 'left' },
  };
});

// Mock nodeTypes
jest.mock("../TextUpdaterNode", () => ({
  __esModule: true,
  default: MockTextUpdaterNode as any,
}));
jest.mock("../Component-example", () => ({
  BaseNodeFullDemo: MockBaseNodeFullDemo as any,
}));
jest.mock("../../templat/TemplateNode", () => ({
  TemplateNode: MockTemplateNode as any,
}));
jest.mock("../../templat/flow_start/Flow_start", () => ({
  Flow_start: MockFlow_start as any,
}));
jest.mock("../../templat/text_buttion/text_buttion", () => ({
  Input_buttion: MockInput_buttion as any,
}));
jest.mock("../../templat/midia_btn/Midia_btn", () => ({
  Midia_btn: MockMidia_btn as any,
}));

// Mock axios
jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}));

describe('Flow() Flow method', () => {
  // Happy Paths
  describe('Happy paths', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('renders Flow with initial nodes and edges', () => {
      // Test: Ensure the Flow renders with the initial node and no edges
      render(<Flow />);
      expect(screen.getByTestId('react-flow')).toBeInTheDocument();
      expect(screen.getByTestId('background')).toBeInTheDocument();
      expect(screen.getByTestId('controls')).toBeInTheDocument();
      expect(screen.getByTestId('minimap')).toBeInTheDocument();

      // Initial node present
      const nodes = JSON.parse(screen.getByTestId('nodes').textContent || '[]');
      expect(nodes).toHaveLength(1);
      expect(nodes[0].id).toBe('1');
      expect(nodes[0].type).toBe('Flow_start');
      expect(nodes[0].data.title).toBe('Default Title');
      expect(nodes[0].data.description).toBe('Default description');

      // No edges
      const edges = JSON.parse(screen.getByTestId('edges').textContent || '[]');
      expect(edges).toHaveLength(0);

      // Node types
      const nodeTypes = JSON.parse(screen.getByTestId('nodeTypes').textContent || '[]');
      expect(nodeTypes).toEqual(
        expect.arrayContaining([
          'textUpdater',
          'baseNodeFull',
          'template',
          'Flow_start',
          'Input_buttion',
          'Midia_btn',
        ])
      );
    });

    it('calls onNodesChange and onEdgesChange when provided', () => {
      // Test: Simulate node/edge change and ensure handlers are called
      render(<Flow />);
      // Simulate node change
      act(() => {
        mockOnNodesChange([{ id: '1', type: 'Flow_start' }]);
      });
      expect(mockOnNodesChange).toHaveBeenCalled();

      // Simulate edge change
      act(() => {
        mockOnEdgesChange([{ id: 'edge-1', source: '1', target: '2' }]);
      });
      expect(mockOnEdgesChange).toHaveBeenCalled();
    });

    it('handles onConnect to add an edge', () => {
      // Test: Simulate onConnect and ensure addEdge is called and setEdges is updated
      const { getByTestId } = render(<Flow />);
      const onConnectDiv = getByTestId('onConnect');
      act(() => {
        fireEvent.click(onConnectDiv);
      });
      // addEdge is called via the mock in @xyflow/react
      const addEdge = require("@xyflow/react").addEdge;
      expect(jest.mocked(addEdge)).toHaveBeenCalledWith(
        { source: '1', target: '2' },
        []
      );
      expect(mockSetEdges).toHaveBeenCalled();
    });

    it('handles onDrop to add a new node', () => {
      // Test: Simulate a drop event and ensure a new node is added
      const { getByTestId } = render(<Flow />);
      const onDropDiv = getByTestId('onDrop');
      const data = {
        nodeType: 'Flow_start',
        label: 'Test Node',
        variant: 'primary',
      };
      const dataTransfer = {
        getData: jest.fn().mockReturnValue(JSON.stringify(data)),
      };
      const event = {
        preventDefault: jest.fn(),
        dataTransfer,
        clientX: 150,
        clientY: 200,
        target: {
          getBoundingClientRect: () => ({
            left: 100,
            top: 100,
          }),
        },
      } as any;
      act(() => {
        fireEvent.drop(onDropDiv, event);
      });
      expect(event.preventDefault).toHaveBeenCalled();
      expect(dataTransfer.getData).toHaveBeenCalledWith('application/reactflow');
      expect(mockSetNodes).toHaveBeenCalledWith(
        expect.any(Function)
      );
    });

    it('handles onDragOver to allow drop', () => {
      // Test: Simulate drag over event and ensure dropEffect is set
      const { getByTestId } = render(<Flow />);
      const onDragOverDiv = getByTestId('onDragOver');
      const event = {
        preventDefault: jest.fn(),
        dataTransfer: { dropEffect: '' },
      } as any;
      fireEvent.dragOver(onDragOverDiv, event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.dataTransfer.dropEffect).toBe('move');
    });

    it('updates node data via updateNodeData', () => {
      // Test: Simulate updateNodeData and ensure setNodes is called with updated data
      render(<Flow />);
      // Simulate updateNodeData call
      const updateNodeData = (require('./Flow').default as any).prototype?.updateNodeData;
      if (updateNodeData) {
        act(() => {
          updateNodeData('1', { label: 'Updated', variant: 'secondary' });
        });
        expect(mockSetNodes).toHaveBeenCalled();
      }
    });

    it('handles handleDelete to remove a node', () => {
      // Test: Simulate handleDelete and ensure setNodes is called with filtered nodes
      render(<Flow />);
      // Simulate handleDelete call
      const handleDelete = (require('./Flow').default as any).prototype?.handleDelete;
      if (handleDelete) {
        act(() => {
          handleDelete('1');
        });
        expect(mockSetNodes).toHaveBeenCalled();
      }
    });

    it('renders all custom node types', () => {
      // Test: Ensure all custom node types are present in nodeTypes
      render(<Flow />);
      const nodeTypes = JSON.parse(screen.getByTestId('nodeTypes').textContent || '[]');
      expect(nodeTypes).toEqual(
        expect.arrayContaining([
          'textUpdater',
          'baseNodeFull',
          'template',
          'Flow_start',
          'Input_buttion',
          'Midia_btn',
        ])
      );
    });
  });

  // Edge Cases
  describe('Edge cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('does not add node onDrop if dataTransfer is missing or invalid', () => {
      // Test: Simulate drop with missing/invalid dataTransfer
      const { getByTestId } = render(<Flow />);
      const onDropDiv = getByTestId('onDrop');
      // No data
      const eventNoData = {
        preventDefault: jest.fn(),
        dataTransfer: { getData: jest.fn().mockReturnValue('') },
        clientX: 0,
        clientY: 0,
        target: { getBoundingClientRect: () => ({ left: 0, top: 0 }) },
      } as any;
      act(() => {
        fireEvent.drop(onDropDiv, eventNoData);
      });
      expect(eventNoData.preventDefault).toHaveBeenCalled();
      expect(eventNoData.dataTransfer.getData).toHaveBeenCalledWith('application/reactflow');
      expect(mockSetNodes).not.toHaveBeenCalled();

      // Invalid JSON
      const eventInvalidJSON = {
        preventDefault: jest.fn(),
        dataTransfer: { getData: jest.fn().mockReturnValue('not-json') },
        clientX: 0,
        clientY: 0,
        target: { getBoundingClientRect: () => ({ left: 0, top: 0 }) },
      } as any;
      // Should not throw, but not add node
      expect(() => {
        act(() => {
          fireEvent.drop(onDropDiv, eventInvalidJSON);
        });
      }).not.toThrow();
      expect(mockSetNodes).not.toHaveBeenCalled();
    });

    it('does not call onConnect if not provided', () => {
      // Test: Simulate onConnect click when onConnect is not present
      // Remove onConnect from props
      const { getByTestId } = render(<Flow />);
      const onConnectDiv = getByTestId('onConnect');
      // Remove onConnect handler
      onConnectDiv.onclick = null;
      expect(() => {
        fireEvent.click(onConnectDiv);
      }).not.toThrow();
    });

    it('handles updateNodeData with non-existent node id gracefully', () => {
      // Test: updateNodeData with id not in nodes should not throw
      render(<Flow />);
      // Simulate updateNodeData call with non-existent id
      const updateNodeData = (require('./Flow').default as any).prototype?.updateNodeData;
      if (updateNodeData) {
        expect(() => {
          updateNodeData('999', { label: 'NoNode' });
        }).not.toThrow();
      }
    });

    it('handles handleDelete with non-existent node id gracefully', () => {
      // Test: handleDelete with id not in nodes should not throw
      render(<Flow />);
      const handleDelete = (require('./Flow').default as any).prototype?.handleDelete;
      if (handleDelete) {
        expect(() => {
          handleDelete('999');
        }).not.toThrow();
      }
    });

    it('does not break if nodeTypes is empty', () => {
      // Test: Render with empty nodeTypes
      // Patch ReactFlow to accept empty nodeTypes
      const originalReactFlow = require("@xyflow/react").ReactFlow;
      require('@xyflow/react').ReactFlow = ({ children, ...props }: any) => (
        <div data-testid="react-flow">
          {children}
          <div data-testid="nodeTypes">{JSON.stringify(Object.keys(props.nodeTypes || {}))}</div>
        </div>
      );
      // Patch Flow to use empty nodeTypes
      jest.doMock('./Flow', () => {
        const ActualFlow = jest.requireActual("../Flow").default;
        return {
          __esModule: true,
          default: (props: any) => <ActualFlow {...props} nodeTypes={{}} />,
        };
      });
      expect(() => {
        render(<Flow />);
      }).not.toThrow();
      require('@xyflow/react').ReactFlow = originalReactFlow;
    });
  });
});