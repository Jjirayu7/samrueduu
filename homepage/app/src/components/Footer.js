function Footer() {
    return<>
        <div
          className="container-xxl justify-content-start mt-5 p-5"
          style={{ backgroundColor: "#FFF5F6" }}
          >
                <div className="row justify-content-between ms-5">
                    <div
                        className="col-3 d-flex justify-content-start align-items-center ms-5"
                        style={{ fontSize: "80px", fontWeight: "bold", color: "#5A0D6C" }}
                    >
                        <p>สามฤดู</p>
                    </div>
                    <div className="col-2">
                        <p style={{ marginBottom: "-1%", fontWeight: "bold", fontSize: "20px" }}>
                            เกี่ยวกับเรา
                        </p>
                        <a href="#" style={{ color: "black", textDecoration: "none", display: "block" }}>
                            ติดต่อเรา
                        </a>
                        <a href="#" style={{ color: "black", textDecoration: "none", display: "block" }}>
                            เกี่ยวกับเรา
                        </a>
                        <a href="#" style={{ color: "black", textDecoration: "none", display: "block" }}>
                            ข้อกำหนดและเงื่อนไข
                        </a>
                        <a href="#" style={{ color: "black", textDecoration: "none", display: "block" }}>
                            นโยบายความเป็นส่วนตัว
                        </a>
                    </div>
                    <div className="col-2">
                        <p style={{ marginBottom: "-1%", fontWeight: "bold", fontSize: "20px" }}>
                            บริการลูกค้า
                        </p>
                        <a href="#" style={{ color: "black", textDecoration: "none", display: "block" }}>
                            การจัดส่งสินค้า
                        </a>
                        <a href="#" style={{ color: "black", textDecoration: "none", display: "block" }}>
                            การรับประกันสินค้า
                        </a>
                        <a href="#" style={{ color: "black", textDecoration: "none", display: "block" }}>
                            การยกเลิกการสั่งซื้อสินค้า
                        </a>
                        <a href="#" style={{ color: "black", textDecoration: "none", display: "block" }}>
                            การคืนสินค้าและการคืนเงิน
                        </a>
                    </div>
                    <div className="col-4 mx-3">
                        <p style={{ fontWeight: "bold", fontSize: "20px" }}>ติดต่อเรา</p>
                        <div className="logo d-flex justify-content-start mb-4">
                            <a href="#">
                                <img
                                    src="X Logo.png"
                                    alt="x logo"
                                    className="me-3"
                                    style={{ width: "40px", height: "auto" }}
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="Logo Instagram.png"
                                    alt="instagram logo"
                                    className="me-3"
                                    style={{ width: "40px", height: "auto" }}
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="Logo YouTube.png"
                                    alt="youtube logo"
                                    className="me-3"
                                    style={{ width: "40px", height: "auto" }}
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="LinkedIn.png"
                                    alt="LinkedIn logo"
                                    style={{ width: "40px", height: "auto" }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

    </>
}
export default Footer;