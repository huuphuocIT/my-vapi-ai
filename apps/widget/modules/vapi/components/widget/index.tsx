import { PropsWithChildren } from "react";

import { Card } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";

interface WidgetProps extends PropsWithChildren {
  className?: string;
}

export const Widget = (props: WidgetProps) => {
  const { children, className } = props;

  return (
    <Card
      className={cn(
        "flex flex-col min-w-full min-h-full py-0 overflow-hidden bg-muted",
        className
      )}
    >
      {children}
    </Card>
  );
};

export * from "./header";
export * from "./content";
export * from "./footer";

export default Widget;
