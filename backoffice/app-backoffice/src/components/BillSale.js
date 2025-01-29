import BackOffice from "../components/BackOffice";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import dayjs from "dayjs";
import MyModal from "./MyModal";

function BillSale() {
    const [billSales, setBillSeles] = useState([]);
    const [billSaleDetail, setBillSelesDetail] = useState([]);
    const [sumPrice, setSumPrice] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + "/api/sale/list", config.headers());

            if (res.data.results !== undefined) {
                setBillSeles(res.data.results);
            }
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error",
            });
        }
    };

    const openModalInfo = async (item) => {
        try {
            const res = await axios.get(config.apiPath + "/api/sale/billInfo/" + item.id, config.headers());

            if (res.data.results !== undefined) {
                setBillSelesDetail(res.data.results);

                let mySumPrice = 0;
                for (let i = 0; i < res.data.results.length; i++) {
                    mySumPrice += parseInt(res.data.results[i].price);
                }

                setSumPrice(mySumPrice);
            }
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error",
            });
        }
    };

    const handlePay = async (item) => {
        try {
            const button = await Swal.fire({
                title: "ชำระเงิน",
                text: "",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true,
            });

            if (button.isConfirmed) {
                const res = await axios.get(config.apiPath + "/api/sale/updateStatusToPay/" + item.id, config.headers());

                if (res.data.message === "success") {
                    Swal.fire({
                        title: "save",
                        text: "save",
                        icon: "success",
                        timer: 1000,
                    });

                    fetchData();
                }
            }
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error",
            });
        }
    };

    const handleSend = async (item) => {
        try {
            const button = await Swal.fire({
                title: "ส่งแล้ว",
                text: "",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true,
            });

            if (button.isConfirmed) {
                const res = await axios.get(config.apiPath + "/api/sale/updateStatusToSend/" + item.id, config.headers());

                if (res.data.message === "success") {
                    Swal.fire({
                        title: "save",
                        text: "save",
                        icon: "success",
                        timer: 1000,
                    });

                    fetchData();
                }
            }
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error",
            });
        }
    };

    const handleCancel = async (item) => {
        try {
            const button = await Swal.fire({
                title: "ยกเลิก",
                text: "",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true,
            });

            if (button.isConfirmed) {
                const res = await axios.get(config.apiPath + "/api/sale/updateStatusToCancel/" + item.id, config.headers());

                if (res.data.message === "success") {
                    Swal.fire({
                        title: "save",
                        text: "save",
                        icon: "success",
                        timer: 1000,
                    });

                    fetchData();
                }
            }
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error",
            });
        }
    };

    // กรองข้อมูลตามค่าค้นหาและสถานะ
    const filteredBillSales = billSales.filter((item) => {
        const matchesSearch = item.order_id.includes(searchTerm) || item.fullname.includes(searchTerm);
        const matchesStatus = filterStatus === "all" || item.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <BackOffice>
            <div className="card">
                <div className="card-header">
                    <div className="card-title mt-4 mx-5">
                        <h5>รายงานยอดขาย</h5>
                        </div>
                    <div className="d-flex justify-content-between mt-3">
                        <input
                            type="text"
                            placeholder="ค้นหาชื่อลูกค้าหรือหมายเลขคำสั่งซื้อ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control w-50"
                        />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="form-control w-25"
                        >
                            <option value="all">ทั้งหมด</option>
                            <option value="open">รอตรวจสอบ</option>
                            <option value="complete">ชำระเงินแล้ว</option>
                            <option value="pending">ชำระเงินปลายทาง</option>
                            <option value="shiped">ส่งแล้ว</option>
                            <option value="cancel">ยกเลิก</option>
                        </select>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <th className="text-center">หมายเลขคำสั่งซื้อ</th>
                            <th className="text-center">ชื่อลูกค้า</th>
                            <th className="text-center">เบอร์โทร</th>
                            <th className="text-center">ที่อยู่</th>
                            <th className="text-center">วันที่</th>
                            <th className="text-center">เวลา</th>
                            <th className="text-center">สถานะสินค้า</th>
                            <th width="500px" className="text-center">จัดการสินค้า</th>
                        </thead>
                        <tbody>
                            {filteredBillSales.length > 0 ? filteredBillSales.map((item) => (
                                <tr key={item.id}>
                                    <td className="text-center">{item.order_id}</td>
                                    <td className="text-center">{item.fullname}</td>
                                    <td className="text-center">{item.phone}</td>
                                    <td className="text-center">{item.address}</td>
                                    <td className="text-center">{dayjs(item.createdAt).format("YYYY-MM-DD")}</td>
                                    <td className="text-center">{dayjs(item.createdAt).format("hh:mm A")}</td>
                                    <td className="text-center">
                                    {item.status === 'complete' ? 'ชำระเงินเสร็จสิ้น' : 
                                    item.status === 'shiped' ? 'จัดส่งแล้ว' : 
                                    item.status === 'cancel' ? 'ยกเลิก' :
                                    item.status === 'open' ? 'รอตรวจสอบการชำระเงิน' : 
                                    item.status === 'pending' ? 'รอชำระเงินปลายทาง' :
                                    item.status}
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-secondary mr-2 rounded-pill"
                                            data-toggle="modal"
                                            data-target="#modalInfo"
                                            onClick={(e) => openModalInfo(item)}
                                        >
                                            <i></i>รายการ
                                        </button>
                                        <button
                                            className="btn btn-secondary mr-2 rounded-pill"
                                            onClick={(e) => handlePay(item)}
                                        >
                                            <i></i>ชำเงินแล้ว
                                        </button>
                                        <button
                                            className="btn btn-secondary mr-2 rounded-pill"
                                            onClick={(e) => handleSend(item)}
                                        >
                                            <i></i>จัดส่งแล้ว
                                        </button>
                                        <button
                                            className="btn btn-secondary mr-2 rounded-pill"
                                            onClick={(e) => handleCancel(item)}
                                        >
                                            <i></i>ยกเลิก
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="8" className="text-center">ไม่พบข้อมูล</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <MyModal id="modalInfo" title="รายการ">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>รายการ</th>
                            <th className="text-right">รหัสสินค้า</th>
                            <th className="text-right">ราคา</th>
                            <th className="text-right">จำนวน</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billSaleDetail.length > 0 ? billSaleDetail.map((item) => (
                            <tr key={item.id}>
                                <td>{item.Product.name}</td>
                                <td className="text-right">{item.Product.id}</td>
                                <td className="text-right">{parseInt(item.price).toLocaleString("th-TH")}</td>
                                <td className="text-right">{item.qty}</td>
                            </tr>
                        )) : <></>}
                    </tbody>
                </table>
                <div>ราคารวม {sumPrice.toLocaleString("th-th")} บาท</div>
            </MyModal>
        </BackOffice>
    );
}

export default BillSale;