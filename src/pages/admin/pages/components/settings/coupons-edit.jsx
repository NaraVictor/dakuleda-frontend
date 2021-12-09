import { updateData } from "../../../../../helpers/utilities";
import { useState } from "react";
import { Spinner2 } from "../../../../../components/spinner";

const CouponsEdit = ({ obj, onReload, onEdit }) => {
	const [record, setRecord] = useState({
		id: obj.id,
		title: obj.title,
		description: obj.description,
		startDate: obj.startDate,
		endDate: obj.endDate,
		amount: obj.amount,
	});
	const [busy, setBusy] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setRecord({
			...record,
			[name]: value,
		});
	};

	const updateRecord = () => {
		setBusy(true);
		updateData("coupons", { ...record })
			.then((res) => {
				onReload(true);
				alert("coupon update successful");
			})
			.finally(() => setBusy(false));
	};

	return (
		<div className="p-3">
			<div>
				<div className="row">
					<div className="col-12">
						<h4 className="mb-0">
							<strong>{busy ? "Updating: " : "Editing: "} </strong> {obj.title}
						</h4>
					</div>
				</div>
				<hr />
				{busy ? (
					<Spinner2 />
				) : (
					<div className="row">
						<div className="col-12 mb-3">
							<label htmlFor="title" className="d-form-label">
								Title *
							</label>
							<input
								type="text"
								id="title"
								name="title"
								required
								className="d-form-control w-100"
								value={record.title}
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className="col-12 mb-3">
							<label htmlFor="amount" className="d-form-label">
								Amount *
							</label>
							<input
								type="text"
								id="amount"
								name="amount"
								required
								className="d-form-control w-100"
								value={record.amount}
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className="col-12 mb-3">
							<label htmlFor="startDate" className="d-form-label">
								Start Date *
							</label>
							<input
								type="text"
								id="startDate"
								name="startDate"
								required
								className="d-form-control w-100"
								value={record.startDate}
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className="col-12 mb-3">
							<label htmlFor="endDate" className="d-form-label">
								End Date *
							</label>
							<input
								type="text"
								id="endDate"
								name="endDate"
								required
								className="d-form-control w-100"
								value={record.endDate}
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className="col-12 mb-3">
							<label htmlFor="description" className="d-form-label">
								Desccription *
							</label>
							<input
								type="text"
								id="description"
								name="description"
								required
								className="d-form-control w-100"
								value={record.description}
								onChange={(e) => handleChange(e)}
							/>
						</div>
					</div>
				)}
				<hr />
				<div className="row">
					<div className="col-12">
						<button
							className="btn-dc-white"
							disabled={busy}
							onClick={() => updateRecord()}>
							<i className="bi bi-arrow-clockwise"></i>
							{busy ? "updating..." : "update record"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export { CouponsEdit };
