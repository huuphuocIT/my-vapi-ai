"use server";

import ClientComponent from "./_components/ClientComponent";

export default async function Page() {
  const data: { id: number; name: string }[] = await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Thinh_1" },
        { id: 1, name: "Thinh_2" },
        { id: 1, name: "Thinh_3" },
        { id: 1, name: "Thinh_4" },
      ]);
    }, 1000);
  });

  return (
    <div>
      <h1>Hello {data.map((item) => item.name).join(", ")}</h1>

      <ClientComponent />
    </div>
  );
}
