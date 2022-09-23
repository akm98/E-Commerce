import { BsArrowLeft } from "react-icons/bs";
import React from "react";
export const NextArrow = (props) => {
	const { className, style, onClick } = props;
	return <div className={className} style={{ ...style }} onClick={onClick} />;
};

export const PrevArrow = (props) => {
	const { className, style, onClick } = props;
	return <div className={className} style={{ ...style }} onClick={onClick} />;
};
