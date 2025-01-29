// import axios from "axios";
// import { useEffect, useState } from "react";
// import config from "../config";
// import Swal from "sweetalert2";
// import MyModal from "../components/MyModal";
// import dayjs from "dayjs";
// import HomePage from "../components/HomePage";
// import { Link } from "react-router-dom";

// function ProductMain() {
//     const [products, setProducts] = useState([]);
//     const [carts, setCarts] = useState([]);
//     const [recordInCarts, setRecordInCarts] = useState(0);
//     const [sumQty, setSumQty] = useState(0);
//     const [sumPrice, setSumPrice] = useState(0);
//     const [customerName, setCustomerName] = useState('');
//     const [customerPhone, setCustomerPhone] = useState('');
//     const [customerAddress, setCustomerAddress] = useState('');
//     const [payDate, setPayDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
//     const [payTime, setPayTime] = useState('');
    
//     useEffect(() => {
//         fetchData();
//         fetchDataFromLocal();
//     }, []);

    

//     const fetchData = async () => {
//         try {
//             const res = await axios.get(config.apiPath + '/product/list');
//             if (res.data.result !== undefined) {
//                 setProducts(res.data.result);
//             }
//         } catch (e) {
//             Swal.fire({
//                 title: 'error',
//                 text: e.message,
//                 icon: 'error'
//             })
            
//         }
//     }

//     function showImage(item) {
//         if (item.imgs && item.imgs.length > 0) {  
//             let imgPath = config.apiPath + '/uploads/' + item.imgs[0]; 
//             return <img className="card-img" height="150px" src={imgPath} alt="Product Image" />;
//         }
//         return <img className="card-img" height="150px" src="imgnot.jpg" alt="No image" />; 
//     }
//     const addToCart = (item) => {
//         let arr = carts;
//         if (arr === null) {
//             arr = [];
//         }
      
//         // เช็คว่ามีสินค้าชิ้นนี้ในตะกร้าแล้วหรือไม่
//         const existingItem = arr.find(cartItem => cartItem.id === item.id);
      
//         if (existingItem) {
//             // ถ้ามีแล้ว เพิ่มจำนวนสินค้า
//             existingItem.qty = (existingItem.qty || 1) + 1;
//         } else {
//             // ถ้ายังไม่มี ให้เพิ่มสินค้าชิ้นใหม่และตั้งจำนวนเป็น 1
//             arr.push({ ...item, qty: 1 });
//         }
      
//         setCarts(arr);
//         setRecordInCarts(arr.length);
      
//         localStorage.setItem('carts', JSON.stringify(arr));
      
//         fetchDataFromLocal();
//       }
//       const fetchDataFromLocal = () => {
//         const itemInCarts = JSON.parse(localStorage.getItem('carts'));
//         if (itemInCarts !== null) {
//             setCarts(itemInCarts);
//             setRecordInCarts(itemInCarts !== null ? itemInCarts.length : 0);
    
//             callculatePriceAndQty(itemInCarts);
//         }
    
//     }
//     const callculatePriceAndQty = (itemInCarts) => {
//         let sumQty = 0;
//         let sumPrice = 0;
    
//         for (let i = 0; i < itemInCarts.length; i++) {
//             const item = itemInCarts[i];
//             sumQty++;
//             sumPrice += parseInt(item.price);
//         }
//         setSumPrice(sumPrice);
//         setSumQty(sumQty);
//     }
    
    
//     return<HomePage>
//         <div className="container mt-3">
//             <div className="d-flex justify-content-center">
//                 <img
//                 className="banner px-4"
//                 src="banner.png"
//                 alt=""
//                 style={{ backgroundColor: "#C7D5E9", borderRadius: "50px" }}
//                 >
//                 </img>
//                 </div>
//                 <div className="d-flex justify-content-center mt-5">
//                     <div
//                         className="w-75 d-flex justify-content-center"
//                         style={{ backgroundColor: "#C7D5E9", borderRadius: "30px" }}
//                         >
//                         {/* กล่อง 1: โค้งเฉพาะด้านซ้าย */}
//                             <div
//                                 className="w-75 ms-2 my-2 d-le"
//                                 style={{
//                                 backgroundColor: "#FFF8DE",
//                                 borderTopLeftRadius: "30px",
//                                 borderBottomLeftRadius: "30px",
//                                 }}
//                             >
//                                 <h5 className="m-3 text-center">คิมหันตฤดู</h5>
//                             </div>
                            
