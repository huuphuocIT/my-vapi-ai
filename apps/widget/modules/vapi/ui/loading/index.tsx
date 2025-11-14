"use client";

import { useEffect } from "react";
import { LoaderIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import {
  Widget,
  WidgetContent,
  WidgetHeader,
} from "@/modules/vapi/components/widget";
import { useViewStore } from "@/modules/vapi/stores/view";

export const LoadingWidget = () => {
  const { message, setView } = useViewStore();

  const {
    error,
    isPending,
    data: success,
  } = useQuery({
    queryKey: ["check-contact-session"],
    refetchIntervalInBackground: true,
    refetchInterval: 60 * 1000,
    retry: (failureCount, error) =>
      failureCount < 3 &&
      !(error instanceof AxiosError && error.response?.status === 404),
    queryFn: async () => {
      const resp = await axios.get("/api/check-contact-session");

      return resp.data.success;
    },
  });

  useEffect(() => {
    if (isPending) {
      setView("loading", "Finding contact session...");
      return;
    }

    const screen = success ? "selection" : "auth";
    const newMessage = success
      ? "Welcome back!!!"
      : "Contact session not found!!!";

    setView(screen, newMessage);
  }, [isPending, error, success]);

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
          <LoaderIcon className="animate-spin animation-duration-[2000ms] size-10" />
          <p className="text-xl">{message}</p>
        </div>
      </WidgetContent>
    </Widget>
  );
};

export default LoadingWidget;
