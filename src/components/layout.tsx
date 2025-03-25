import { Outlet } from "react-router-dom";
import NavigationBar from "./ui/navigation-bar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
