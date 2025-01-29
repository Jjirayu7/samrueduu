import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import config from "../config";
import axios from "axios";

function MenuBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const defaultImage = 'profile-icon.jpg';

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        const fetchData = async () => {
            try {
                const res = await axios.get(config.apiPath + '/user/customer/info', config.headers());
                console.log("API Response:", res.data.result);
                if (res.data.result !== undefined) {
                    console.log(res.data.result.imgProfile);
                    setUser({ ...res.data.result, profileImage: res.data.result.imgProfile });
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    navigate("/signIn");
                }
                Swal.fire({
                    title: 'ไม่มีข้อมูลผู้ใช้',
                    text: 'โปรดเข้าสู่ระบบ',
                    icon: 'warning'
                });
            }
        };

        if (token) {
            fetchData();
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <div className="m-3">
            <div className="mt-1">
                <nav>
                    <Link to="/home" className="nav-link">
                        <h6 className="ms-2 text-color">หน้าหลัก</h6>  
                    </Link>                                                  
                </nav>
                <div style={{ borderTop: "1px solid #D8BABD", width: "100%", margin: "auto" }}></div>
                
                <div className="mt-3">
                    <Link to="/productMain" className="nav-link">
                        <h6 className="ms-2 text-color">สินค้า</h6>  
                    </Link>                  
                </div>
                <div style={{ borderTop: "1px solid #D8BABD", width: "100%", margin: "auto" }}></div>
                
                <div className="mt-3">
                    <h6 className="ms-2 text-color">ความรู้</h6>                   
                </div>
                <div style={{ borderTop: "1px solid #D8BABD", width: "100%", margin: "auto" }}></div>
                
                <div className="mt-3">
                    <h6 className="ms-2 text-color">ติดต่อเรา</h6>                   
                </div>
                <div style={{ borderTop: "1px solid #D8BABD", width: "100%", margin: "auto" }}></div>
                
                <div className="mt-3">
                    <h6 className="ms-2 text-color">วิธีใช้งาน</h6>                   
                </div>
                <div style={{ borderTop: "1px solid #D8BABD", width: "100%", margin: "auto" }}></div>
                
                <div className="mt-3">
                    <Link to="/orders" className="nav-link">
                        <h6 className="ms-2 text-color">ประวัติการสั่งซื่อ</h6>    
                    </Link>              
                </div>
                <div style={{ borderTop: "1px solid #D8BABD", width: "100%", margin: "auto" }}></div>
                
                <div className="mt-3 d-flex justify-content-between">
                    {isLoggedIn ? (
                        <Link to='/profile' className="nav-link">
                            <div className="d-flex justify-content-start">
                                <img
                                    src={user.profileImage ? `${config.apiPath}/uploads/${user.profileImage}` : defaultImage}
                                    alt={`${user.firstName || 'User'}'s profile`}
                                    className="profile-image profile-image-large"
                                />
                                    <h5 className="text-color ms-2 mt-2">{user.userName}</h5>
                            </div>
                        </Link>
                    ) : null}
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="nav-link" style={{ border: "none", background: "none", cursor: "pointer" }}>
                            <h6 className="ms-2 text-red">ออกจากระบบ</h6>
                        </button>
                    ) : (
                        <Link to="/signIn" className="nav-link">
                            <h6 className="ms-2 text-color">เข้าสู่ระบบ</h6>
                        </Link>
                    )}                   
                </div>
            </div>      
        </div>
    );
}

export default MenuBar;