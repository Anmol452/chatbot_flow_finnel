// src/types/NodePropsWithTemplateData.ts
import type { NodeProps } from '@xyflow/react';
import type { TemplateData } from './TemplateData';

export interface NodePropsWithTemplateData extends NodeProps<TemplateData> {
  // Include any additional properties if needed
  ides?: "String";
}
