import React from "react";

const Img = ({ className, src = "defaultNoData.png", alt = "testImg", ...restProps }) => {
    return <img className={`img-fluid ${className}`} src={src} alt={alt} {...restProps} loading="lazy" />;
};

export default Img;