import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import tutorService from "../services/tutor.service";

interface Tutor {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
    };
    bio: string;
    experience: string;
    price: number;
    videoUrl: string;
}

function Home() {
    const navigate = useNavigate();
    const [featuredTutors, setFeaturedTutors] = useState<Tutor[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        // Fetch featured tutors
        const fetchFeaturedTutors = async () => {
            try {
                const tutors = await tutorService.getAll();
                // Get first 3 tutors as featured
                setFeaturedTutors(tutors.slice(0, 3));
            } catch (error) {
                console.error("Error fetching tutors:", error);
            }
        };

        fetchFeaturedTutors();
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleGetStarted = () => {
        if (isLoggedIn) {
            navigate("/tutors");
        } else {
            navigate("/login");
        }
    };
    const checkout= ()=>{
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    }

    return (
        <div>
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-primary" to="/">
                        <i className="fas fa-graduation-cap me-2"></i>
                        English Tutor Hub
                    </Link>
                    
                    <div className="navbar-nav ms-auto">
                        {!isLoggedIn ? (
                            <>
                                <Link className="nav-link me-3" to="/login">
                                    <i className="fas fa-sign-in-alt me-1"></i>
                                    Đăng nhập
                                </Link>
                                <Link className="btn btn-primary" to="/register">
                                    <i className="fas fa-user-plus me-1"></i>
                                    Đăng ký
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link me-3" to="/tutors">
                                    <i className="fas fa-chalkboard-teacher me-1"></i>
                                    Gia sư
                                </Link>
                                <Link className="nav-link me-3" to="/booking/courses">
                                    <i className="fas fa-calendar me-1"></i>
                                    Lịch học
                                </Link>
                                <button 
                                    className="btn btn-outline-danger"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        setIsLoggedIn(false);
                                        navigate("/");
                                    }}
                                >
                                    <i className="fas fa-sign-out-alt me-1" onClick={checkout}></i>
                                    Đăng xuất
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section bg-gradient" style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                minHeight: "70vh",
                display: "flex",
                alignItems: "center"
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="text-white">
                                <h1 className="display-4 fw-bold mb-4">
                                    Tìm Gia Sư Tiếng Anh 1:1 
                                    <span className="text-warning">Chất Lượng Cao</span>
                                </h1>
                                <p className="lead mb-4">
                                    Kết nối với các gia sư tiếng Anh giàu kinh nghiệm. 
                                    Học tập linh hoạt, hiệu quả với lịch trình phù hợp với bạn.
                                </p>
                                <div className="d-flex gap-3 mb-4">
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Gia sư được kiểm định</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-clock text-info me-2"></i>
                                        <span>Lịch học linh hoạt</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-star text-warning me-2"></i>
                                        <span>Chất lượng đảm bảo</span>
                                    </div>
                                </div>
                                <button 
                                    className="btn btn-warning btn-lg px-5 py-3 fw-bold"
                                    onClick={handleGetStarted}
                                >
                                    <i className="fas fa-rocket me-2"></i>
                                    {isLoggedIn ? "Tìm Gia Sư Ngay" : "Bắt Đầu Học"}
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="text-center">
                                <img 
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                                    alt="Online English Learning" 
                                    className="img-fluid rounded-3 shadow-lg"
                                    style={{ maxHeight: "400px", objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3">Tại Sao Chọn Chúng Tôi?</h2>
                        <p className="lead text-muted">
                            Nền tảng học tiếng Anh 1:1 hàng đầu với nhiều tính năng ưu việt
                        </p>
                    </div>
                    
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm text-center p-4">
                                <div className="card-body">
                                    <div className="feature-icon mb-3">
                                        <i className="fas fa-user-graduate fa-3x text-primary"></i>
                                    </div>
                                    <h5 className="card-title fw-bold">Gia Sư Chất Lượng</h5>
                                    <p className="card-text text-muted">
                                        Đội ngũ gia sư được tuyển chọn kỹ lưỡng với kinh nghiệm 
                                        giảng dạy phong phú và chứng chỉ quốc tế.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm text-center p-4">
                                <div className="card-body">
                                    <div className="feature-icon mb-3">
                                        <i className="fas fa-calendar-alt fa-3x text-success"></i>
                                    </div>
                                    <h5 className="card-title fw-bold">Lịch Học Linh Hoạt</h5>
                                    <p className="card-text text-muted">
                                        Tự do chọn thời gian học phù hợp với lịch trình của bạn. 
                                        Có thể thay đổi và điều chỉnh dễ dàng.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm text-center p-4">
                                <div className="card-body">
                                    <div className="feature-icon mb-3">
                                        <i className="fas fa-video fa-3x text-info"></i>
                                    </div>
                                    <h5 className="card-title fw-bold">Học Trực Tuyến</h5>
                                    <p className="card-text text-muted">
                                        Học mọi lúc mọi nơi với công nghệ video call chất lượng cao. 
                                        Tiết kiệm thời gian di chuyển.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Tutors Section */}
            {featuredTutors.length > 0 && (
                <section className="py-5">
                    <div className="container">
                        <div className="text-center mb-5">
                            <h2 className="fw-bold mb-3">Gia Sư Nổi Bật</h2>
                            <p className="lead text-muted">
                                Một số gia sư xuất sắc trên nền tảng của chúng tôi
                            </p>
                        </div>
                        
                        <div className="row g-4">
                            {featuredTutors.map((tutor) => (
                                <div key={tutor._id} className="col-md-4">
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div className="card-body text-center p-4">
                                            <div className="mb-3">
                                                <i className="fas fa-user-circle fa-4x text-primary"></i>
                                            </div>
                                            <h5 className="card-title fw-bold">{tutor.userId.name}</h5>
                                            <p className="text-muted mb-3">{tutor.bio}</p>
                                            <div className="mb-3">
                                                <span className="badge bg-success fs-6">
                                                    {formatPrice(tutor.price)}/buổi
                                                </span>
                                            </div>
                                            <Link 
                                                to={`/tutors/${tutor._id}`}
                                                className="btn btn-outline-primary"
                                            >
                                                Xem Chi Tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="text-center mt-5">
                            <Link to="/tutors" className="btn btn-primary btn-lg">
                                <i className="fas fa-users me-2"></i>
                                Xem Tất Cả Gia Sư
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Stats Section */}
            <section className="py-5 bg-primary text-white">
                <div className="container">
                    <div className="row text-center g-4">
                        <div className="col-md-3">
                            <div className="stat-item">
                                <h3 className="display-4 fw-bold">500+</h3>
                                <p className="lead">Gia Sư Chất Lượng</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stat-item">
                                <h3 className="display-4 fw-bold">10K+</h3>
                                <p className="lead">Học Viên Hài Lòng</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stat-item">
                                <h3 className="display-4 fw-bold">50K+</h3>
                                <p className="lead">Giờ Học Hoàn Thành</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stat-item">
                                <h3 className="display-4 fw-bold">4.9/5</h3>
                                <p className="lead">Đánh Giá Trung Bình</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-3">Sẵn Sàng Bắt Đầu Hành Trình Học Tiếng Anh?</h2>
                            <p className="lead mb-4 text-muted">
                                Tham gia cùng hàng nghìn học viên đã cải thiện trình độ tiếng Anh 
                                của mình với sự hỗ trợ từ các gia sư chuyên nghiệp.
                            </p>
                            <div className="d-flex gap-3 justify-content-center">
                                {!isLoggedIn ? (
                                    <>
                                        <Link to="/register" className="btn btn-primary btn-lg px-5">
                                            <i className="fas fa-user-plus me-2"></i>
                                            Đăng Ký Ngay
                                        </Link>
                                        <Link to="/tutors" className="btn btn-outline-primary btn-lg px-5">
                                            <i className="fas fa-search me-2"></i>
                                            Khám Phá Gia Sư
                                        </Link>
                                    </>
                                ) : (
                                    <Link to="/tutors" className="btn btn-primary btn-lg px-5">
                                        <i className="fas fa-rocket me-2"></i>
                                        Tìm Gia Sư Ngay
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="fw-bold">
                                <i className="fas fa-graduation-cap me-2"></i>
                                English Tutor Hub
                            </h5>
                            <p className="text-muted">
                                Nền tảng kết nối gia sư tiếng Anh 1:1 hàng đầu Việt Nam.
                            </p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <div className="social-links">
                                <a href="#" className="text-white me-3">
                                    <i className="fab fa-facebook fa-lg"></i>
                                </a>
                                <a href="#" className="text-white me-3">
                                    <i className="fab fa-twitter fa-lg"></i>
                                </a>
                                <a href="#" className="text-white me-3">
                                    <i className="fab fa-instagram fa-lg"></i>
                                </a>
                                <a href="#" className="text-white">
                                    <i className="fab fa-youtube fa-lg"></i>
                                </a>
                            </div>
                            <p className="text-muted mt-3 mb-0">
                                © Lê Văn Quí 
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
