import React, { useEffect } from "react";
import "./ForgotPassword.css";

import { HiOutlineMail } from "react-icons/hi";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { resetUserPassword } from "../../redux/actions/userActions";

import Loader from "../Loader/Loader";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");

	const { resetData, error, loading } = useSelector(
		(state) => state.resetPassword
	);

	const alert = useAlert();
	const dispatch = useDispatch();

	useEffect(() => {
		if (resetData && resetData.success) {
			alert.success(resetData.message);
		}
		if (error) {
			alert.error(error);
		}
	}, [resetData, error]);

	const handleReset = (e) => {
		e.preventDefault();
		dispatch(resetUserPassword(email));
	};

	return (
		<div className='update-container'>
			<div className='update-form'>
				<h3>Enter your email for reset password link</h3>
				<form className='user-form' onSubmit={handleReset}>
					<div className='update-email'>
						<HiOutlineMail />
						<input
							type='email'
							placeholder='Email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<input
						type='submit'
						className='btn-reset'
						value='Send reset password link'
					/>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
