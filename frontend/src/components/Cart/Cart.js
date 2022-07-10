import React, { useState } from "react";
import "./Cart.css";

const Cart = () => {
	const [quantity, setQuantity] = useState(1);

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-8'>
					{[1, 2, 3, 4, 5].map(() => (
						<div className='row cart'>
							<div className='col-4 item'>
								<img src={"https://i.imgur.com/X99e6jS.jpg"} />
							</div>
							<div className='col-5 quantity'>
								<p>
									Redgear Shadow Blade Mechanical Keyboard with Drive
									Customization
								</p>
								<button className='btn btn-success'>+</button>
								{quantity}
								<button className='btn btn-danger'>-</button>
							</div>
							<div className='col-3 info'>
								<p>Price:</p>
								<p>$6.99</p>
							</div>
						</div>
					))}
				</div>
				<div className='col-md-4 summary'>
					<h4>Order summary</h4>
					<div>
						<div className='subtotal'>
							Price(5 items) <span>$34.99</span>
						</div>
						<div className='subtotal'>
							Discount <span>$4.99</span>
						</div>
						<div className='subtotal'>
							Delivery Charges <span>$2.99</span>
						</div>
						<div className='subtotal'>
							Total Amount <span>$43.99</span>
						</div>
					</div>
					<button className='btn btn-warning'>Proceed To Checkout</button>
				</div>
			</div>
		</div>
	);
};
export default Cart;
