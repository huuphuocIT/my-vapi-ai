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
    <div className="px-5 space-y-2">
      <div className="space-x-2">
        {users?.map((user) => (
          <span key={user._id} className="whitespace-nowrap">
            ({user.name} / {user.email})
          </span>
        ))}
      </div>
      <Button size="sm" onClick={handleAddUser}>
        Button
      </Button>
    </div>
  );
}
