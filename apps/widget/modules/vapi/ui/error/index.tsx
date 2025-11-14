import {
  Widget,
  WidgetContent,
  WidgetHeader,
} from "@/modules/vapi/components/widget";

import { useViewStore } from "@/modules/vapi/stores/view";
import { AlertTriangleIcon } from "lucide-react";

export const ErrorWidget = () => {
  const errorMessage = useViewStore((state) => state.message);

  return (
    <Widget>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="text-3xl">Hi there !!! 👋</p>
          <p className="text-lg">How can I help you today?</p>
        </div>
      </WidgetHeader>

      <WidgetContent>
        <div className="flex flex-col flex-1 h-full items-center justify-center gap-y-4 py-4 text-muted-foreground">
          <AlertTriangleIcon className="size-10 text-orange-200" />
          <p className="text-2xl">
            {errorMessage || "Something went wrong!!!"}
          </p>
        </div>
      </WidgetContent>
    </Widget>
  );
};

export default ErrorWidget;
