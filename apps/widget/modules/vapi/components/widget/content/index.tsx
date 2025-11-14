import { PropsWithChildren } from "react";

import { CardContent } from "@workspace/ui/components/card";

interface WidgetContentProps extends PropsWithChildren {}

export const WidgetContent = (props: WidgetContentProps) => {
  const { children } = props;

  return <CardContent className="flex flex-1 flex-col">{children}</CardContent>;
};

export default WidgetContent;
