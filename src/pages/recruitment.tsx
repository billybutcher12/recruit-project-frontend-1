import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, List, Grid, Briefcase, MapPin, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import NavigationBar from "@/components/ui/navigation-bar";

interface JobPost {
  id: string;
  title: string;
  description: string;
  location?: string;
  type?: string;
  posted_date?: string;
  is_published: boolean;
}

export default function RecruitmentPage() {
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/jobs`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            const errorText = await response.text();
            console.error("Không thể lấy thông tin người dùng:", errorText);
            setError("Không thể lấy thông tin người dùng: " + errorText);
          }
        } catch (error) {
          console.error("Lỗi khi lấy thông tin người dùng:", error);
          setError("Lỗi khi lấy thông tin người dùng: " + (error as Error).message);
        }
      } else {
        setError("Vui lòng đăng nhập để tiếp tục.");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vui lòng đăng nhập để xem danh sách công việc.");
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Không thể tải danh sách công việc: ${errorText}`);
        }
        const data = await response.json();
        console.log("Danh sách công việc từ API:", data);
        setJobs(data || []);
      } catch (error) {
        setError((error as Error).message || "Có lỗi xảy ra khi kết nối đến server.");
        console.error("Lỗi khi lấy danh sách công việc:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const isStaff = user?.role === "staff";

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vui lòng đăng nhập để thêm công việc.");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, location, type, is_published: true }),
      });
      if (response.ok) {
        setShowAddJobForm(false);
        setTitle("");
        setDescription("");
        setLocation("");
        setType("");
        const updatedJobs = await fetch("http://localhost:5000/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json());
        setJobs(updatedJobs || []);
        alert("Thêm công việc thành công!");
      } else {
        const errorText = await response.text();
        alert(`Lỗi khi thêm công việc: ${errorText}`);
      }
    } catch (error) {
      console.error("Lỗi khi thêm công việc:", error);
      alert("Có lỗi xảy ra khi thêm công việc!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div>
      <NavigationBar />
      <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen pt-16">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Cơ hội việc làm
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex bg-muted rounded-md p-1">
                <motion.button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid size={20} className="text-blue-600" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List size={20} className="text-blue-600" />
                </motion.button>
              </div>
              {isStaff && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => setShowAddJobForm(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Thêm việc làm
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>

          <div className="flex">
            <div className={showAddJobForm ? "w-2/3 pr-6" : "w-full"}>
              {isLoading ? (
                <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : jobs.length === 0 ? (
                <p className="text-center text-gray-500">Không có công việc nào hiện tại.</p>
              ) : (
                <AnimatePresence mode="wait">
                  {viewMode === "grid" ? (
                    <motion.div
                      key="grid"
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: 20 }}
                    >
                      {jobs.map((job) => (
                        <motion.div
                          key={job.id}
                          className="bg-white border border-blue-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                          variants={itemVariants}
                          whileHover={{ y: -5 }}
                        >
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-xl font-semibold text-blue-700">{job.title}</h3>
                              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                {job.posted_date}
                              </span>
                            </div>
                            <p className="text-muted-foreground mb-2">{job.description}</p>
                            <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
                              {job.location && (
                                <div className="flex items-center">
                                  <MapPin size={14} className="mr-1 text-blue-500" />
                                  {job.location}
                                </div>
                              )}
                              {job.type && (
                                <div className="flex items-center">
                                  <Briefcase size={14} className="mr-1 text-blue-500" />
                                  {job.type}
                                </div>
                              )}
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                asChild
                                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                              >
                                <Link to={`/apply/${job.id}`}>Ứng tuyển ngay</Link>
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="list"
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: 20 }}
                    >
                      {jobs.map((job) => (
                        <motion.div
                          key={job.id}
                          className="bg-white border border-blue-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                          variants={itemVariants}
                          whileHover={{ y: -5 }}
                        >
                          <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold text-blue-700">{job.title}</h3>
                                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                  {job.posted_date}
                                </span>
                              </div>
                              <p className="text-muted-foreground mb-2">{job.description}</p>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                {job.location && (
                                  <div className="flex items-center">
                                    <MapPin size={14} className="mr-1 text-blue-500" />
                                    {job.location}
                                  </div>
                                )}
                                {job.type && (
                                  <div className="flex items-center">
                                    <Briefcase size={14} className="mr-1 text-blue-500" />
                                    {job.type}
                                  </div>
                                )}
                              </div>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} className="mt-4 md:mt-0">
                              <Button
                                asChild
                                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                              >
                                <Link to={`/apply/${job.id}`}>Ứng tuyển ngay</Link>
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            <AnimatePresence>
              {showAddJobForm && (
                <motion.div
                  className="w-1/3 bg-white p-6 rounded-lg shadow-lg border border-blue-100"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-blue-700">Thêm công việc mới</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowAddJobForm(false)}
                      className="hover:bg-red-50 text-red-500"
                    >
                      <X size={18} />
                    </Button>
                  </div>

                  <form onSubmit={handleAddJob} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Tên vị trí</Label>
                      <Input
                        id="job-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Nhập tên vị trí"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job-description">Mô tả công việc</Label>
                      <Textarea
                        id="job-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Nhập mô tả công việc"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job-location">Địa điểm</Label>
                      <Input
                        id="job-location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Nhập địa điểm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job-type">Loại công việc</Label>
                      <select
                        id="job-type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Chọn loại công việc</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang thêm..." : "Thêm"}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}