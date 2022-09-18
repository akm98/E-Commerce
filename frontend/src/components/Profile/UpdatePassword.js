import React, { useEffect } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { HiLockClosed } from "react-icons/hi";
import { IoIosUnlock } from "react-icons/io";
import { BsKeyFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
	clearErrors,
	loadUser,
	updatePassword,
} from "../../redux/actions/userActions";

import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";
import Loader from "../Loader/Loader";

const UpdatePassword = () => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();
	const { isUpdated, error } = useSelector((state) => state.profile);
	const { user } = useSelector((state) => state.user);
	const alert = useAlert();
	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (isUpdated) {
			alert.success("Password updated successfully");
			dispatch(loadUser());
			navigate("/profile");
			dispatch({ type: UPDATE_PROFILE_RESET });
		}
	}, [dispatch, error, isUpdated, user]);

	const handleUpdate = (e) => {
		e.preventDefault();
		const regform = new FormData();

		regform.set("oldPassword", oldPassword);
		regform.set("newPassword", newPassword);
		regform.set("confirmPassword", confirmPassword);

		dispatch(updatePassword(regform));
	};

	return (
		<div className='update-container'>
			<div className='update-form'>
				<h3>Update Password</h3>
				<form className='user-form' onSubmit={handleUpdate}>
					<div className='old-password'>
						<BsKeyFill />
						<input
							type='password'
							placeholder='Old Password'
							name='oldPassword'
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
						/>
					</div>
					<div className='new-password'>
						<IoIosUnlock />
						<input
							type='password'
							placeholder='New Password'
							name='newPassword'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
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

					<input type='submit' className='btn-update' value='Update' />
				</form>
			</div>
		</div>
	);
};
export default UpdatePassword;
