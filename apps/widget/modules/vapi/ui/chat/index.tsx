import type { FC } from "react";

import {
  Widget,
  WidgetHeader,
  WidgetContent,
  WidgetFooter,
} from "@/modules/vapi/components";

interface ChatWidgetProps {}

export const ChatWidget: FC<ChatWidgetProps> = () => {
  return (
    <Widget>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="text-3xl">Hi there !!! 👋</p>
          <p className="text-lg">How can I help you today?</p>
        </div>
      </WidgetHeader>

      <WidgetContent>Chat Widget</WidgetContent>

      <WidgetFooter />
    </Widget>
  );
};

export default ChatWidget;
