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
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

export default function ApplyPage() {
  const { id } = useParams<{ id: string }>();
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState("");
  const [job, setJob] = useState<{ title: string } | null>(null);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchJob = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setJob(data);
          setPosition(data.title);
        } else {
          console.error("Không thể lấy thông tin công việc");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin công việc:", error);
      }
    };
    fetchJob();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("job_id", id!);
    formData.append("position", position);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}/api/apply`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Lỗi khi gửi ứng tuyển");
      }
    } catch (error) {
      console.error("Lỗi khi gửi ứng tuyển:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">
            Ứng tuyển vị trí {job ? job.title : "Loading..."}
          </h1>

          {submitted ? (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600 font-medium">
                Đã gửi thành công!
              </AlertDescription>
            </Alert>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-6 border rounded-lg shadow-md space-y-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="full_name">Họ và Tên</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="position">Vị trí ứng tuyển</Label>
                <Select onValueChange={setPosition} value={position}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vị trí" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={job?.title || "Developer"}>
                      {job?.title || "Developer"}
                    </SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cv">Đính kèm CV</Label>
                <Input id="cv" name="cv" type="file" accept=".pdf" required />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Gửi
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}