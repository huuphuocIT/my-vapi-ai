import { VapiWidget } from "@/modules/vapi/components";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World (Widget)</h1>

        <VapiWidget
          apiKey={process.env.NEXT_PUBLIC_VAPI_API_KEY!}
          assistantId={process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!}
        />
      </div>
    </div>
  );
}
