import { Tab, Tabs } from "react-bootstrap";

import React, { useEffect } from "react";
import "./LoginSignUp.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { HiOutlineMail, HiLockClosed, HiUserCircle } from "react-icons/hi";
import { useState } from "react";
import Profile from "../../Assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, login, register } from "../../redux/actions/userActions";

function LoginSignUp() {
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState(Profile);

	const dispatch = useDispatch();
	const { state, loading, error, isAuthenticated } = useSelector(
		(state) => state.user
	);
	const alert = useAlert();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		console.log("User logged", error);
	}, [dispatch, error, isAuthenticated]);

	const handleLogin = (e) => {
		e.preventDefault();

		dispatch(login(loginEmail, loginPassword));
	};

	const handleRegister = (e) => {
		e.preventDefault();
		const regform = new FormData();

		regform.set("name", user.name);
		regform.set("email", user.email);
		regform.set("password", user.password);
		if (avatar) regform.set("avatar", avatar);

		console.log("formData", regform, avatar);
		dispatch(register(regform));
	};

	const loginDataChange = (e) => {
		if (e.target.name === "email") {
			setLoginEmail(e.target.value);
			return;
		}
		setLoginPassword(e.target.value);
	};

	const registerDataChange = (e) => {
		if (e.target.name !== "avatar") {
			setUser({ ...user, [e.target.name]: e.target.value });
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};
	return (
		<div className='login-container'>
			<div className='login-form'>
				<div className='tabs'>
					<Tabs
						defaultActiveKey='login'
						id='uncontrolled-tab-example'
						className='mb-3'
					>
						<Tab eventKey='login' title='Login'>
							<form className='user-form' onSubmit={(e) => handleLogin(e)}>
								<div className='login-email'>
									<HiOutlineMail />
									<input
										type='email'
										placeholder='Email'
										name='email'
										value={loginEmail}
										onChange={loginDataChange}
									/>
								</div>
								<div className='login-password'>
									<HiLockClosed />
									<input
										type='password'
										placeholder='Password'
										name='password'
										value={loginPassword}
										onChange={loginDataChange}
									/>
								</div>
								<Link to='/forgetPassword' className='forgot-password'>
									Forgot Password?
								</Link>
								<input type='submit' className='btn-login' value='Login' />
							</form>
						</Tab>
						<Tab eventKey='SignUp' title='SignUp'>
							<form
								className='user-form'
								onSubmit={handleRegister}
								encType='multipart/form-data'
							>
								<div className='signup-name'>
									<HiUserCircle />
									<input
										type='text'
										placeholder='Full Name'
										name='name'
										value={user.name}
										onChange={registerDataChange}
									/>
								</div>
								<div className='signup-email'>
									<HiOutlineMail />
									<input
										type='email'
										placeholder='Email'
										name='email'
										value={user.email}
										onChange={registerDataChange}
									/>
								</div>
								<div className='signup-password'>
									<HiLockClosed />
									<input
										type='password'
										placeholder='Password'
										name='password'
										value={user.password}
										onChange={registerDataChange}
									/>
								</div>
								<div className='signup-password-2'>
									<HiLockClosed />
									<input
										type='password'
										placeholder='Re-enter Password'
										name='password'
										value={user.password}
										onChange={registerDataChange}
									/>
								</div>
								<div className='upload-avatar'>
									<img src={avatarPreview} alt='Avatar Preview' />
									<input
										type='file'
										name='avatar'
										accept='image/*'
										onChange={registerDataChange}
									/>
								</div>

								<input type='submit' className='btn-login' value='Sign Up' />
							</form>
						</Tab>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

export default LoginSignUp;
