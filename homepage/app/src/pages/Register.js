import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import config from "../config";

function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (user.password !== user.repassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
      });
      return;
    }
    try {
      const res = await axios.post(config.apiPath + "/user/customer/register", user);

      Swal.fire({
        title: "Success",
        text: "Registration completed",
        icon: "success",
      });
      navigate("/signIn");
    } catch (e) {
      Swal.fire({
        title: "Error",
        text: e.response?.data?.message || "An error occurred",
        icon: "error",
      });
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-image">
        <img src="logo-2.png" alt="Sign In Visual" />
      </div>
      <div className="signin-box">
        <div className="p-5" style={{ borderRadius: "30px", backgroundColor: "#fff5f6" }}>
          <h6
            className="login-box-msg"
            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
          >
            สมัครสมาชิก
          </h6>
          <form onSubmit={handleRegister}>
            <div className="d-flex justify-content-between mt-4">
              <div className="mx-2">
                <h6>ชื่อ</h6>
                <div className="input-group mb-3">
                  <input
                    style={{ borderRadius: "30px" }}
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  />
                </div>
              </div>
              <div className="mx-2">
                <h6>นามสกุล</h6>
                <div className="input-group mb-3">
                  <input
                    style={{ borderRadius: "30px" }}
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="mx-2">
              <h6>ชื่อผู้ใช้</h6>
              <div className="input-group mb-3">
                <input
                  style={{ borderRadius: "30px" }}
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={user.userName}
                  onChange={(e) => setUser({ ...user, userName: e.target.value })}
                />
              </div>
            </div>
            <div className="mx-2">
              <h6>อีเมล</h6>
              <div className="input-group mb-3">
                <input
                  style={{ borderRadius: "30px" }}
                  type="email"
                  className="form-control"
                  placeholder=""
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
            </div>
            <div className="mx-2">
              <h6>รหัสผ่าน</h6>
              <div className="input-group mb-3">
                <input
                  style={{ borderRadius: "30px" }}
                  type="password"
                  className="form-control"
                  placeholder=""
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
            </div>
            <div className="mx-2">
              <h6>ยืนยันรหัสผ่าน</h6>
              <div className="input-group mb-3">
                <input
                  style={{ borderRadius: "30px" }}
                  type="password"
                  className="form-control"
                  placeholder=""
                  value={user.repassword}
                  onChange={(e) => setUser({ ...user, repassword: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-5" style={{ borderTop: "1px solid #D8BABD", width: "100%", margin: "auto" }}></div>
            <div className="mt-5 d-flex justify-content-center">
              <button type="submit" className="btn rounded-pill" style={{ backgroundColor: "#5B166C" }}>
                <h6 className="text-white mx-4">สมัครสมาชิก</h6>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;