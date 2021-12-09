import PageTitle from "./../../../components/page-title";
import greet from "greet-by-time";
import { useState } from "react";
import { getUser } from "../../../helpers/auth";

const DashboardPage = (props) => {
	const hour = new Date().getHours();
	const [pendingOrders, setPendingOrders] = useState(1);
	const [pendingCoupons, setPendingCoupons] = useState(0);
	const [orders, setOrders] = useState([]);
	const [sliders, setSliders] = useState([]);
	const [products, setProducts] = useState([]);
	return (
		<div className="page dashboard-page">
			<PageTitle title="Dashboard" />
			<div className="row mb-4">
				<div className="col-6">
					<p className="pe-3 m-0">
						<i className="bi bi-person"></i>
						username
					</p>
					<h5>{greet(getUser().username, hour)}</h5>
				</div>
				<div className="col-3">
					<div
						className={`d-card shadow-sm ${
							pendingOrders === 0
								? "bg-success text-white"
								: "bg-danger text-white"
						}`}>
						<h3 className="m-0">{pendingOrders}</h3>
						<p>Pending orders</p>
					</div>
				</div>
				<div className="col-3">
					<div
						className={`d-card shadow-sm ${
							pendingCoupons === 0
								? "bg-success text-white"
								: "bg-danger text-white"
						}`}>
						<h3 className="m-0">{pendingCoupons}</h3>
						<p>Unused Coupons</p>
					</div>
				</div>
			</div>
			<div className="row" style={{ height: "55vh" }}>
				<div className="col-9 bg-success py-5">Orders Chart</div>
				<div className="col-3 bg-info py-5">Sliders</div>
			</div>
			<div className="row">
				<div className="col-12 py-5 bg-warning">Frequently sold products</div>
			</div>
		</div>
	);
};

export { DashboardPage };
