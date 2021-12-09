import { updateData } from "../../../../../helpers/utilities";

const CouponDetail = ({ coupon, onReload, onEdit }) => {
	const deletecoupon = () => {
		updateData(`accounts/${coupon.id}/update-status`).then((res) => onReload);
	};
	return (
		<div className="p-3">
			{!coupon.hasOwnProperty("id") ? (
				<p>Select a coupon</p>
			) : (
				<div>
					<div className="row">
						<div className="col-12">
							<h3 className="mb-0">{coupon.title}</h3>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-12">
							<p>
								<strong>Amount:</strong> {coupon.amount}
							</p>
							<p>
								<strong>Description:</strong> {coupon.description}
							</p>
							<p>
								<strong>Start Date:</strong> {coupon.startDate}
							</p>
							<p>
								<strong>End Date:</strong> {coupon.endDate}
							</p>
							<p>
								<strong>Number of codes:</strong> {coupon.codes.length}
							</p>
						</div>
					</div>
					<hr />
					<div className="row">
						<button
							className="btn-dc-white"
							onClick={() => onEdit(coupon, true)}>
							<i className="bi bi-pencil"></i>
							edit
						</button>

						<button className="btn-dc-white" onClick={() => deletecoupon()}>
							<i className="bi bi-trash"></i>
							delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export { CouponDetail };
