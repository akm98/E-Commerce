import React, { useEffect, useState } from "react";
import "./Profile.css";
import Loader from "../Loader/Loader";
import MetaData from "../Header/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileImg from "../../Assets/profile.png";

const Profile = () => {
	const { user, loading, isAuthenticated } = useSelector((state) => state.user);

	const navigate = useNavigate();

	useEffect(() => {
		if (user && isAuthenticated !== undefined && !isAuthenticated) {
			navigate("/login");
		}
	}, [isAuthenticated, user]);

	return loading || Object.keys(user).length === 0 ? (
		<Loader />
	) : (
		<>
			<MetaData title={`Welcome ${user.name}`} />
			<div className='profile-container'>
				<div>
					<h1>My Profile</h1>
					<img
						src={
							user.avatar.url === "sample url" ? ProfileImg : user.avatar.url
						}
						alt={user.name}
					/>
					<Link to='/profile/update'>Edit Profile</Link>
				</div>
				<div>
					<div>
						<h4>Full Name</h4>
						<p>{user.name}</p>
					</div>
					<div>
						<h4>Email</h4>
						<p>{user.email}</p>
					</div>
					<div>
						<h4>Joined On</h4>
						<p>{String(user.createdAt).slice(0, 10)}</p>
					</div>

					<div>
						<Link to='/orders'>My Orders</Link>
						<Link to='/password/update'>Change Password</Link>
					</div>
				</div>
			</div>
		</>
	);
};
export default Profile;
