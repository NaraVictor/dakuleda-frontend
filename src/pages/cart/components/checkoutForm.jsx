import React from "react";

const CheckOutForm = ({ onCheckout, onChange, data }) => {
	return (
		<div>
			<div>
				<span className="circle">1</span>
				<p className="d-inline pl-2">Personal</p>
			</div>

			<div className="row mt-4">
				<div className="col">
					<div>
						<label htmlFor="name" className="d-form-label">
							Your name *
						</label>
						<input
							type="text"
							id="name"
							className="d-form-control w-100"
							value={data.name}
							required
							onChange={onChange}
						/>
					</div>
					<div className="my-3">
						<label htmlFor="location" className="d-form-label">
							Location (district, town etc) *
						</label>
						<input
							type="text"
							id="location"
							required
							value={data.location}
							onChange={onChange}
							className="d-form-control w-100"
						/>
					</div>
					<div>
						<label htmlFor="phone" className="d-form-label">
							Phone number *
						</label>
						<input
							type="tel"
							maxLength={15}
							required
							value={data.phone}
							onChange={onChange}
							id="phone"
							className="d-form-control w-100"
						/>
					</div>
					<div className="my-3">
						<label htmlFor="email" className="d-form-label">
							Email
						</label>
						<input
							type="email"
							maxLength={50}
							value={data.email}
							onChange={onChange}
							id="email"
							className="d-form-control w-100"
						/>
					</div>
				</div>
			</div>

			{/* payment method */}
			<hr />
			<div>
				<span className="circle">2</span>
				<p className="d-inline pl-2">Payment Method</p>
			</div>

			<div className="row">
				<div className="col">
					<div className="my-3">
						<label htmlFor="payment-method" className="d-form-label">
							select preferred option *
						</label>
						<select
							id="payment-method"
							value={data.paymentmethod}
							onChange={onChange}
							className="d-form-control w-100">
							<option value="">choose one</option>
							<option value="cash">Cash-on-delivery</option>
							<option value="card">Cards</option>
							<option value="installment">Installment</option>
						</select>
					</div>
				</div>
			</div>

			{/* Delivery */}
			<hr />
			<div>
				<span className="circle">3</span>
				<p className="d-inline pl-2">Delivery</p>
			</div>

			<div className="row">
				<div className="col">
					<div className="my-3">
						<label htmlFor="delivery-method" className="d-form-label">
							select preferred option *
						</label>
						<select
							id="delivery-method"
							value={data.deliverymethod}
							onChange={onChange}
							className="d-form-control w-100">
							<option value="">choose one</option>
							<option value="pickup">I will pick up item myself</option>
							<option value="deliver">Deliver it to me</option>
						</select>
					</div>
				</div>
			</div>

			<button className="btn-primary-filled mt-3 px-4" onClick={onCheckout}>
				Place Order
			</button>
			<button
				className="ml-1 px-3 btn-dc-white"
				onClick={() => {
					window.history.go(-1);
				}}>
				Go Back
				<i className="fas fa-arrow-left ml-2"></i>
			</button>
		</div>
	);
};

export default CheckOutForm;
