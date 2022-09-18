import React, { useEffect, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Profile from "../../Assets/profile.png";
import { MdDashboard } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { userLogout, clearErrors } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop } from "@mui/material";
import "./Header.css";

const UserOptions = ({ user }) => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const { isAuthenticated, error } = useSelector((state) => state.user);

	const alert = useAlert();
	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error, user]);

	const logout = () => {
		dispatch(userLogout());
		if (!isAuthenticated) {
			alert.success("Logged out successfully");
			navigate("/login");
		}
	};

	const orders = () => {
		navigate("/cart");
	};

	const profile = () => {
		navigate("/profile");
	};

	const dashboard = () => {};

	const options = [
		{ icon: <HiOutlineShoppingBag />, name: "Orders", func: orders },
		{ icon: <CgProfile />, name: "Profile", func: profile },
		{ icon: <TbLogout />, name: "Logout", func: logout },
	];

	if (user.role === "admin") {
		options.unshift({
			icon: <MdDashboard />,
			name: "Dashboard",
			func: dashboard,
		});
	}

	return (
		<>
			<Backdrop open={open} style={{ zIndex: 2 }} />
			<SpeedDial
				ariaLabel='SpeedDial tooltip example'
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				direction='down'
				className='speed-dial'
				icon={
					<img
						className='speed-dail-icon'
						src={
							user.avatar && user.avatar.url !== "sample url"
								? user.avatar.url
								: Profile
						}
						alt='Profile'
					/>
				}
			>
				{options.map((each) => (
					<SpeedDialAction
						icon={each.icon}
						tooltipTitle={each.name}
						onClick={each.func}
						tooltipOpen={window.innerWidth <= 600 ? true : false}
					/>
				))}
			</SpeedDial>
		</>
	);
};

export default UserOptions;
