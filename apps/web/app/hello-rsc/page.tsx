"use server";

import ServerComponent from "./_components/ServerComponent";

export default async function Page() {
  const data: { id: number; name: string }[] = await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "PhuocTH1" },
        { id: 1, name: "PhuocTH2" },
        { id: 1, name: "PhuocTH3" },
        { id: 1, name: "PhuocTH4" },
      ]);
    }, 1000);
  });

  return (
    <div>
      <ServerComponent />

      <h1>Hello, RSC {data.map((item) => item.name)}</h1>
    </div>
  );
}
