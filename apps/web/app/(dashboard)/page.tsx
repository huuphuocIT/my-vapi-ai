"use client";
import { UserButton } from "@clerk/nextjs";
import { useCallback } from "react";
import { useMutation, useQuery } from "convex/react";

import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const users = useQuery(api.users.getAll);
  const addUser = useMutation(api.users.add);

  const handleAddUser = useCallback(async () => {
    await addUser({ name: "PhuocTH1", email: "phuocth1@gmail.com" });
  }, [addUser]);

  return (
    <main className="flex flex-col items-center gap-2 mt-5">
      <UserButton showName />
      <p className="mx-auto text-center">{JSON.stringify(users)}</p>
      <Button size="sm" onClick={handleAddUser}>
        Button
      </Button>
    </main>
  );
}