//                             {/* กล่อง 2: ไม่มีขอบโค้ง */}
//                             <div
//                                 className="w-75 my-2 mx-1"
//                                 style={{
//                                 backgroundColor: "#C5D3E8",
//                                 }}
//                             >
//                                 <h5 className="m-3 text-center">เหมันตฤดู</h5>
//                             </div>
                            
//                             {/* กล่อง 3: โค้งเฉพาะด้านขวา */}
//                             <div
//                                 className="w-75 me-2 my-2"
//                                 style={{
//                                 backgroundColor: "#A6AEBF",
//                                 borderTopRightRadius: "30px",
//                                 borderBottomRightRadius: "30px",
//                                 }}
//                             >
//                                 <h5 className="m-3 text-center">วสันตฤดู</h5>
//                             </div>
//                         </div>                   
//                 </div>
                      
//             {/* <div className="float-end">
//                 ตะกร้าทดสอบ
//                 <button 
//                 data-bs-toggle="modal"
//                 data-bs-target="#modalCart"
//                 className="btn btn-outline-success ms-2 me-2">
//                     <i className="fa fa-shopping-cart me-2"></i>
//                     {recordInCarts}
//                 </button>
//                 ชิ้น
//             </div> */}
//             <div className="mt-5">
//                 <div className="clearfix">
//                     <h5>สินค้ามาใหม่</h5>
//                     </div>
//                 <div className="row">
//                 {products.length > 0 ? (
//                     products.map(item => (
//                         <div className="col-6 col-md-4 col-lg-2 mt-1 mb-3" key={item.id}>
//                             <div className="card" 
//                                 style={{ 
//                                     borderColor: "#D8BABD",
//                                     borderRadius: "15px" // ปรับขอบโค้ง
//                                   }}
//                             >
//                                 <Link 
//                                 to={`/productInfo/${item.id}`} 
//                                 // to="/productInfo"
//                                 style={{ textDecoration: 'none' }}>
//                                     <div>{showImage(item)}</div>
//                                     <div className="card-body" >
//                                         <h6 className="text-black">{item.name}</h6>
//                                         <h6 className="text-black"><strong>{item.price.toLocaleString('th-TH')} บาท</strong></h6> 
//                                     </div>
//                                 </Link>
//                                 <div className="text-end">
//                                 {item.stock > 0 ? ( // ตรวจสอบสต็อก
//                             <button
//                                 className="btn rounded-4"
//                                 style={{ backgroundColor: "#D8BABD" }}
//                                 onClick={e => addToCart(item)}>
//                                 <div className="d-flex"> 
//                                     <i className="bi bi-plus text-color fs-5"></i>
//                                     <i className="fa fa-shopping-cart text-color mt-2"></i>
//                                 </div>
//                             </button>
//                         ) : (
//                             <button
//                                 className="custom-btn m-2"
//                                 style={{ cursor: "not-allowed" }}
//                                 disabled>
//                                 <span className="text-danger">สินค้าหมด</span>
//                             </button>
//                         )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : <></>}
//                 </div>
//             </div>
           

