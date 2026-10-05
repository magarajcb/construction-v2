import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import AdminPanel from "./AdminPanel";

export default async function AdminPage() {
  const authenticated = await verifyAdmin();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return <AdminPanel />;
}