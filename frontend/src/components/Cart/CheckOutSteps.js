import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import { MdOutlineLocalShipping } from "react-icons/md";
import { BsCheckCircleFill, BsCreditCard2Back } from "react-icons/bs";
import "./CheckOutSteps.css";

const CheckOutSteps = ({ activeStep }) => {
	const steps = [
		{ label: "Shipping Info", icon: <MdOutlineLocalShipping /> },
		{ label: "Confirm Order", icon: <BsCheckCircleFill /> },
		{ label: "Payment", icon: <BsCreditCard2Back /> },
	];

	const styleSteps = {
		boxSizing: "border-box",
		fontSize: "20px",
	};
	return (
		<div className='step-container'>
			<Stepper activeStep={activeStep} alternativeLabel style={styleSteps}>
				{steps.map((each, index) => (
					<Step
						key={index}
						active={activeStep === index}
						completed={activeStep >= index}
					>
						<StepLabel
							icon={each.icon}
							style={{
								color: activeStep >= index ? "#4caf50" : "#000",
							}}
						>
							{each.label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</div>
	);
};

export default CheckOutSteps;
