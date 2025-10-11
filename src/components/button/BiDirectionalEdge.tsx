
import {
  getBezierPath,
  useStore,
  BaseEdge,
  type EdgeProps,
  type ReactFlowState,
} from '@xyflow/react';
import { getSpecialPath } from './GetSpecialPath';
 
// Removed getSpecialPath and its type; now imported from getSpecialPath.ts
 
export default function CustomEdge({
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) {
  const isBiDirectionEdge = useStore((s: ReactFlowState) => {
    const edgeExists = s.edges.some(
      (e) =>
        (e.source === target && e.target === source) ||
        (e.target === source && e.source === target),
    );
 
    return edgeExists;
  });
 
  const edgePathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  };
 
  let path = '';
 
  if (isBiDirectionEdge) {
    path = getSpecialPath(edgePathParams, sourceX < targetX ? 25 : -25);
  } else {
    [path] = getBezierPath(edgePathParams);
  }
 
  return <BaseEdge path={path} markerEnd={markerEnd} />;
}