//         </div>
//         {/* <MyModal id="modalCart" title="ตะกร้าสินค้า">
//             <table className="table table-bordered table-striped">
//                 <thead>
//                     <tr>
//                         <th>name</th>
//                         <th className="text-end">price</th>
//                         <th className="text-end">piece</th>
//                         <th width="60px"></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {carts.length > 0 ? carts.map(item =>
//                         <tr key={item.id}>
//                             <td>{item.name}</td>
//                             <td className="text-end">{item.price.toLocaleString('th-TH')}</td>
//                             <td className="text-end">1</td>
//                             <td className="text-center">
//                                 <button className="btn btn-danger" onClick={e => handleRemove(item)}>
//                                     <i className="fa fa-times"></i>
//                                 </button>
//                             </td>
//                         </tr>
//                     ): <></>}
//                 </tbody>
//             </table>
//             <div className="text-center">
//                     จำนวน {sumQty} ราคา {sumPrice}
//             </div>
//             <div className="mt-3">
//                 <div>
//                     <div>ชื่อ</div>
//                     <input className="form-control" onChange={e => setCustomerName(e.target.value)}></input>
//                 </div>
//                 <div className="mt-3">
//                     <div>เบอร์ติดต่อ</div>
//                     <input className="form-control" onChange={e => setCustomerPhone(e.target.value)}></input>
//                 </div>
//                 <div className="mt-3">
//                     <div>ที่อยู่</div>
//                     <input className="form-control" onChange={e => setCustomerAddress(e.target.value)}></input>
//                 </div>
//                 <div className="mt-3">
//                     <div>วันที่</div>
//                     <input className="form-control" type="date" value={payDate} onChange={e => setPayDate(e.target.value)}></input>
//                 </div>
//                 <div className="mt-3">
//                     <div>เวลา</div>
//                     <input className="form-control" onChange={e => setPayTime(e.target.value)}></input>
//                 </div>
//                 <button className="btn btn-primary mt-3" onClick={handleSave}>
//                     <i className="fa fa-check me-2"></i>ยืนยัน
//                 </button>
//             </div>
//         </MyModal> */}
//     </HomePage>
// }

// export default ProductMain;

import axios from "axios"; 
import { useEffect, useState } from "react";
import config from "../config";
import Swal from "sweetalert2";
import MyModal from "../components/MyModal";
import dayjs from "dayjs";
import HomePage from "../components/HomePage";
import { Link } from "react-router-dom";

