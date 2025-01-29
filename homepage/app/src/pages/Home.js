import { Link } from "react-router-dom";
import HomePage from "../components/HomePage";

function Home() {
  return (
    <HomePage>
      <div className="container position-relative">
        {/* Section 1: สามฤดู */}
          <div className="row mb-4">
            <div>
              <div className="position-relative" style={{ marginTop: '270px' }}>
                <h1 className="ms-5">สามฤดู</h1>
                <div className="d-flex">
                  <h5 className="w-50 text-gray">
                    นำเสนอผลไม้แปรรูปจากผลไม้ตามฤดูกาลสามฤดู ได้แก่ ฤดูร้อน ฤดูฝนและฤดูหนาว
                    ด้วยการคัดสรรคุณภาพเพื่อรักษาคุณค่าทางโภชนาการและรสชาติให้คงอยู่
                    พร้อมให้ข้อมูลเพื่อช่วยให้ผู้บริโภคเลือกผลไม้แปรรูปที่ดีที่สุดสำหรับสุขภาพในแต่ละฤดูกาล
                  </h5>
                </div>
              </div>
              <div className="d-flex justify-content-start p-3">
                <Link to='/productMain' className="nav-link">
                  <button
                        className="btn rounded-4"
                        style={{ backgroundColor: "#FFF5F6", borderColor: '#D8BABD' }} //D8BABD
                        >
                        <h5 className="mt-2 mx-4">
                          สั่งซื้อเลย
                        </h5>    
                    </button>
                    <img
                    src="arrowLink.png" 
                    className="ms-4"
                    alt=""
                    >
                    </img>
                </Link>  
              </div>
            </div>
          </div>
          {/* รูปภาพอยู่นอก container */}
          <div className="position-absolute" style={{ top: '-50px', right: '-500px', zIndex: 1 }}>
            <img
              src="compofruit 1.png"
              alt="Fruit Image"
              style={{ height: 'auto', width: '1000px' }}
            />
          </div>  
      </div>
          {/* Section 2: คิมหันตฤดู */}
          <div className="row" style={{ marginTop: '300px', backgroundColor: "#FFF8DE", paddingTop: "70px", paddingBottom: "650px" }}>
            <div className="container position-relative">
            <div className="">
              <div className="d-flex justify-content-end align-item-center" style={{ marginRight: '400px' }}>
                  <img
                    src="sunny.png"
                    alt="Fruit Image"
                    style={{ height: 'auto', width: '300px' }}
                  />
                <h1 className="" style={{ marginTop: '100px', marginLeft: "400px" }}>คิมหันตฤดู</h1>
              </div>
              <div className="" style={{  paddingLeft: '500px' }}> 
                <h5 className="text-gray" >
                  ฤดูที่มีอากาศร้อนจัด เหมาะสำหรับผลไม้ที่ให้ความสดชื่นและมีน้ำมาก เช่น
                  มะม่วง สับปะรด และแตงโม ซึ่งช่วยเติมความชุ่มชื้นให้ร่างกายและให้พลังงาน
                </h5>
              </div>
              <div className="position-absolute" style={{ right: '10px', top: '400px', zIndex: 1 }}>
            <img
              src="18.png"
              alt="Fruit Image"
              style={{ height: 'auto', width: '1100px' }}
            />
          </div>  
            </div>
          </div>
        </div>
        
        {/* Section 3: เหมันตฤดู */}
        <div className="row" style={{ backgroundColor: "#C5D3E8", paddingTop: "100px", paddingBottom: "400px" }}>
            <div className="container position-relative">
            <div className="">
              <div className="d-flex justify-content-end align-item-center" style={{ marginRight: '200px' }}>
                <h1 className="" style={{ marginTop: '100px', marginRight: "900px" }}>เหมันตฤดู</h1>
                  <img
                    src="winter.png"
                    alt="Fruit Image"
                    style={{ height: 'auto', width: '300px' }}
                  />
                
              </div>
             
              <div className="position-absolute d-flex" style={{ top: '200px', zIndex: 1 }}>
                <img
                  src="17.png"
                  alt="Fruit Image"
                  style={{ height: 'auto', width: '750px' }}
                  /></div>

                <div className="" style={{  paddingLeft: '800px', paddingTop: "200px", marginRight: "100px"}}> 
                    <h5 className="text-gray" >
                    ฤดูหนาว เหมาะสำหรับผลไม้ที่ช่วยให้ร่างกาย
                    อบอุ่นและมีสารอาหารบำรุงร่างกาย เช่น แอปเปิล ส้ม และกีวีซึ่งเต็มไปด้วยวิตามินซีที่ช่วยเสริมสร้าง
                    ภูมิคุ้มกันในช่วงที่อากาศเย็นและการเจ็บป่วยต่างๆ
                      </h5>
                  
              </div>  
            </div>
          </div>
        </div>

        
          {/* Section 4: วสันตฤดู */}
           <div className="row" style={{ backgroundColor: "#A6AEBF", paddingTop: "70px", paddingBottom: "400px",  borderBottomLeftRadius: "100px" }}>
            <div className="container position-relative">
            <div className="">
              <div className="d-flex justify-content-end align-item-center" style={{ marginRight: '400px' }}>
                  <img
                    src="rainy.png"
                    alt="Fruit Image"
                    style={{ height: 'auto', width: '300px' }}
                  />
                <h1 className="" style={{ marginTop: '100px', marginLeft: "400px" }}>วสันตฤดู</h1>
              </div>
              <div className="w-50" style={{  paddingLeft: '500px', paddingTop: "200px" }}> 
                <h5 className="text-gray" >
                  ฤดูที่มีฝนตกหนักและอากาศชื้น เหมาะสำหรับผลไม้ที่มีคุณสมบัติช่วยเสริมภูมิคุ้มกัน
                  และต้านทานโรค เช่น ลิ้นจี่ ขนุน และทับทิม ซึ่งมีสารต้านอนุมูลอิสระและวิตามินที่ช่วย
                  เสริมสร้างความแข็งแรงให้ร่างกาย
                </h5>
              </div>
              <div className="position-absolute" style={{ right: '-250px', top: '200px', zIndex: 1 }}>
            <img
              src="19.png"
              alt="Fruit Image"
              style={{ height: 'auto', width: '900px' }}
            />
          </div>  
            </div>
          </div>
        </div>
    </HomePage>
  );
}

export default Home;
