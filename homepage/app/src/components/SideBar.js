import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MenuBar from "./MenuBar";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  // เปิด Sidebar เมื่อเมาส์ชนขอบซ้าย
  const handleMouseMove = (event) => {
    if (event.clientX <= 1 && !isOpen) { // ถ้าเมาส์ชนขอบซ้าย 1px
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isOpen]);

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
    <>
      <div className="sidebar">
        <button className="custom-btn" onClick={toggleSidebar}>
          <div className="d-flex align-items-center justify-content-center top-layer ms-4" >
            <i className="bi bi-list fs-1 text-color"></i>
            <h4 className="mt-1 ms-2 text-color text-bold d-none d-md-block">เมนู</h4>
          </div>
        </button>
      </div>

      <div className={`sidebar-menu ${isOpen ? "open" : ""}`} ref={sidebarRef}>
        <div className="sidebar-content">
          <nav>
            <MenuBar />
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;
