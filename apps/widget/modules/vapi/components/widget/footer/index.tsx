import { FC } from "react";
import { HomeIcon, InboxIcon } from "lucide-react";

import { CardFooter } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

interface WidgetFooterProps {}

export const WidgetFooter: FC<WidgetFooterProps> = () => {
  return (
    <CardFooter className="flex items-center justify-between bg-background px-0 border-t-1">
      <Button
        variant="ghost"
        className="h-14 flex-1 rounded-none cursor-pointer hover:bg-primary-foreground group"
      >
        <HomeIcon className={cn("size-5", "text-primary")} />
      </Button>
      <Button
        variant="ghost"
        className="h-14 flex-1 rounded-none cursor-pointer hover:bg-primary-foreground group"
      >
        <InboxIcon
          className={cn("size-5", "text-base", "group-hover:text-primary")}
        />
      </Button>
    </CardFooter>
  );
};

export default WidgetFooter;
