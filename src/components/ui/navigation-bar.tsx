import { Link } from "react-router-dom";
import { Button } from "./button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { createClient } from "@supabase/supabase-js";

// Khởi tạo Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Định nghĩa kiểu cho token decoded
interface JwtPayload {
  id: string;
  role: string;
  user_metadata?: {
    full_name?: string;
  };
  iat?: number;
  exp?: number;
}

export default function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);

  const updateAuthState = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (token && role) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        setIsLoggedIn(true);
        setUserName(decoded.user_metadata?.full_name || "Người dùng");
        setUserRole(role);
      } catch (error) {
        console.error("Error decoding token:", error);
        handleLogout();
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
      setUserName("");
    }
  };

  useEffect(() => {
    // Kiểm tra trạng thái ban đầu
    updateAuthState();

    // Thêm listener cho sự kiện storage
    window.addEventListener("storage", updateAuthState);

    // Thêm listener cho các thay đổi trong cùng tab
    const handleStorageChange = () => {
      updateAuthState();
    };

    window.addEventListener("storageChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", updateAuthState);
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      setIsLoggedIn(false);
      setUserName("");
      setUserRole(null);
      // Dispatch sự kiện để thông báo thay đổi
      window.dispatchEvent(new Event("storageChange"));
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <motion.nav
      className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full top-0 left-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="flex flex-wrap justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.span
            className="self-center text-xl font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            RecruitPro
          </motion.span>
        </Link>
        <div className="flex md:order-2">
          {isLoggedIn ? (
            <>
              <span className="text-gray-800 font-medium mr-4">
                Xin chào, {userName}
              </span>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} className="mr-2">
                <Button
                  asChild
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                >
                  <Link to="/login">Đăng nhập</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300"
                >
                  <Link to="/register">Đăng ký</Link>
                </Button>
              </motion.div>
            </>
          )}
        </div>
        <div
          className="hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="block py-2 pr-4 pl-3 text-blue-600 rounded md:bg-transparent md:p-0 relative group"
                aria-current="page"
              >
                Trang chủ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/recruitment"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 relative group"
              >
                Tuyển dụng
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 relative group"
              >
                Liên hệ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.li>
            {userRole === "staff" && (
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/admin"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 relative group"
                >
                  Quản trị HR
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
            )}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}