function ProductMain() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [carts, setCarts] = useState([]);
    const [recordInCarts, setRecordInCarts] = useState(0);
    const [sumQty, setSumQty] = useState(0);
    const [sumPrice, setSumPrice] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [payDate, setPayDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [payTime, setPayTime] = useState('');
    const [selectedSeason, setSelectedSeason] = useState("เหมันตฤดู");
    

    const handleSelect = (season) => {
        setSelectedSeason(season);
        
        // กรองสินค้าตามฤดูกาลที่เลือก
        const filtered = products.filter(product => product.seasons.includes(season));
        setFilteredProducts(filtered);
    };
    

    useEffect(() => {
        fetchData();
        fetchDataFromLocal();
    }, []);

    useEffect(() => {
        const result = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(result);
    }, [searchQuery, products]);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/product/list');
            if (res.data.result !== undefined) {
                setProducts(res.data.result);
                setFilteredProducts(res.data.result);
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e.message,
                icon: 'error'
            });
        }
    }

    function showImage(item) {
        if (item.imgs && item.imgs.length > 0) {  
            let imgPath = config.apiPath + '/uploads/' + item.imgs[0]; 
            return <img className="card-img" height="150px" src={imgPath} alt="Product Image" />;
        }
        return <img className="card-img" height="150px" src="imgnot.jpg" alt="No image" />; 
    }

    const addToCart = (item) => {
        let arr = carts;
        if (arr === null) {
            arr = [];
        }
      
        const existingItem = arr.find(cartItem => cartItem.id === item.id);
      
        if (existingItem) {
            existingItem.qty = (existingItem.qty || 1) + 1;
        } else {
            arr.push({ ...item, qty: 1 });
        }
      
        setCarts(arr);
        setRecordInCarts(arr.length);
      
        localStorage.setItem('carts', JSON.stringify(arr));
        fetchDataFromLocal();
    }

    const fetchDataFromLocal = () => {
        const itemInCarts = JSON.parse(localStorage.getItem('carts'));
        if (itemInCarts !== null) {
            setCarts(itemInCarts);
            setRecordInCarts(itemInCarts !== null ? itemInCarts.length : 0);
            callculatePriceAndQty(itemInCarts);
        }
    }

    const callculatePriceAndQty = (itemInCarts) => {
        let sumQty = 0;
        let sumPrice = 0;
    
        for (let i = 0; i < itemInCarts.length; i++) {
            const item = itemInCarts[i];
            sumQty++;
            sumPrice += parseInt(item.price);
        }
        setSumPrice(sumPrice);
        setSumQty(sumQty);
    }

    const handleSearch = () => {
        const result = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(result);
    }

    return (
        <HomePage>
            <div className="container mt-3">
                <div className="d-flex justify-content-center">
                    <img
                    className="banner px-4"
                    src="banner.png"
                    alt=""
                    style={{ backgroundColor: "#C7D5E9", borderRadius: "50px" }}
                    />
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <div
                        className="w-75 d-flex justify-content-center"
                        style={{ backgroundColor: "#C7D5E9", borderRadius: "30px" }}
                    >
                        {/* กล่อง 1: โค้งเฉพาะด้านซ้าย */}
                        <div
                        onClick={() => handleSelect("คิมหันตฤดู")}
                        className={`w-75 ms-2 my-2 d-le ${selectedSeason === "คิมหันตฤดู" ? "bg-selected" : ""}`}
                        style={{
                            backgroundColor: "#FFF8DE",
                            borderTopLeftRadius: "30px",
                            borderBottomLeftRadius: "30px",
                            cursor: "pointer",
                            position: "relative", // ให้เส้นตกแต่งปรากฏได้
                        }}
                        >
                        <h5 className="m-3 text-center">คิมหันตฤดู</h5>
                        {/* เส้นตกแต่ง */}
                        <span
                            style={{
                            content: "''",
                            position: "absolute",
                            bottom: "-5px", // ขยับเส้นให้ต่ำลงจากข้อความ
                            left: "50%",
                            transform: selectedSeason === "คิมหันตฤดู" ? "translateX(-50%)" : "translateX(-50%) scaleX(0)", // สร้าง effect ให้เส้นหายไป
                            width: "80%", // ความยาวเส้น
                            height: "6px", // ความหนา
                            backgroundColor: selectedSeason === "คิมหันตฤดู" ? "#ccc" : "transparent", // สีเทา
                            borderRadius: "10px", // ขอบโค้ง
                            transition: "transform 0.3s ease, background-color 0.3s ease", // การเปลี่ยนแปลงของเส้น
                            transformOrigin: "center",
                            }}
                        ></span>
                        </div>

                        {/* กล่อง 2: ไม่มีขอบโค้ง */}
                        <div
                        onClick={() => handleSelect("เหมันตฤดู")}
                        className={`w-75 my-2 mx-1 ${selectedSeason === "เหมันตฤดู" ? "bg-selected" : ""}`}
                        style={{
                            backgroundColor: "#C5D3E8",
                            cursor: "pointer",
                            position: "relative", // ให้เส้นตกแต่งปรากฏได้
                        }}
                        >
                        <h5 className="m-3 text-center">เหมันตฤดู</h5>
                        {/* เส้นตกแต่ง */}
                        <span
                            style={{
                            content: "''",
                            position: "absolute",
                            bottom: "-5px",
                            left: "50%",
                            transform: selectedSeason === "เหมันตฤดู" ? "translateX(-50%)" : "translateX(-50%) scaleX(0)",
                            width: "80%",
                            height: "6px",
                            backgroundColor: selectedSeason === "เหมันตฤดู" ? "#ccc" : "transparent",
                            borderRadius: "10px",
                            transition: "transform 0.3s ease, background-color 0.3s ease",
                            transformOrigin: "center",
                            }}
                        ></span>
                        </div>

                        {/* กล่อง 3: โค้งเฉพาะด้านขวา */}
                        <div
                        onClick={() => handleSelect("วสันตฤดู")}
                        className={`w-75 me-2 my-2 ${selectedSeason === "วสันตฤดู" ? "bg-selected" : ""}`}
                        style={{
                            backgroundColor: "#A6AEBF",
                            borderTopRightRadius: "30px",
                            borderBottomRightRadius: "30px",
                            cursor: "pointer",
                            position: "relative", // ให้เส้นตกแต่งปรากฏได้
                        }}
                        >
                        <h5 className="m-3 text-center">วสันตฤดู</h5>
                        {/* เส้นตกแต่ง */}
                        <span
                            style={{
                            content: "''",
                            position: "absolute",
                            bottom: "-5px",
                            left: "50%",
                            transform: selectedSeason === "วสันตฤดู" ? "translateX(-50%)" : "translateX(-50%) scaleX(0)",
                            width: "80%",
                            height: "6px",
                            backgroundColor: selectedSeason === "วสันตฤดู" ? "#ccc" : "transparent",
                            borderRadius: "10px",
                            transition: "transform 0.3s ease, background-color 0.3s ease",
                            transformOrigin: "center",
                            }}
                        ></span>
                        </div>
                        </div>
                </div>
                {/* ช่องค้นหาสินค้า */}
                <div className="d-flex justify-content-center mt-5">
                    <input
                        type="text"
                        className="form-control w-75 form-control custom-placeholder rounded-pill"
                        placeholder="ค้นหาสินค้า"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                        <button
                            className="btn rounded-5 ms-2"
                            style={{ backgroundColor: "#5B166C"}} 
                        >
                            <span className="mx-3 mt-2 text-white">ค้นหา</span>
                        </button>
                    </div>
                    
                {/* แสดงสินค้า */}
                <div className="mt-5">
                    <div className="clearfix">
                        <h5>สินค้ามาใหม่</h5>
                    </div>
                    <div className="row">
                    {products.length > 0 ? (
                        products.map(item => (
                            <div className="col-6 col-md-4 col-lg-2 mt-1 mb-3" key={item.id}>
                                <div className="card" 
                                    style={{ 
                                        borderColor: "#D8BABD",
                                        borderRadius: "15px"
                                    }}
                                >
                                    <Link to={`/productInfo/${item.id}`} style={{ textDecoration: 'none' }}>
                                        <div>{showImage(item)}</div>
                                        <div className="card-body" >
                                            <h6 className="text-black">{item.name}</h6>
                                            <h6 className="text-black"><strong>{item.price.toLocaleString('th-TH')} บาท</strong></h6> 
                                        </div>
                                    </Link>
                                    <div className="text-end">
                                        {item.stock > 0 ? (
                                            <button
                                                className="btn rounded-4"
                                                style={{ backgroundColor: "#D8BABD" }}
                                                onClick={e => addToCart(item)}
                                            >
                                                <div className="d-flex"> 
                                                    <i className="bi bi-plus text-color fs-5"></i>
                                                    <i className="fa fa-shopping-cart text-color mt-2"></i>
                                                </div>
                                            </button>
                                        ) : (
                                            <button
                                                className="custom-btn m-2"
                                                style={{ cursor: "not-allowed" }}
                                                disabled
                                            >
                                                <span className="text-danger">สินค้าหมด</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : <></>}
                    </div>
                </div>
                <div className="mt-5">
                <div className="clearfix">
                    <h5>สินค้าตามฤดูกาล</h5>
                </div>
                <div className="row">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(item => (
                            <div className="col-6 col-md-4 col-lg-2 mt-1 mb-3" key={item.id}>
                                <div className="card" style={{ borderColor: "#D8BABD", borderRadius: "15px" }}>
                                    <Link to={`/productInfo/${item.id}`} style={{ textDecoration: 'none' }}>
                                        <div>{showImage(item)}</div>
                                        <div className="card-body">
                                            <h6 className="text-black">{item.name}</h6>
                                            <h6 className="text-black"><strong>{item.price.toLocaleString('th-TH')} บาท</strong></h6>
                                        </div>
                                    </Link>
                                    <div className="text-end">
                                        {item.stock > 0 ? (
                                            <button
                                                className="btn rounded-4"
                                                style={{ backgroundColor: "#D8BABD" }}
                                                onClick={e => addToCart(item)}
                                            >
                                                <div className="d-flex">
                                                    <i className="bi bi-plus text-color fs-5"></i>
                                                    <i className="fa fa-shopping-cart text-color mt-2"></i>
                                                </div>
                                            </button>
                                        ) : (
                                            <button
                                                className="custom-btn m-2"
                                                style={{ cursor: "not-allowed" }}
                                                disabled
                                            >
                                                <span className="text-danger">สินค้าหมด</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>ไม่มีสินค้าตามฤดูกาลนี้</p>  // ถ้าไม่มีสินค้าก็แสดงข้อความนี้
                    )}
                </div>
            </div>

            </div>
        </HomePage>
    );
}

export default ProductMain;
