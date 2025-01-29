import React, { useState } from "react";
import HomePage from "../components/HomePage";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react"; // นำเข้า useEffect จาก react
import { useLocation } from "react-router-dom"; // ใช้ useLocation จาก react-router-dom
import config from "../config";
import Swal from "sweetalert2";
import ReactSelect from 'react-select';

function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const location = useLocation(); 
  const { carts, sumPrice, sumQty } = location.state || {};
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selected, setSelected] = useState("QR Promptpay"); // สถานะเริ่มต้น
  const [userAddresses, setUserAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const stripePromise = loadStripe("pk_test_51Qc3PWP8f6nZH2rwdJlAtC53Ck5G1EIXGT9ePpaxmWaHUzmWs7DmvODxzWmSCyUigDOwS5QCbZoCpSAuib6g7log00JbXf5hjH");

  useEffect(() => {
    console.log("ตะกร้า", carts, "ราคารวม", sumPrice, sumQty);
    fetchData();
  }, [carts, sumPrice, sumQty]);

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + "/user/customer/info", config.headers());
      if (res.data.result) {
        setUser(res.data.result);
        setFirstName(res.data.result.firstName);
        setLastName(res.data.result.lastName);
        setPhone(res.data.result.phone);
        setName(res.data.result.firstName + " " + res.data.result.lastName);

        const addressRes = await axios.get(
          `${config.apiPath}/api/sale/address/list/${res.data.result.id}`,
          config.headers()
        );
        if (addressRes.data.results) {
          setUserAddresses(addressRes.data.results);
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const placeOrder = async (order) => {
    try {
      const requestData = {
        product: {
          name: "carts",
          price: sumPrice,
          quantity: 1,
        },
        information: {
          name: order.name,
          address: order.address,
          phone: order.phone,
        },
        paymentMethod: selected,
        carts: carts.map((item) => ({ id: item.id, qty: item.qty })),
        userId: user.id,
      };

      if (selected === "ชำระเงินปลายทาง") {
        const response = await axios.post(config.apiPath + "/api/sale/checkout-cod", requestData);
        window.location.href = response.data.successUrl; // Redirect ไปหน้า success
      } else {
        const response = await axios.post(config.apiPath + "/api/sale/checkout", requestData);

        if (!response || !response.data || !response.data.id) {
          throw new Error("Invalid response data: Missing session ID");
        }

        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
          sessionId: response.data.id,
        });

        if (result.error) {
          console.error("Stripe redirection error:", result.error.message);
          alert("There was an issue redirecting to the payment page. Please try again.");
        }
      }
    } catch (error) {
      console.log("Error during checkout:", error);
      alert("An error occurred while placing your order. Please try again later.");
    }
  };

  const handleCheckout = async () => {
    if (!name || !address) {
      alert("Please fill out both the name and address fields.");
      return;
    }
    await placeOrder({ name, phone, address });
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSelect = (method) => {
    setSelected(method);
  };

  const showImage = (item) => {
    if (item.imgs && item.imgs.length > 0) {
      let imgPath = config.apiPath + "/uploads/" + item.imgs[0];
      return <img className="rounded-4" height="80px" width="80px" src={imgPath} alt="Product" />;
    }
    return <img className="rounded-4" height="100px" src="imgnot.jpg" alt="No image" />;
  };
  
   

  // const stripePromise = loadStripe('pk_test_51Qc3PWP8f6nZH2rwdJlAtC53Ck5G1EIXGT9ePpaxmWaHUzmWs7DmvODxzWmSCyUigDOwS5QCbZoCpSAuib6g7log00JbXf5hjH');

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress.value); // การเลือกที่อยู่
  };

  const handlePhoneSelect = (selectedPhone) => {
    setPhone(selectedPhone.value); // การเลือกเบอร์โทร
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    // ลบตัวอักษรที่ไม่ใช่ตัวเลขออก
    const onlyNumbers = input.replace(/\D/g, "");
    // จัดรูปแบบเบอร์โทร
    const formattedNumber = onlyNumbers.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    setPhone(formattedNumber);
  };

  useEffect(() => {
    console.log("ตะกร้า",carts, "ราคารวม",sumPrice, sumQty); 
    fetchData();
  }, [carts, sumPrice, sumQty]);

  //   const fetchData = async () => {
  //   try {
  //     // เรียก API /info เพื่อดึงข้อมูลผู้ใช้
  //     const res = await axios.get(config.apiPath + "/user/customer/info", config.headers());
  //     if (res.data.result) {
  //       setUser(res.data.result);
  //       setFirstName(res.data.result.firstName);
  //       setLastName(res.data.result.lastName);
  //       setPhone(res.data.result.phone);
  //       setName(res.data.result.firstName + " " + res.data.result.lastName);

  //       // หลังจากได้ข้อมูล id แล้ว ให้เรียก API /address/list/:userCustomerId โดยใช้ id ที่ได้จาก /info
  //       const addressRes = await axios.get(`${config.apiPath}/api/sale/address/list/${res.data.result.id}`, config.headers());
  //       if (addressRes.data.results) {
  //         setUserAddresses(addressRes.data.results); // เก็บข้อมูลที่อยู่
  //       }
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       title: "Error",
  //       text: error.message,
  //       icon: "error",
  //     });
  //   }
  // };

  // const handleAddressSelect = (selectedAddress) => {
  //   setAddress(selectedAddress); // กำหนดให้เลือกที่อยู่
  // };
  
  // const placeOrder = async (order) => {
  //   try {
  //     const requestData = {
  //       product: {
  //         name: "test",
  //         price: sumPrice,
  //         quantity: 1,
  //       },
  //       information: {
  //         name: order.name,
  //         address: order.address,
  //       },
  //     };

  //     // เรียก API เพื่อสร้าง session สำหรับ checkout
  //     const response = await axios.post(config.apiPath + '/api/sale/checkout', requestData);

      
  //     // ตรวจสอบว่า response มีข้อมูลหรือไม่
  //     if (!response || !response.data || !response.data.id) {
  //       throw new Error("Invalid response data: Missing session ID");
  //     }

  //     // ใช้ loadStripe เพื่อ redirect ไปยัง Stripe Checkout
  //     const stripe = await stripePromise;

  //     const result = await stripe.redirectToCheckout({
  //       sessionId: response.data.id, // ใช้ session.id จาก API response
  //     });

  //     if (result.error) {
  //       console.error("Stripe redirection error:", result.error.message);
  //       alert("There was an issue redirecting to the payment page. Please try again.");
  //     }
  //   } catch (error) {
  //     console.log("Error during checkout:", error);
  //     alert("An error occurred while placing your order. Please try again later.");
  //   }
  // };
  

  // const placeOrder = async (order) => {
  //   try {
  //     const requestData = {
  //       product: {
  //         name: "carts",
  //         price: sumPrice,
  //         quantity: 1,
  //       },
  //       information: {
  //         name: order.name,
  //         address: order.address,
  //         phone: order.phone
  //       },
  //       paymentMethod: selected, // ส่ง payment method ที่เลือกไปด้วย
  //       carts: carts.map((item) => ({ id: item.id, qty: item.qty })),
  //       userId: user.id,
  //     };
  
  //     const response = await axios.post(config.apiPath + '/api/sale/checkout', requestData);
      
  
  //     if (!response || !response.data || !response.data.id) {
  //       throw new Error("Invalid response data: Missing session ID");
  //     }

  //     const stripe = await stripePromise;
  
  //     const result = await stripe.redirectToCheckout({
  //       sessionId: response.data.id, 
  //     });
  
  //     if (result.error) {
  //       console.error("Stripe redirection error:", result.error.message);
  //       alert("There was an issue redirecting to the payment page. Please try again.");
  //     }
  //   } catch (error) {
  //     console.log("Error during checkout:", error);
  //     alert("An error occurred while placing your order. Please try again later.");
  //   }
  // };

  // const handleCheckout = async () => {
  //   if (!name || !address) {
  //     alert("Please fill out both the name and address fields.");
  //     return;
  //   }
  //   await placeOrder({ name, phone, address });
    
  // };

  // const toggleEditing = () => {
  //   setIsEditing(!isEditing); // สลับโหมดระหว่าง `select` และ `input`
  // };

  // function showImage(item) {
  //   if (item.imgs && item.imgs.length > 0) {  
  //       let imgPath = config.apiPath + '/uploads/' + item.imgs[0]; 
  //       return <img className=" rounded-4" height="80px" width="80px" src={imgPath} alt="Product Image" />;
  //   }
  //   return <img className=" rounded-4" height="100px" src="imgnot.jpg" alt="No image" />; 
  // }

    // const handleSelect = (method) => {
    //     setSelected(method);
    // };

  return (
    <HomePage>
        <div className="container ">
            <div className="d-flex justify-content-center">
                <div className="card" style={{ borderRadius: "30px", padding: "20px", width: "80%", maxWidth: "1200px", height: "260px", borderColor: "#D8BABD" }}>
                    <h5 className="ms-4">ที่อยู่ในการจัดส่ง</h5>
                    <div className="mb-3" style={{ display: "flex", height: "100%", alignItems: "center" }}>
                        {/* คอลัมน์ที่ 1 */}
                        <div  style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                        {isEditing ? (
                          <div>
                            {/* ช่อง input สำหรับแก้ไขชื่อ */}
                            <div className="d-flex">
                              <span className="mt-3 mx-4 text-black">ชื่อ : </span>
                              <input
                                type="text"
                                name="fullname"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="ชื่อ นามสกุล"
                                style={{
                                  border: "1px solid #ccc",
                                  borderRadius: "30px",
                                  padding: "10px",
                                  outline: "none",
                                }}
                              />
                            </div>
                            <div className="d-flex">
                              <span className="mt-3 mx-2 text-black">โทรศัพท์ :</span>
                              <input
                                type="text"
                                value={phone}
                                onChange={handleInputChange}
                                placeholder=""
                                className="mt-2"
                                style={{
                                  border: "1px solid #ccc",
                                  borderRadius: "30px",
                                  padding: "10px",
                                  width: "200px",
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            {/* <h6 className="text-black mt-3">
                              {firstName} {lastName}
                            </h6> */}
                            <div className="d-flex">
                              <span className="mt-3 mx-4 text-black">ชื่อ :</span>
                            <input
                                type="text"
                                name="fullname"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="ชื่อ นามสกุล"
                                style={{
                                  border: "1px solid #ccc",
                                  borderRadius: "30px",
                                  padding: "10px",
                                  outline: "none",
                                  height: "45px"
                                }}
                              />
                            </div>
                            
                            <span className="text-black d-flex">
                            <span className="mt-3 mx-2 text-black">โทรศัพท์ : </span>
                              {/* ส่วนของ select เบอร์โทร */}
                              <ReactSelect className="mt-2"
                                options={userAddresses.map((item) => ({
                                  value: item.phone, label: item.phone
                                }))}
                                onChange={handlePhoneSelect}
                                value={phone && { value: phone, label: phone }}
                                placeholder="ค้นหา"
                                styles={{
                                  container: (provided) => ({
                                    ...provided,
                                    width: '200px',
                                    borderRadius: '30px',
                                  }),
                                  control: (provided) => ({
                                    ...provided,
                                    borderRadius: '30px',
                                    border: '1px solid #ccc',
                                    height: "45px"
                                  }),
                                }}
                              />
                            </span>
                          </div>
                        )}
                      </div>

                      {/* เส้นแบ่งแนวตั้ง */}
                      <div style={{
                        width: "1px",
                        backgroundColor: "#D8BABD",
                        height: "100%",
                      }}></div>

                      {/* คอลัมน์ที่ 2 */}
                      <div style={{ flex: 1, padding: "10px", textAlign: "center", marginRight: "60px" }}>
                        {/* ส่วนของการเลือกที่อยู่ */}
                        {isEditing ? (
                          <div>
                            <div className="d-flex justify-content-start mb-1">                            
                              <span className="mt-2 mx-4 text-black">ที่อยู่ : </span>
                              </div>
                            <textarea
                            type="text"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder=""
                            className="w-100"
                            style={{
                              height: "100px",
                              border: "1px solid #ccc",
                              borderRadius: "30px",
                              padding: "10px",
                              outline: "none",
                              resize: "none",
                            }}
                          />
                          </div>
                          
                          
                        ) : (
                          <span className="text-black d-flex justify-content-center">
                            <span className="mt-2 mx-4 text-black">ที่อยู่</span>
                            <ReactSelect
                              options={userAddresses.map((item) => ({
                                value: item.address, label: item.address
                              }))}
                              onChange={handleAddressSelect}
                              value={address && { value: address, label: address }}
                              placeholder="ค้นหา"
                              styles={{
                                container: (provided) => ({
                                  ...provided,
                                  width: '200px',
                                  borderRadius: '30px',
                                }),
                                control: (provided) => ({
                                  ...provided,
                                  borderRadius: '30px',
                                  border: '1px solid #ccc',
                                  height: "45px"
                                }),
                              }}
                            />
                          </span>
                        )}
                      </div>

                      {/* เส้นแบ่งแนวตั้ง */}
                      <div style={{
                        width: "1px",
                        backgroundColor: "#D8BABD",
                        height: "100%",
                      }}></div>

                      {/* คอลัมน์ที่ 3 */}
                      <div style={{ flex: 1, textAlign: "center" }}>
                        <button
                          onClick={toggleEditing}
                          className="custom-btn"
                        >
                          {address || phone ? 'แก้ไข' : isEditing ? 'บันทึก' : 'เพิ่ม'}
                        </button>
                      </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <div className="card" style={{ borderRadius: "30px", width: "80%", maxWidth: "1200px", borderColor: "#D8BABD" }}>
                {carts.length > 0 ? (
                          <>
                              {/* ตารางสินค้า */}
                              <table className="table borderless">
                                  <thead>
                                      <tr>
                                          <th scope="col"></th>
                                          <th scope="col" className="text-center"><h6>ราคาต่อหน่วย</h6></th>
                                          <th scope="col" className="text-center"><h6>จำนวน</h6></th>
                                          <th scope="col" className="text-center"><h6>ราคาต่อรวม</h6></th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {carts.map(item => (
                                          <tr key={item.id}>
                                              <td className="d-flex align-items-center ms-5">
                                                  {showImage(item)}
                                                  <div className="text-wrap overflow-hidden ps-3">
                                                      <h5
                                                          className="text-truncate text-black"
                                                          data-bs-toggle="tooltip"
                                                          title={item.name}
                                                      >
                                                          {item.name}
                                                      </h5>
                                                      <span className="text-black">คลัง {item.stock} ชิ้น</span>
                                                  </div>
                                              </td>
                                              <td className="text-center">
                                                  <h5 className="text-black mt-4">{item.price.toLocaleString('th-TH')} ฿</h5>
                                              </td>
                                              <td className="text-center">
                                                  <h5 className="text-black mt-4">{item.qty}</h5>
                                              </td>
                                              <td className="text-center">
                                                  <h5 className="text-black mt-4">{(item.price * item.qty).toLocaleString('th-TH')} ฿</h5>
                                              </td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>

                              {/* เส้นแบ่ง */}
                              <div className="mt-5" style={{ borderTop: "1px solid #D8BABD", width: "90%", margin: "auto" }}></div>

                              {/* รวมราคา */}
                              <div className="d-flex justify-content-end">
                                  <div className="m-5 d-flex">
                                      <h3 className="text-black">{sumPrice.toLocaleString('th-TH')}.00</h3>
                                      <h3 className="mx-4 text-black">฿</h3>
                                  </div>
                              </div>
                          </>
                      ) : (
                          <div className="text-center m-5">
                              <i className="bi bi-cart-x fs-1 text-secondary"></i>
                              <h6 className="mt-3 text-secondary text-black">ไม่มีสินค้าในตะกร้า</h6>
                          </div>
                      )}
                    
                </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <div className="card" style={{ borderRadius: "30px", padding: "20px", width: "80%", maxWidth: "1200px", borderColor: "#D8BABD" }}>               
                  <div className="d-flex justify-content-between">
                    <h5 className="ms-4">วิธีชำระเงิน</h5>
                      <div className="d-flex mx-4">
                          {["QR Promptpay", "Credit/Debit Card", "ชำระเงินปลายทาง"].map((method) => (
                            <button
                              key={method}
                              onClick={() => handleSelect(method)}
                              className="ms-4 position-relative"
                              style={{
                                backgroundColor: "transparent", // ไม่มีสีพื้นหลัง
                                color: "#000", // ข้อความสีดำ
                                border: "none", // ลบเส้นกรอบ
                                fontWeight: "bold", // ข้อความหนา
                                fontSize: "1rem", // ขนาดตัวอักษร
                                cursor: "pointer", // เปลี่ยนเป็นรูปมือเมื่อ hover
                              }}
                            >
                              {method}
                              {/* เส้นตกแต่ง */}
                              <span
                                style={{
                                  content: "''",
                                  position: "absolute",
                                  bottom: "-5px",
                                  left: "50%",
                                  transform: selected === method ? "translateX(-50%)" : "translateX(-50%) scaleX(0)",
                                  width: "80%", // ความยาวเส้น
                                  height: "6px", // ความหนา
                                  backgroundColor: selected === method ? "#ccc" : "transparent", // สีเทา
                                  borderRadius: "10px", // ขอบโค้ง
                                  transition: "transform 0.3s ease, background-color 0.3s ease", // เพิ่ม transition
                                  transformOrigin: "center",
                                }}
                              ></span>
                            </button>
                          ))}
                    </div>                
                  </div>
                  <div className="d-flex justify-content-end mx-4 mt-3">
                    <div>
                      <div className="d-flex justify-content-between"><p className="mx-1 text-black">รวมการสั่งซื้อ</p><p className="mx-1 text-black">{sumPrice}</p><p className="mx-1 text-black">฿</p></div>
                      <div className="d-flex justify-content-between"><p className="mx-1 text-black">ค่าส่ง</p><p className="mx-1 ms-5 text-black">40</p><p className="mx-1 text-black">฿</p></div>
                      <div className="d-flex justify-content-between"><p className="mx-1 text-black">ส่วนลดค่าส่ง</p><p className="mx-1 text-black">-40</p><p className="mx-1 text-black">฿</p></div>
                      <div className="d-flex justify-content-between mt-3"><h5 className="mx-1 text-black">ยอดชำระเงินทั้งหมด</h5><h5 className="mx-1 text-black">{sumPrice}</h5><h5 className="mx-1 text-black">฿</h5></div>
                    </div> 
                  </div>
                  <div className="d-flex justify-content-end mx-4 mt-3">
                    <button className="custom-btn mt-2"><p>ยกเลิก</p></button>
                    <button 
                      onClick={handleCheckout}
                      className="btn ms-3 rounded-pill" style={{backgroundColor: "#5B166C"}}>
                        <p className="mt-1 m-2 text-white">ชำระเงิน</p>
                      </button>
                    </div>
                </div>
            </div>
        </div>
        

      {/* <div className="container w-50">
        <h1>Checkout</h1>
        <div>
          <div>Name</div>
          <input
            type="text"
            name="fullname"
            value={name}
            onChange={(e) => setName(e.target.value)} // อัปเดต state name
          />
        </div>
        <div>
          <div>Address</div>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)} // อัปเดต state address
          />
        </div>
        <button id="checkout" onClick={handleCheckout}>
          Checkout
        </button>
      </div> */}
    </HomePage>
  );
}


export default Checkout;
