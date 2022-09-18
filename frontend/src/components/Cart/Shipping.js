import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/actions/cartActions";
import { Country, State, City } from "country-state-city";
import { useAlert } from "react-alert";
import MetaData from "../Header/MetaData";
import { BiHome, BiPhone, BiCurrentLocation } from "react-icons/bi";
import { BsFillPinMapFill } from "react-icons/bs";
import CheckOutSteps from "./CheckOutSteps";
import { useNavigate } from "react-router-dom";
import "./Shipping.css";
const Shipping = () => {
	const { shippingInfo } = useSelector((state) => state.cart);

	const [address, setAddress] = useState(shippingInfo.address);
	const [shippingState, setShippingState] = useState(
		shippingInfo.shippingState
	);
	const [city, setCity] = useState(shippingInfo.city);
	const [phone, setPhone] = useState(shippingInfo.phone);
	const [pincode, setPincode] = useState(shippingInfo.pincode);

	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const shippingSubmit = (e) => {
		e.preventDefault();
		if (phone.length > 10 || phone.length < 10) {
			alert.error("Please enter a valid phone number");
			return;
		}
		if (pincode.length > 6 || pincode.length < 6) {
			alert.error("Please enter a valid pincode");
			return;
		}
		dispatch(
			saveShippingInfo({
				address,
				shippingState,
				city,
				phone,
				pincode,
			})
		);
		navigate("/order/confirm");
	};

	return (
		<>
			<MetaData title='Shipping Details' />
			<CheckOutSteps activeStep={1} />
			<div className='shipping-container'>
				<div className='shipping-box'>
					<h3 className='shipping-heading'>Shipping Details</h3>
					<form
						className='shipping-form'
						encType='multipart/form-data'
						onSubmit={shippingSubmit}
					>
						<div>
							<BiHome />
							<input
								type='text'
								placeholder='Enter shipping address'
								required
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
						<div>
							<BiCurrentLocation />
							<input
								type='text'
								placeholder='Enter city'
								required
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</div>
						<div>
							<BsFillPinMapFill />
							<input
								type='number'
								placeholder='Enter pincode'
								required
								value={pincode}
								onChange={(e) => setPincode(e.target.value)}
								size='6'
							/>
						</div>
						<div>
							<BiPhone />
							<input
								type='number'
								placeholder='Enter phone number'
								required
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								size='10'
							/>
						</div>
						<div className='state-dropdown'>
							<BiPhone />
							<select
								required
								value={shippingState}
								onChange={(e) => setShippingState(e.target.value)}
							>
								<option value={""}>Select State</option>
								{State &&
									State.getStatesOfCountry("IN").map((each) => (
										<option
											key={each.isoCode}
											value={each.isoCode}
											selected={true}
										>
											{each.name}
										</option>
									))}
							</select>
						</div>
						<div>
							<input
								type='submit'
								className={shippingState ? "btn-continue" : "btn-disabled"}
								value='Continue'
								disabled={!shippingState}
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Shipping;
