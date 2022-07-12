export const NextArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", background: "red" }}
			onClick={onClick}
		/>
	);
};

export const PrevArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", background: "green" }}
			onClick={onClick}
		/>
	);
};
