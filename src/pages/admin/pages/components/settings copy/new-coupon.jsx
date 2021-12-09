import { useForm } from "react-hook-form";
import { postData } from "./../../../../../helpers/utilities";
import { useState } from "react";
const NewCoupon = (props) => {
	const { register, handleSubmit, reset } = useForm();
	const [busy, setBusy] = useState(false);

	const submitData = (data) => {
		setBusy(true);
		postData("coupons", { ...data })
			.then((res) => {
				if (res.status === 200) {
					reset();
					alert("coupon created successfully");
				}
			})
			.catch((ex) => alert("an error occurred"))
			.finally(() => setBusy(false));
	};
	return (
		<div>
			<div className="d-flex justify-content-between align-items-center">
				<h5>New Coupon</h5>
				<button className="btn" onClick={() => props.history.go(-1)}>
					<span className="h5">
						<i className="bi bi-arrow-left-circle"></i> back
					</span>
				</button>
			</div>
			<hr />
			<button
				className={`${busy ? "btn-dc-white" : "btn-primary-filled"} px-4 py-2`}
				disabled={busy}
				onClick={() => document.getElementById("submitter").click()}>
				<i className="bi bi-check-all"></i>
				{busy ? "processing..." : "Submit"}
			</button>
			<hr />

			<form onSubmit={handleSubmit(submitData)}>
				<div className="row">
					<div className="col-6">
						<label htmlFor="title" className="d-form-label">
							Title *
						</label>
						<input
							type="text"
							id="title"
							required
							{...register("title", { required: true })}
							className="d-form-control w-100 shadow"
						/>
					</div>
					<div className="col-6">
						<label htmlFor="amount" className="d-form-label">
							Amount (monetry worth of coupon) *
						</label>
						<input
							type="number"
							id="amount"
							{...register("amount", { required: true })}
							className="d-form-control w-100 shadow"
						/>
					</div>
				</div>
				<div className="row my-3">
					<div className="col-6">
						<label htmlFor="startDate" className="d-form-label">
							Start Date *
						</label>
						<input
							type="date"
							id="startDate"
							className="d-form-control w-100 shadow"
							{...register("startDate", { required: true })}
						/>
					</div>
					<div className="col-6">
						<label htmlFor="endDate" className="d-form-label">
							End Date *
						</label>
						<input
							type="date"
							id="endDate"
							className="d-form-control w-100 shadow"
							{...register("endDate", { required: true })}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<label htmlFor="descripton" className="d-form-label">
							Description
						</label>
						<input
							type="text"
							id="descripton"
							className="d-form-control w-100 shadow"
							{...register("description")}
						/>
					</div>
				</div>
				<input hidden type="submit" id="submitter" />
			</form>
		</div>
	);
};

export { NewCoupon };
