import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../css/Product.css";
import Sample from "../Assets/sample.jpg";
import { Link } from "react-router-dom";

const Product = ({ i }) => {
	return (
		<>
			<Link className='product-card' to={"979878979"}>
				<img
					src={
						i % 2
							? Sample
							: "https://m.media-amazon.com/images/I/41O3A6CUd8L.jpg"
					}
				/>

				<p>Red Gear KeyBoard</p>

				<div className='product-desc'>
					<small>
						Redgear Shadow Blade Mechanical Keyboard with Drive Customization
					</small>
				</div>
				<div className='product-ratings'>
					{[1, 2, 3, 4, 5].map(() => (
						<i class='fa-solid fa-star rating'></i>
					))}
					<span>(256) Reviews</span>
				</div>
				<span>₹2000</span>
			</Link>
		</>
		// <Card className='card product-card'>
		//     <Card.Img variant="top" className="product py-2 px-3" src={Sample} />
		//     <Card.Body>
		//         <Card.Title>Keyboard</Card.Title>
		//         <Card.Text>
		//             <small>Redgear Shadow Blade Mechanical Keyboard with Drive Customization</small>
		//             <div>
		//             {[1,2,3,4].map(()=>
		//                 <i class="fa-solid fa-star rating"></i>
		//             )}
		//             <i class="fa-solid fa-star-half-stroke rating"></i>
		//             </div>
		//             <p><small>$ 6.99</small></p>
		//         </Card.Text>
		//         <div className="d-flex justify-content-between">
		//             <Button variant="warning"><i class="fa-solid fa-cart-plus"></i></Button>
		//             <Button variant="danger"><i class="fa-solid fa-heart"></i></Button>
		//         </div>

		//     </Card.Body>
		//     </Card>
	);
};
export default Product;
