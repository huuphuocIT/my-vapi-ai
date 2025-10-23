"use server";

import Link from "next/link";
import { PropsWithChildren, Suspense } from "react";

export default async function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <p>
        <Link
          href="/hello-rsc/hello"
          className="text-blue-400"
          prefetch={false}
        >
          Hello, Hello here
        </Link>
      </p>
      <p>
        <Link href="/hello-rsc" className="text-blue-400" prefetch={false}>
          Hello RSC
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </>
  );
}
