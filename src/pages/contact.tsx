import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import NavigationBar from "@/components/ui/navigation-bar"// Đảm bảo đường dẫn đúng

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <div>
      <NavigationBar /> {/* Thanh điều hướng */}
      <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen pt-16">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-3xl font-semibold tracking-tight mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
              variants={itemVariants}
            >
              Liên hệ với chúng tôi
            </motion.h1>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Alert className="bg-red-50 border-red-200 text-red-800 shadow-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <AlertDescription className="text-red-600 font-medium text-lg">
                    Rất tiếc về sự cố bạn gặp phải, hãy kiên nhẫn chờ chúng tôi
                    khắc phục!
                  </AlertDescription>
                </Alert>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="p-8 border border-blue-100 rounded-lg shadow-lg space-y-6 bg-white"
                variants={containerVariants}
              >
                <motion.div className="grid gap-3" variants={itemVariants}>
                  <Label htmlFor="name" className="text-blue-800 font-medium">
                    Họ và Tên
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <Input
                      id="name"
                      placeholder="Nhập họ và tên"
                      required
                      className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                </motion.div>

                <motion.div className="grid gap-3" variants={itemVariants}>
                  <Label htmlFor="email" className="text-blue-800 font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập email"
                      required
                      className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                </motion.div>

                <motion.div className="grid gap-3" variants={itemVariants}>
                  <Label htmlFor="phone" className="text-blue-800 font-medium">
                    Số điện thoại
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="h-5 w-5 text-blue-400" />
                    </div>
                    <Input
                      id="phone"
                      placeholder="Nhập số điện thoại"
                      required
                      className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                </motion.div>

                <motion.div className="grid gap-3" variants={itemVariants}>
                  <Label htmlFor="issue" className="text-blue-800 font-medium">
                    Vấn đề gặp phải
                  </Label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                    </div>
                    <Textarea
                      id="issue"
                      placeholder="Mô tả vấn đề của bạn"
                      rows={5}
                      required
                      className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px] flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" /> Gửi
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}