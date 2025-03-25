import { Suspense, lazy, Component, ReactNode } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "./components/layout";
import { jwtDecode } from "jwt-decode";

// Định nghĩa kiểu cho token decoded
interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}
interface CustomJwtPayload extends JwtPayload {
  user_metadata?: {
    role?: string;
  };
}

// Lazy load pages với xử lý lỗi
const HomePage = lazy(() =>
  import("./pages/home").catch(() => ({
    default: () => <div>Error loading HomePage</div>,
  }))
);
const RecruitmentPage = lazy(() =>
  import("./pages/recruitment").catch(() => ({
    default: () => <div>Error loading RecruitmentPage</div>,
  }))
);
const RegisterPage = lazy(() =>
  import("./pages/register").catch(() => ({
    default: () => <div>Error loading RegisterPage</div>,
  }))
);
const LoginPage = lazy(() =>
  import("./pages/login").catch(() => ({
    default: () => <div>Error loading LoginPage</div>,
  }))
);
const AdminPage = lazy(() =>
  import("./pages/admin").catch(() => ({
    default: () => <div>Error loading AdminPage</div>,
  }))
);
const ApplyPage = lazy(() =>
  import("./pages/apply").catch(() => ({
    default: () => <div>Error loading ApplyPage</div>,
  }))
);
const ContactPage = lazy(() =>
  import("./pages/contact").catch(() => ({
    default: () => <div>Error loading ContactPage</div>,
  }))
);

// Component bảo vệ route
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element; requiredRole?: string }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded: CustomJwtPayload = jwtDecode(token);
    const userRole = decoded.role || decoded.user_metadata?.role;
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/" replace />;
    }
    return children;
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

// Component cho trang 404
const NotFoundPage = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Trang không tìm thấy</h1>
      <p className="text-gray-600 mb-4">Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
      <Button asChild>
        <Link to="/">Quay lại trang chủ</Link>
      </Button>
    </div>
  </div>
);

// Error Boundary để bắt lỗi runtime
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Đã xảy ra lỗi
            </h1>
            <p className="text-gray-600 mb-4">Vui lòng thử lại sau.</p>
            <Button asChild>
              <Link to="/">Quay lại trang chủ</Link>
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="text-xl font-semibold text-blue-600">Đang tải...</div>
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/recruitment" element={<RecruitmentPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="staff">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply/:id"
              element={
                <ProtectedRoute>
                  <ApplyPage />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            {/* Route cho 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;