import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  FileDown,
  Users,
  Calendar,
  CheckCircle,
  Star,
  BarChart3,
  Mail,
  Search,
  Filter,
  RefreshCw,
  Settings,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Applicant {
  id: number;
  name: string;
  phone: string;
  email: string;
  position: string;
  status: "Chưa đánh giá" | "Đậu" | "Trượt";
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const applicants: Applicant[] = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "nguyenvana@example.com",
      position: "Developer",
      status: "Chưa đánh giá",
    },
    {
      id: 2,
      name: "Trần Thị B",
      phone: "0987654321",
      email: "tranthib@example.com",
      position: "Designer",
      status: "Đậu",
    },
    {
      id: 3,
      name: "Lê Văn C",
      phone: "0369852147",
      email: "levanc@example.com",
      position: "Marketing",
      status: "Trượt",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      phone: "0912345678",
      email: "phamthid@example.com",
      position: "HR Manager",
      status: "Đậu",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      phone: "0987654321",
      email: "hoangvane@example.com",
      position: "Product Manager",
      status: "Chưa đánh giá",
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
  };

  const chartVariants = {
    hidden: { height: 0 },
    visible: (height: number) => ({
      height: `${height}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-white min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header with user info */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Trang quản trị nhân sự
          </motion.h1>

          <div className="flex items-center space-x-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="h-5 w-5 text-blue-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-sm border border-blue-100"
              whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="h-4 w-4" />
              </div>
              <span className="font-medium text-gray-700">Admin</span>
              <LogOut className="h-4 w-4 text-gray-400 cursor-pointer" />
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Tabs
            defaultValue="dashboard"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto bg-blue-50">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="applicants"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                <Users className="h-4 w-4 mr-2" />
                Ứng viên
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Báo cáo
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                Cài đặt
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="space-y-8">
              {/* Statistics Section */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <Card className="overflow-hidden border-blue-100 hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-white">
                      <CardTitle className="text-sm font-medium text-blue-600 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-blue-500" />
                        Số ứng viên hôm nay
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-700">5</div>
                      <div className="text-xs text-green-600 mt-1 flex items-center">
                        <ArrowUp className="h-3 w-3 mr-1" /> 12% so với hôm qua
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="overflow-hidden border-blue-100 hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-white">
                      <CardTitle className="text-sm font-medium text-blue-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        Số ứng viên tháng này
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-700">20</div>
                      <div className="text-xs text-green-600 mt-1 flex items-center">
                        <ArrowUp className="h-3 w-3 mr-1" /> 8% so với tháng
                        trước
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="overflow-hidden border-blue-100 hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-white">
                      <CardTitle className="text-sm font-medium text-blue-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-blue-500" />
                        Ứng viên đậu
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-700">10</div>
                      <div className="text-xs text-green-600 mt-1 flex items-center">
                        <ArrowUp className="h-3 w-3 mr-1" /> 5% so với tháng
                        trước
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="overflow-hidden border-blue-100 hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-white">
                      <CardTitle className="text-sm font-medium text-blue-600 flex items-center">
                        <Star className="h-4 w-4 mr-2 text-blue-500" />
                        Ứng viên tiềm năng
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-700">5</div>
                      <div className="text-xs text-green-600 mt-1 flex items-center">
                        <ArrowUp className="h-3 w-3 mr-1" /> 15% so với tháng
                        trước
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Chart Section */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <Card className="mb-8 border-blue-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-white flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                      Thống kê ứng viên
                    </CardTitle>
                    <motion.button
                      className="p-1 rounded-full hover:bg-blue-100 transition-colors"
                      onClick={handleRefresh}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <RefreshCw
                        className={`h-4 w-4 text-blue-600 ${isRefreshing ? "animate-spin" : ""}`}
                      />
                    </motion.button>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="h-[250px] flex items-end justify-around">
                      {[30, 45, 25, 60, 75, 40, 55].map((height, index) => (
                        <div key={index} className="relative group">
                          <motion.div
                            className="w-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md relative group"
                            custom={height}
                            variants={chartVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <motion.div
                              className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              {height}%
                            </motion.div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-around mt-4 text-sm text-blue-600 font-medium">
                      <div>T2</div>
                      <div>T3</div>
                      <div>T4</div>
                      <div>T5</div>
                      <div>T6</div>
                      <div>T7</div>
                      <div>CN</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="applicants" className="space-y-8">
              {/* Search and Filter */}
              <motion.div
                className="flex flex-col md:flex-row gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm ứng viên..."
                    className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-blue-200"
                  >
                    <Filter className="h-4 w-4" />
                    Lọc
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                    onClick={handleRefresh}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                    />
                    Làm mới
                  </Button>
                </div>
              </motion.div>

              {/* Applicants Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Card className="mb-8 border-blue-100 overflow-hidden shadow-md">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      Danh sách ứng viên
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-blue-50">
                          <TableRow>
                            <TableHead className="font-semibold">
                              Họ và Tên
                            </TableHead>
                            <TableHead className="font-semibold">
                              Số điện thoại
                            </TableHead>
                            <TableHead className="font-semibold">
                              Email
                            </TableHead>
                            <TableHead className="font-semibold">
                              Vị trí
                            </TableHead>
                            <TableHead className="font-semibold">
                              File CV
                            </TableHead>
                            <TableHead className="font-semibold">
                              Trạng thái
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {applicants.map((applicant, index) => (
                            <motion.tr
                              key={applicant.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.3 }}
                              className="hover:bg-blue-50 transition-colors duration-200"
                            >
                              <TableCell className="font-medium">
                                {applicant.name}
                              </TableCell>
                              <TableCell>{applicant.phone}</TableCell>
                              <TableCell>{applicant.email}</TableCell>
                              <TableCell>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                  {applicant.position}
                                </span>
                              </TableCell>
                              <TableCell>
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-blue-200 hover:bg-blue-50"
                                  >
                                    <FileDown className="h-4 w-4 mr-2 text-blue-600" />
                                    Tải xuống
                                  </Button>
                                </motion.div>
                              </TableCell>
                              <TableCell>
                                <Select defaultValue={applicant.status}>
                                  <SelectTrigger className="w-[180px] border-blue-200">
                                    <SelectValue placeholder="Trạng thái" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem
                                      value="Chưa đánh giá"
                                      className="text-yellow-600"
                                    >
                                      Chưa đánh giá
                                    </SelectItem>
                                    <SelectItem
                                      value="Đậu"
                                      className="text-green-600"
                                    >
                                      Đậu
                                    </SelectItem>
                                    <SelectItem
                                      value="Trượt"
                                      className="text-red-600"
                                    >
                                      Trượt
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-8">
              {/* Reports Section */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-blue-100 hover:shadow-md transition-all duration-300 h-full">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                      <CardTitle className="flex items-center">
                        <Download className="h-5 w-5 mr-2 text-blue-600" />
                        Báo cáo ứng viên
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <div>
                            <div className="text-sm text-blue-700 font-medium mb-1">
                              Ứng viên đậu
                            </div>
                            <div className="text-2xl font-bold text-blue-800">
                              10
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="border-blue-200 hover:bg-blue-100"
                            >
                              <Download className="h-4 w-4 mr-2 text-blue-600" />
                              Xuất Excel
                            </Button>
                          </motion.div>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <div>
                            <div className="text-sm text-red-700 font-medium mb-1">
                              Ứng viên trượt
                            </div>
                            <div className="text-2xl font-bold text-red-800">
                              5
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="border-red-200 hover:bg-red-100"
                            >
                              <Download className="h-4 w-4 mr-2 text-red-600" />
                              Xuất Excel
                            </Button>
                          </motion.div>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <div>
                            <div className="text-sm text-yellow-700 font-medium mb-1">
                              Chưa đánh giá
                            </div>
                            <div className="text-2xl font-bold text-yellow-800">
                              8
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="border-yellow-200 hover:bg-yellow-100"
                            >
                              <Download className="h-4 w-4 mr-2 text-yellow-600" />
                              Xuất Excel
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Email Settings */}
                <motion.div variants={itemVariants}>
                  <Card className="border-blue-100 hover:shadow-md transition-all duration-300 h-full">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                      <CardTitle className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-blue-600" />
                        Cài đặt email
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label
                            htmlFor="email-settings"
                            className="text-blue-700"
                          >
                            Địa chỉ email nhận thông tin
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="email-settings"
                              placeholder="Nhập địa chỉ email"
                              className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label
                            htmlFor="email-frequency"
                            className="text-blue-700"
                          >
                            Tần suất gửi báo cáo
                          </Label>
                          <Select defaultValue="daily">
                            <SelectTrigger className="border-blue-200">
                              <SelectValue placeholder="Chọn tần suất" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Hàng ngày</SelectItem>
                              <SelectItem value="weekly">Hàng tuần</SelectItem>
                              <SelectItem value="monthly">
                                Hàng tháng
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="pt-2"
                        >
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                            Lưu cài đặt
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-8">
              <motion.div
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-blue-100 hover:shadow-md transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-blue-600" />
                      Cài đặt hệ thống
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="system-name" className="text-blue-700">
                        Tên hệ thống
                      </Label>
                      <Input
                        id="system-name"
                        defaultValue="Hệ thống tuyển dụng XYZ"
                        className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-logo" className="text-blue-700">
                        Logo công ty
                      </Label>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-blue-100 rounded-md flex items-center justify-center">
                          <img
                            src="https://api.dicebear.com/7.x/initials/svg?seed=XYZ"
                            alt="Company Logo"
                            className="h-12 w-12"
                          />
                        </div>
                        <Button
                          variant="outline"
                          className="border-blue-200 hover:bg-blue-50"
                        >
                          Thay đổi
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-blue-700">Giao diện</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-blue-200 rounded-md p-4 flex items-center gap-2 cursor-pointer bg-blue-50">
                          <div className="h-4 w-4 rounded-full border-2 border-blue-600 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                          </div>
                          <span>Sáng</span>
                        </div>
                        <div className="border border-blue-200 rounded-md p-4 flex items-center gap-2 cursor-pointer">
                          <div className="h-4 w-4 rounded-full border-2 border-blue-200"></div>
                          <span>Tối</span>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="pt-4"
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                        Lưu cài đặt
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

const ArrowUp = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);
