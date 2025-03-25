
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Pencil, ArrowUp, Users, Gift, Briefcase } from "lucide-react"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { createClient } from "@supabase/supabase-js"
import NavigationBar from "@/components/ui/navigation-bar"

// Khởi tạo Supabase client
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

// Định nghĩa kiểu cho token decoded
interface JwtPayload {
  id: string
  role: string
  user_metadata?: {
    full_name?: string
    role?: string
  }
  iat?: number
  exp?: number
}

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("userRole")
    if (token && role) {
      try {
        const decoded: JwtPayload = jwtDecode(token)
        setIsLoggedIn(true)
        setUserName(decoded.user_metadata?.full_name || "Người dùng")
        setUserRole(role)
      } catch (error) {
        console.error("Error decoding token:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")
        setIsLoggedIn(false)
        setUserRole(null)
      }
    }
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      localStorage.removeItem("token")
      localStorage.removeItem("userRole")
      setIsLoggedIn(false)
      setUserName("")
      setUserRole(null)
      navigate("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 400 },
    },
  }

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen pt-16">
      <NavigationBar />

      {/* Hero Banner */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
          alt="Office team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Chào mừng đến với XYZ Corp
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-center max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Cùng chúng tôi xây dựng tương lai!
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Company Promotion Section */}
        <motion.div
          className="mb-16 bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <motion.div
              className="p-8 flex flex-col justify-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.h2
                className="text-3xl font-bold mb-4 text-blue-700"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Về XYZ Corp
              </motion.h2>
              <motion.p
                className="text-gray-600 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Thành lập từ năm 2010, XYZ Corp đã trở thành một trong những công ty hàng đầu trong lĩnh vực công nghệ
                tại Việt Nam. Chúng tôi tự hào về đội ngũ nhân viên tài năng và văn hóa làm việc đề cao sự sáng tạo và
                đổi mới.
              </motion.p>
              <motion.div
                className="grid grid-cols-2 gap-4 mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-sm text-gray-600">Nhân viên</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative h-[400px] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Company team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    <div className="text-xl font-semibold mb-1">Đội ngũ chuyên nghiệp</div>
                    <div className="text-sm opacity-90">Cùng nhau xây dựng tương lai</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
            variants={itemVariants}
          >
            Tại sao chọn chúng tôi
          </motion.h2>
          <motion.p className="text-xl text-muted-foreground" variants={itemVariants}>
            XYZ Corp là đối tác lý tưởng cho sự phát triển nghề nghiệp của bạn
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-blue-100"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Pencil className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-700 text-center">Môi trường sáng tạo</h3>
            <p className="text-muted-foreground text-center">
              Chúng tôi khuyến khích sự sáng tạo và đổi mới trong mọi dự án, giúp bạn phát huy tối đa tiềm năng.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-blue-100"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <ArrowUp className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-700 text-center">Cơ hội phát triển</h3>
            <p className="text-muted-foreground text-center">
              Chúng tôi cung cấp các cơ hội học tập và phát triển liên tục, giúp bạn tiến xa hơn trong sự nghiệp.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-blue-100"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-700 text-center">Đội ngũ chuyên nghiệp</h3>
            <p className="text-muted-foreground text-center">
              Làm việc cùng những chuyên gia hàng đầu trong ngành, học hỏi và phát triển trong môi trường chuyên nghiệp.
            </p>
          </motion.div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
            variants={itemVariants}
          >
            Phúc lợi tại XYZ Corp
          </motion.h2>
          <motion.p className="text-xl text-muted-foreground" variants={itemVariants}>
            Chúng tôi cam kết mang đến những phúc lợi hấp dẫn cho nhân viên
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BuOE3QBb4KTZbvHBQWuHiXyABt9MfU.png"
                alt="Bảo hiểm toàn diện"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-4 text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto border-4 border-white">
                  <Gift className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="p-6 pt-2">
              <h3 className="text-xl font-semibold mb-3 text-blue-700 text-center">Bảo hiểm toàn diện</h3>
              <p className="text-muted-foreground text-center">
                Bảo hiểm sức khỏe cao cấp và các gói bảo hiểm bổ sung cho bạn và gia đình.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BuOE3QBb4KTZbvHBQWuHiXyABt9MfU.png"
                alt="Thưởng hiệu suất"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-4 text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto border-4 border-white">
                  <ArrowUp className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="p-6 pt-2">
              <h3 className="text-xl font-semibold mb-3 text-blue-700 text-center">Thưởng hiệu suất</h3>
              <p className="text-muted-foreground text-center">
                Thưởng dự án, thưởng cuối năm và các khoản thưởng đột xuất dựa trên thành tích.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BuOE3QBb4KTZbvHBQWuHiXyABt9MfU.png"
                alt="Nghỉ phép linh hoạt"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-4 text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto border-4 border-white">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="p-6 pt-2">
              <h3 className="text-xl font-semibold mb-3 text-blue-700 text-center">Nghỉ phép linh hoạt</h3>
              <p className="text-muted-foreground text-center">
                Chính sách nghỉ phép hào phóng cùng các kỳ nghỉ teambuilding hàng năm.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Section - Enhanced with images and start times */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
            variants={itemVariants}
          >
            Dự án tiêu biểu
          </motion.h2>
          <motion.p className="text-xl text-muted-foreground" variants={itemVariants}>
            Những thành tựu nổi bật mà XYZ Corp đã đạt được
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80"
                alt="Hệ thống quản lý thông minh"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                  Bắt đầu: Tháng 3/2022
                </div>
                <div className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">Hoàn thành</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Hệ thống quản lý thông minh</h3>
              <p className="text-muted-foreground mb-4">
                Phát triển hệ thống ERP cho hơn 50 doanh nghiệp tại Việt Nam, tối ưu hóa quy trình vận hành.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Briefcase className="h-4 w-4" />
                <span>Khách hàng: Tập đoàn ABC</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
                alt="Ứng dụng AI giao thông"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                  Bắt đầu: Tháng 6/2023
                </div>
                <div className="bg-yellow-100 text-yellow-700 text-sm font-medium px-3 py-1 rounded-full">
                  Đang triển khai
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Ứng dụng AI giao thông</h3>
              <p className="text-muted-foreground mb-4">
                Hợp tác với chính phủ triển khai AI dự đoán giao thông, giảm ùn tắc tại các đô thị lớn.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Briefcase className="h-4 w-4" />
                <span>Đối tác: Bộ Giao thông Vận tải</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
                alt="Nền tảng thương mại điện tử"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                  Bắt đầu: Tháng 9/2021
                </div>
                <div className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">Hoàn thành</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Nền tảng thương mại điện tử</h3>
              <p className="text-muted-foreground mb-4">
                Xây dựng nền tảng thương mại điện tử toàn diện với tính năng thanh toán tích hợp và quản lý kho hàng.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Briefcase className="h-4 w-4" />
                <span>Khách hàng: ShopViet Group</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                alt="Ứng dụng y tế thông minh"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                  Bắt đầu: Tháng 1/2024
                </div>
                <div className="bg-yellow-100 text-yellow-700 text-sm font-medium px-3 py-1 rounded-full">
                  Đang triển khai
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Ứng dụng y tế thông minh</h3>
              <p className="text-muted-foreground mb-4">
                Phát triển ứng dụng di động kết nối bệnh nhân với bác sĩ, đặt lịch khám và tư vấn trực tuyến.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Briefcase className="h-4 w-4" />
                <span>Đối tác: Bệnh viện Quốc tế</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Company Gallery Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
            variants={itemVariants}
          >
            Không gian làm việc
          </motion.h2>
          <motion.p className="text-xl text-muted-foreground" variants={itemVariants}>
            Khám phá môi trường làm việc hiện đại và sáng tạo tại Huy Tín Bố Già  Corp
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid gap-4">
            <motion.div
              className="rounded-lg overflow-hidden shadow-md h-64"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80"
                alt="Không gian làm việc mở"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="rounded-lg overflow-hidden shadow-md h-80"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=80"
                alt="Phòng họp sáng tạo"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="grid gap-4">
            <motion.div
              className="rounded-lg overflow-hidden shadow-md h-80"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Đội ngũ làm việc"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="rounded-lg overflow-hidden shadow-md h-64"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
                alt="Buổi họp nhóm"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="grid gap-4">
            <motion.div
              className="rounded-lg overflow-hidden shadow-md h-64"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&q=80"
                alt="Khu vực giải trí"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="rounded-lg overflow-hidden shadow-md h-80"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Không gian làm việc chung"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="py-16 bg-blue-600 rounded-xl shadow-xl mb-16 overflow-hidden relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-30"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 8,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-48 h-48 bg-blue-700 rounded-full opacity-20"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 6,
              ease: "easeInOut",
            }}
          />

          <div className="text-center px-4 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">Sẵn sàng khám phá cơ hội mới?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Tìm kiếm vị trí phù hợp với kỹ năng và đam mê của bạn trong danh sách việc làm đa dạng của chúng tôi.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:translate-y-[-3px] shadow-lg hover:shadow-xl px-8 py-6 text-lg"
                >
                  <Link to="/recruitment">Khám phá việc làm</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-blue-700 to-blue-900 text-white pt-16 pb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-800 rounded-full opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Về XYZ Corp</h3>
              <p className="text-blue-100 mb-4">
                Thành lập từ năm 2010, XYZ Corp đã trở thành một trong những công ty hàng đầu trong lĩnh vực công nghệ
                tại Việt Nam.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    Dịch vụ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    Dự án
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    Tuyển dụng
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    Tin tức & Sự kiện
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Dịch vụ</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    Phát triển phần mềm
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    Tư vấn công nghệ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    Giải pháp AI
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    Phát triển ứng dụng di động
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    Dịch vụ đám mây
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    Bảo mật thông tin
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-3 mt-1 text-blue-300"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-blue-100">123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-3 text-blue-300"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-blue-100">(+84) 28 1234 5678</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-3 text-blue-300"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className="text-blue-100">godfather123@gmail.com</span>
                </li>
              </ul>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Đăng ký nhận tin</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="px-4 py-2 rounded-l-md focus:outline-none text-gray-800 w-full"
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-600 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-100 mb-4 md:mb-0">© 2025 XYZ Corp. Mọi quyền được bảo lưu.</p>
              <div className="flex space-x-6">
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Điều khoản sử dụng
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Chính sách bảo mật
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Cookie
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

