import { Tab, Nav, Row, Col } from "react-bootstrap";
import "./Profile.css";
const Profile = () => {
	return (
		<>
			<div className='container tabs-container'>
				<Tab.Container id='left-tabs-example' defaultActiveKey='profile'>
					<Row>
						<Col sm={3}>
							<Nav variant='tabs' className='flex-column'>
								<Nav.Item>
									<Nav.Link eventKey='profile'>Profile Information</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='address'>Address</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='saved-cards'>Saved cards</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey='profile'>
									<form className='profile-form'>
										<div className='row'>
											<label for='name'>Name</label>
											<div className='form-group col-sm-6'>
												<input
													type='text'
													className='form-control'
													placeholder='First name'
												/>
											</div>
											<div className='form-group col-sm-6'>
												<input
													type='text'
													className='form-control'
													placeholder='Last name'
												/>
											</div>
										</div>
										<div className='row'>
											<div className='col-2'>
												<label>Gender</label>
											</div>
											<div className='col-2'>
												<input type='radio' name='gender' value='Male' />
												<label className='form-check-label' for='gender'>
													Male
												</label>
											</div>
											<div className='col-2'>
												<input type='radio' name='gender' value='Female' />
												<label className='form-check-label' for='gender'>
													Female
												</label>
											</div>
										</div>
										<div className='row'>
											<div className='form-group col-sm-6'>
												<label for='name'>Email Adrress</label>
												<input
													type='text'
													className='form-control'
													placeholder='Email'
												/>
											</div>
											<div className='form-group col-sm-6'>
												<label for='name'>Mobile Number</label>
												<input
													type='text'
													className='form-control'
													placeholder='Mobile'
												/>
											</div>
										</div>
									</form>
								</Tab.Pane>
								<Tab.Pane eventKey='address'>
									<form className='profile-form'>
										<div className='row'>
											<label for='name'>Name</label>
											<div className='form-group col-sm-6'>
												<input
													type='text'
													className='form-control'
													placeholder='First name'
												/>
											</div>
											<div className='form-group col-sm-6'>
												<input
													type='text'
													className='form-control'
													placeholder='Last name'
												/>
											</div>
										</div>
										<div className='row'>
											<div className='col-1'>
												<label>Gender</label>
											</div>
											<div className='col-1'>
												<input type='radio' name='gender' value='Male' />
												<label className='form-check-label' for='gender'>
													Male
												</label>
											</div>
											<div className='col-2'>
												<input type='radio' name='gender' value='Female' />
												<label className='form-check-label' for='gender'>
													Female
												</label>
											</div>
										</div>
										<div className='row'>
											<div className='form-group col-sm-6'>
												<label for='name'>Email Adrress</label>
												<input
													type='text'
													className='form-control'
													placeholder='Email'
												/>
											</div>
											<div className='form-group col-sm-6'>
												<label for='name'>Mobile Number</label>
												<input
													type='text'
													className='form-control'
													placeholder='Mobile'
												/>
											</div>
										</div>
									</form>
									<button className='btn btn-warning'>Add New Address</button>
								</Tab.Pane>
								<Tab.Pane eventKey='saved-cards'></Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</div>
		</>
	);
};
export default Profile;
