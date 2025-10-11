type EdgePathParams = {
  sourceX: number;
  sourceY: number;
  sourcePosition: any;
  targetX: number;
  targetY: number;
  targetPosition: any;
};

export function getSpecialPath(
  params: EdgePathParams,
  offset: number
): string {
  // Example implementation: create a cubic bezier with offset
  const { sourceX, sourceY, targetX, targetY } = params;
  const controlX1 = sourceX + offset;
  const controlY1 = sourceY;
  const controlX2 = targetX - offset;
  const controlY2 = targetY;
  return `M${sourceX},${sourceY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${targetX},${targetY}`;
}