import React, { useEffect } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiUserCircle } from "react-icons/hi";
import { useState } from "react";
import Profile from "../../Assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
	clearErrors,
	loadUser,
	updateProfile,
} from "../../redux/actions/userActions";

import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";
import Loader from "../Loader/Loader";

const UpdateProfile = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState();

	const dispatch = useDispatch();
	const { loading, error, isUpdated } = useSelector((state) => state.profile);
	const { user } = useSelector((state) => state.user);
	const alert = useAlert();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			if (!name) setName(user.name);
			if (!email) setEmail(user.email);
			if (!avatarPreview && user.avatar.url !== "sample url")
				setAvatarPreview(user.avatar.url);
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (isUpdated) {
			alert.success("Profile updated successfully");
			dispatch(loadUser());
			navigate("/profile");
			dispatch({ type: UPDATE_PROFILE_RESET });
		}
	}, [dispatch, error, isUpdated, user]);

	const handleUpdate = (e) => {
		e.preventDefault();
		const regform = new FormData();

		regform.set("name", name);
		regform.set("email", email);

		if (avatar) regform.set("avatar", avatar);

		dispatch(updateProfile(regform));
	};

	const updateDataChange = (e) => {
		switch (e.target.name) {
			case "name":
				setName(e.target.value);
				return;
			case "email":
				setEmail(e.target.value);
				return;
			case "avatar":
				const reader = new FileReader();
				reader.onload = () => {
					if (reader.readyState === 2) {
						setAvatarPreview(reader.result);
						setAvatar(reader.result);
					}
				};
				reader.readAsDataURL(e.target.files[0]);
			default:
				return;
		}
	};

	return loading ? (
		<Loader />
	) : (
		<>
			<div className='update-container'>
				<div className='update-form'>
					<h3>Update Profile</h3>
					<form
						className='user-form'
						onSubmit={handleUpdate}
						encType='multipart/form-data'
					>
						<div className='update-name'>
							<HiUserCircle />
							<input
								type='text'
								placeholder='Full Name'
								name='name'
								value={name}
								onChange={updateDataChange}
							/>
						</div>
						<div className='update-email'>
							<HiOutlineMail />
							<input
								type='email'
								placeholder='Email'
								name='email'
								value={email}
								onChange={updateDataChange}
							/>
						</div>

						<div className='upload-avatar'>
							<img
								src={avatarPreview ? avatarPreview : Profile}
								alt='Avatar Preview'
							/>
							<input
								type='file'
								name='avatar'
								accept='image/*'
								onChange={updateDataChange}
							/>
						</div>

						<input type='submit' className='btn-update' value='Update' />
					</form>
				</div>
			</div>
		</>
	);
};

export default UpdateProfile;
