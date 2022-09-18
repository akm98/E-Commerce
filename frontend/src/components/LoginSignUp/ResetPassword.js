import React, { useEffect } from "react";
import "./ForgotPassword.css";
import { useNavigate, useMatch } from "react-router-dom";
import { HiLockClosed } from "react-icons/hi";
import { IoIosUnlock } from "react-icons/io";
import { BsKeyFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { resetUserPassword } from "../../redux/actions/userActions";

import Loader from "../Loader/Loader";

const ResetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { error, success } = useSelector((state) => state.password);
	const dispatch = useDispatch();

	const alert = useAlert();
	const navigate = useNavigate();
	const match = useMatch("/password/reset/:token");

	useEffect(() => {
		if (error) {
			alert.error(error);
		}
		if (success) {
			alert.success("Password updated successfully");
			navigate("/login");
		}
	}, [dispatch, error, success]);

	const handleUpdate = (e) => {
		e.preventDefault();
		const regform = new FormData();

		regform.set("password", password);
		regform.set("confirmPassword", confirmPassword);

		dispatch(resetUserPassword(match.params.token, regform));
	};

	return (
		<div className='update-container'>
			<div className='update-form'>
				<h3>Update Password</h3>
				<form className='user-form' onSubmit={handleUpdate}>
					<div className='password'>
						<IoIosUnlock />
						<input
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='confirm-password'>
						<HiLockClosed />
						<input
							type='password'
							placeholder='Confirm Password'
							name='confirmPassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>

					<input type='submit' className='btn-reset' value='Reset' />
				</form>
			</div>
		</div>
	);
};
export default ResetPassword;
