import { AuthGuard } from "@/modules/auth/components";

export default function NotFound() {
  return (
    <>
      <div>Page not found 404</div>
      <AuthGuard>Protected</AuthGuard>
    </>
  );
}
