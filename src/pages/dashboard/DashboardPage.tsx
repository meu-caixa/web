import { Button } from "antd";
import { useAuth } from "@/hooks/AuthProvider";

export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard Page</h1>
      <p>Welcome to the protected area.</p>
      <Button onClick={logout} className="mt-4" type="primary">
        Logout
      </Button>
    </div>
  );
}
