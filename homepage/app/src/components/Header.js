import React from "react";
import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import MenuBar from "./MenuBar";


function Header({ title }) {
  
  const [headerTitle, setHeaderTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null)

  useEffect(() => {
    setHeaderTitle(title || 'สามฤดู'); 
  }, [title]);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setIsOpen(false); 
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);


  return (
    <div className="d-flex align-item-center p-3">
      <div>
        <button className="custom-btn mt-2 ms-5" onClick={toggleSidebar}>
          <div className="d-flex align-items-center justify-content-center">
            <i className="bi bi-list fs-1 text-color"></i>
            <h4 className="mt-1 ms-2 text-color text-bold d-none d-md-block">เมนู</h4>
          </div>
        </button>
      </div>

      <div className={`sidebar-menu ${isOpen ? "open" : ""}`} ref={sidebarRef}>
        <div className="sidebar-content">
          <nav>
            <MenuBar></MenuBar>
          </nav>
        </div>
      </div>
      <div className="container p-3 w-75">
      <div className="row">
        <div className="col-8 col-md-9 col-lg-10">
          <div className="rounded">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center">           
              <Link to={-1} className="nav-link">
                <button className="custom-btn">
                  <h5 className="text-color mb-2 mb-md-0">ย้อนกลับ</h5>
                </button>
              </Link>
              {headerTitle === "สามฤดู" ? (
                <Link to="/" className="nav-link">
                  <h3 className="text-color text-bold mb-2 mb-md-0">{headerTitle}</h3>
                </Link>
              ) : (
                <h3 className="text-color text-bold mb-2 mb-md-0">{headerTitle}</h3>
              )}
              <Link to="/cart" className="nav-link">
                <button style={{ borderColor: "#D8BABD", borderRadius: "15px" }} className="btn">                           
                  <i className="bi bi-cart fs-4 text-color"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Header;
