import { PropsWithChildren } from "react";

import { CardHeader } from "@workspace/ui/components/card";

interface WidgetHeaderProps extends PropsWithChildren {}

export const WidgetHeader = (props: WidgetHeaderProps) => {
  const { children } = props;

  return (
    <CardHeader className="bg-gradient-to-b from-primary to-purple-400 to-80% p-4 text-primary-foreground">
      {children}
    </CardHeader>
  );
};

export default WidgetHeader;
