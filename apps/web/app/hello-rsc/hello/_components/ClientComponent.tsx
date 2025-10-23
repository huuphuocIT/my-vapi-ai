"use client";

import { useEffect, useState } from "react";

export const ClientComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((count) => count + 1);
  }, []);

  return (
    <h1>
      Client Component {count}{" "}
      <button
        className="border-2 p-3 bg-blue-400 text-white"
        onClick={() => setCount((count) => count + 1)}
      >
        Increment
      </button>
    </h1>
  );
};

export default ClientComponent;
