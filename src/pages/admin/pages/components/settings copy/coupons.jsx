import { Link } from "react-router-dom";
import { Spinner2 } from "../../../../../components/spinner";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../../helpers/utilities";
import { CouponDetail } from "./coupon-detail";
import { CouponsEdit } from "./coupons-edit";
const CouponsComponent = (props) => {
	const [coupons, setCoupons] = useState([]);
	const [selected, setSelected] = useState({});

	const [mode, setMode] = useState({
		edit: false,
		data: {},
	});

	const handleEdit = (data, editMode) => {
		setMode({
			edit: editMode,
			data,
		});
	};

	const selectItem = (item) => {
		setSelected(item);
		setMode({
			...mode,
			edit: false,
		});
	};

	const fetchCoupons = () => {
		fetchData("coupons").then((res) => setCoupons(res.data.data));
	};
	useEffect(() => {
		fetchCoupons();
	}, []);

	return (
		<div className="components">
			<div className="buttons my-4">
				<Link className="btn-dc-white p-2" to="/admin/settings/new-coupon">
					<i className="bi bi-plus"></i>
					add coupon
				</Link>
			</div>
			<div className="row">
				<div className="col-5">
					{coupons.length === 0 ? (
						<Spinner2 />
					) : (
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th>Title</th>
									<th>Amount</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{coupons.map((coupon) => (
									<tr
										key={coupon.id}
										onClick={() => selectItem(coupon)}
										className={`${coupon.id === selected.id && "bg-info"}`}>
										<td>{coupon.title}</td>
										<td>{coupon.amount}</td>
										<td
											className={`${
												coupon.isActive ? "bg-success" : "bg-danger"
											} text-white`}>
											<strong>{coupon.isActive ? "Active" : "Inactive"}</strong>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
				<div className="col-7">
					<div className="shadow detail-view">
						{mode.edit ? (
							<CouponsEdit obj={mode.data} onReload={fetchCoupons} />
						) : (
							<CouponDetail coupon={selected} onEdit={handleEdit} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export { CouponsComponent };
