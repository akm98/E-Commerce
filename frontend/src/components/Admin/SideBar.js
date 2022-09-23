import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/lab";
import {
	MdOutlineExpandLess,
	MdOutlineExpandMore,
	MdDashboard,
} from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import DashBoard from "./DashBoard";
const SideBar = () => {
	return (
		<div className='sidebar-container'>
			<Link to='/'>
				<h2> My Web Store</h2>
			</Link>

			<TreeView
				defaultCollapseIcon={<MdOutlineExpandLess />}
				defaultExpandIcon={<MdOutlineExpandMore />}
			>
				<TreeItem>
					<Link to='/admin/products'>
						<TreeItem nodeId='2' label='All' icon={<MdDashboard />} />
					</Link>
					<Link to='/admin/product'>
						<TreeItem
							nodeId='3'
							label='Create'
							icon={<IoMdAddCircleOutline />}
						/>
					</Link>
				</TreeItem>
			</TreeView>
		</div>
	);
};

export default SideBar;
