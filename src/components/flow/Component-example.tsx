import { cn } from "../../lib/utils";
import { BaseNode } from "../base-node";


const BaseNodeFullDemo = () => {
  // Example data object; replace with actual data source or prop as needed
  const data = { status: 'loading' };

  return (
   <BaseNode
      className={cn('w-[350px] p-0 hover:ring-green-500', {
        'border-green-500': data.status === 'loading',
        'border-red-500': data.status === 'error',
      })}
    >
        

    

        
      {/* Your custom node definiton goes here */}
    </BaseNode>
  );
};

export { BaseNodeFullDemo };