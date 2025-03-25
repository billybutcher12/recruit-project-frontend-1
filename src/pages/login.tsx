import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { User, Lock, UserCheck, KeyRound } from "lucide-react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Khởi tạo Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Định nghĩa kiểu cho token decoded
interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export default function LoginPage() {
  const [candidateData, setCandidateData] = useState({ email: "", password: "" });
  const [hrData, setHrData] = useState({ staffCode: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const handleCandidateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: candidateData.email,
        password: candidateData.password,
      });
      if (error) throw error;
      const token = data.session.access_token;
      localStorage.setItem("token", token);
      const decoded: any = jwtDecode(token);
      const userRole = decoded.app_metadata?.role || "candidate";
      localStorage.setItem("userRole", userRole);
      window.dispatchEvent(new Event("storageChange"));
      navigate("/");
    } catch (err) {
      setError((err as Error).message || "Đăng nhập thất bại");
    }
  };
  
  const handleHrLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: hrData.email,
        password: hrData.password,
      });
      if (error) throw error;
      const token = data.session.access_token;
      localStorage.setItem("token", token);
      const decoded: any = jwtDecode(token);
      const userRole = decoded.app_metadata?.role || "staff";
      localStorage.setItem("userRole", userRole);
      window.dispatchEvent(new Event("storageChange"));
      if (userRole === "staff") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError((err as Error).message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-3xl font-semibold tracking-tight text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
            variants={itemVariants}
          >
            Đăng nhập
          </motion.h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <Tabs defaultValue="candidate" className="w-full">
            <motion.div variants={itemVariants}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger
                  value="candidate"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
                >
                  <User className="mr-2 h-4 w-4" /> Ứng viên
                </TabsTrigger>
                <TabsTrigger
                  value="hr"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
                >
                  <UserCheck className="mr-2 h-4 w-4" /> Nhân sự (HR)
                </TabsTrigger>
              </TabsList>
            </motion.div>

            {/* Tab Ứng viên */}
            <TabsContent value="candidate" className="p-8 border border-blue-100 rounded-lg shadow-lg bg-white">
              <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                <motion.h2 className="text-2xl font-semibold mb-6 text-blue-700" variants={itemVariants}>
                  Đăng nhập ứng viên
                </motion.h2>
                <form className="space-y-6" onSubmit={handleCandidateLogin}>
                  <motion.div className="grid gap-3" variants={itemVariants}>
                    <Label htmlFor="candidate-email" className="text-blue-800">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="candidate-email"
                        placeholder="Nhập email"
                        type="email"
                        className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                        value={candidateData.email}
                        onChange={(e) => setCandidateData({ ...candidateData, email: e.target.value })}
                      />
                    </div>
                  </motion.div>
                  <motion.div className="grid gap-3" variants={itemVariants}>
                    <Label htmlFor="candidate-password" className="text-blue-800">Mật khẩu</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="candidate-password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                        value={candidateData.password}
                        onChange={(e) => setCandidateData({ ...candidateData, password: e.target.value })}
                      />
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px]"
                    >
                      Đăng nhập
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </TabsContent>

            {/* Tab Nhân sự (HR) */}
            <TabsContent value="hr" className="p-8 border border-blue-100 rounded-lg shadow-lg bg-white">
              <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                <motion.h2 className="text-2xl font-semibold mb-6 text-blue-700" variants={itemVariants}>
                  Đăng nhập nhân sự
                </motion.h2>
                <form className="space-y-6" onSubmit={handleHrLogin}>
                  <motion.div className="grid gap-3" variants={itemVariants}>
                    <Label htmlFor="hr-code" className="text-blue-800">Mã nhân sự</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <KeyRound className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="hr-code"
                        placeholder="Nhập mã nhân sự"
                        className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                        value={hrData.staffCode}
                        onChange={(e) => setHrData({ ...hrData, staffCode: e.target.value })}
                      />
                    </div>
                  </motion.div>
                  <motion.div className="grid gap-3" variants={itemVariants}>
                    <Label htmlFor="hr-email" className="text-blue-800">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="hr-email"
                        placeholder="Nhập email"
                        type="email"
                        className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                        value={hrData.email}
                        onChange={(e) => setHrData({ ...hrData, email: e.target.value })}
                      />
                    </div>
                  </motion.div>
                  <motion.div className="grid gap-3" variants={itemVariants}>
                    <Label htmlFor="hr-password" className="text-blue-800">Mật khẩu</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="hr-password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                        value={hrData.password}
                        onChange={(e) => setHrData({ ...hrData, password: e.target.value })}
                      />
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px]"
                    >
                      Đăng nhập
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}