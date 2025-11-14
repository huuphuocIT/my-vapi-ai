"use client";

import { FC, ReactNode } from "react";

import { WidgetScreen } from "@/modules/vapi/configs/type";
import { useViewStore } from "@/modules/vapi/stores/view";

import { ChatWidget } from "../chat";
import { AuthWidget } from "../auth";
import { ErrorWidget } from "../error";
import { LoadingWidget } from "../loading";

interface MainWidgetProps {}

export const MainWidget: FC<MainWidgetProps> = () => {
  const view = useViewStore((state) => state.view);

  const screen: Record<WidgetScreen, ReactNode> = {
    auth: <AuthWidget />,
    inbox: <>TODO: Inbox</>,
    voice: <>TODO: Voice</>,
    chat: <ChatWidget />,
    contact: <>TODO: Contact</>,
    selection: <>TODO: Selection</>,
    loading: <LoadingWidget />,
    error: <ErrorWidget />,
  };

  return <main className="h-screen w-screen">{screen[view]}</main>;
};

export default MainWidget;
