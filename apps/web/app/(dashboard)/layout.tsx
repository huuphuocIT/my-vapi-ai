import { PropsWithChildren } from "react";

import { AuthGuard } from "@/modules/auth/components";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <AuthGuard>{children}</AuthGuard>;
}
