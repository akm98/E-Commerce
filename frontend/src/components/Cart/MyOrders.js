import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Header/MetaData";
import { clearErrors, myOrder } from "../../redux/actions/orderActions";
import { useNavigate, Link } from "react-router-dom";
import { MdLaunch } from "react-icons/md";
import Loader from "../Loader/Loader";

const MyOrders = () => {
	const alert = useAlert();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.user);

	const { error, loading, order } = useSelector((state) => state.myOrders);

	const columns = [
		{
			field: "id",
			headerName: "Order ID",
			minWidth: 300,
			flex: 1,
		},
		{
			field: "status",
			headerName: "Status",
			minWidth: 300,
			flex: 1,
			cellClassName: (params) => {
				return params.getValue(params.id, "status") === "Delivered"
					? "greenColor"
					: "redColor";
			},
		},
		{
			field: "itemsQty",
			headerName: "Quantity",
			type: "number",
			minWidth: 150,
			flex: 0.3,
		},
		{
			field: "amount",
			headerName: "Amount",
			type: "number",
			minWidth: 270,
			flex: 0.5,
		},
		{
			field: "action",
			headerName: "Action",
			type: "number",
			minWidth: 300,
			flex: 0.5,
			renderCell: (params) => {
				return (
					<Link to={`/order/${params.getValue(params.id, "id")}`}>
						<MdLaunch />
					</Link>
				);
			},
		},
	];
	const rows = [];

	order &&
		order.forEach((item, index) => {
			rows.push({
				itemsQty: item.orderItems.length,
				id: item._id,
				status: item.orderStatus,
				amount: item.totalPrice,
			});
		});

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(myOrder());
	}, []);

	return (
		<>
			<MetaData title={`${user && user.name} - Orders`} />
			{loading ? (
				<Loader />
			) : (
				<div className='my-orders-page'>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className='my-orders-table'
						autoHeight
					/>
					<h3 className='my-order-heading'>{`${
						user && user.name
					} - Orders`}</h3>
				</div>
			)}
		</>
	);
};

export default MyOrders;
