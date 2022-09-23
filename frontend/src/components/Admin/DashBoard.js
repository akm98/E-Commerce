import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import { HiLockClosed, HiUserCircle } from "react-icons/hi";
import { GoNote } from "react-icons/go";
import {
	MdDriveFileRenameOutline,
	MdProductionQuantityLimits,
} from "react-icons/md";
import { BiCategory, BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, newProduct } from "../../redux/actions/productActions";
import Loader from "../Loader/Loader";
const DashBoard = () => {
	const { loading, success, error } = useSelector(
		(state) => state.addNewProduct
	);

	const [product, setProduct] = useState({
		name: "",
		desc: "",
		price: "",
		images: [],
		stock: "",
		category: "",
	});
	const [imagesPreview, setImagesPreview] = useState([]);
	const categories = [
		"Mobile",
		"Electronics",
		"Fashion",
		"Daily Essentials",
		"Health",
	];

	const dispatch = useDispatch();
	const alert = useAlert();

	useEffect(() => {
		console.log("asdasd");
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		} else if (success) {
			alert.success("Product was successfully Added");
			setProduct({
				name: "",
				desc: "",
				price: "",
				images: [],
				stock: "",
				category: "",
			});
			setImagesPreview([]);
		}
	}, [dispatch, error, success]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();

		myForm.set("name", product.name);
		myForm.set("desc", product.desc);
		myForm.set("price", product.price);
		myForm.set("stock", product.stock);
		myForm.set("category", product.category);

		product.images.forEach((image) => {
			myForm.append("images", image);
		});

		dispatch(newProduct(myForm));
	};

	const handleImagesChange = (e) => {
		if (imagesPreview.length > 4) {
			alert.error("Cannot upload more that 5 images");
			return;
		}
		const files = Array.from(e.target.files);

		const newProduct = product;

		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((prev) => [...prev, reader.result]);
					newProduct.images = [...product.images, reader.result];
					setProduct(newProduct);
				}
			};
			reader.readAsDataURL(file);
		});
	};

	const handleInputChange = (e) => {
		if (e.target.name !== "images") {
			setProduct({ ...product, [e.target.name]: e.target.value });
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};
	return loading ? (
		<Loader />
	) : (
		<>
			<div className='dashboard-container'>
				<h3>Add Product</h3>
				<form
					className='user-form'
					onSubmit={handleSubmit}
					encType='multipart/form-data'
				>
					<div className=''>
						<MdDriveFileRenameOutline />
						<input
							type='text'
							placeholder='Product Name'
							name='name'
							value={product.name}
							onChange={handleInputChange}
						/>
					</div>
					<div className='description-box'>
						<GoNote />

						<textarea
							className='submit-dailog-textarea'
							cols='30'
							rows='3'
							maxLength={150}
							name='desc'
							placeholder='Description'
							value={product.desc}
							onChange={handleInputChange}
						/>
					</div>
					<div className=''>
						<BiRupee />
						<input
							type='number'
							placeholder='Price'
							name='price'
							value={product.price}
							onChange={handleInputChange}
						/>
					</div>
					<div className=''>
						<MdProductionQuantityLimits />
						<input
							type='number'
							placeholder='Stock'
							name='stock'
							value={product.stock}
							onChange={handleInputChange}
						/>
					</div>
					<div className=''>
						<BiCategory />
						<select
							placeholder='Product Category'
							name='category'
							value={product.category}
							onChange={handleInputChange}
						>
							<option value=''>Category</option>
							{categories.map((category) => {
								return <option value={category}>{category}</option>;
							})}
						</select>
					</div>
					<div className='upload-images'>
						<input
							type='file'
							name='images'
							accept='image/*'
							multiple
							onChange={handleImagesChange}
						/>
					</div>
					<div className='preview-images'>
						{imagesPreview.map((image, index) => (
							<img src={image} key={index} alt='Images Preview' />
						))}
					</div>

					<input
						type='submit'
						className='btn-create'
						disabled={loading}
						value='Add Product'
					/>
				</form>
			</div>
		</>
	);
};

export default DashBoard;
