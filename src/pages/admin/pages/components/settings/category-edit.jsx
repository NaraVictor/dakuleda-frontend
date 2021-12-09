import { updateData } from "../../../../../helpers/utilities";
import { useState } from "react";
import { Spinner2 } from "../../../../../components/spinner";
import placeholder from "../../../../../static/img/placeholder-image.png";

const CategoryEdit = ({ obj, onReload, onEdit }) => {
	const [record, setRecord] = useState({
		id: obj.id,
		name: obj.name,
		description: obj.description,
		imageUrl: obj.imageUrl,
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
		updateData(`categories`, { ...record })
			.then((res) => {
				onReload(true);
				alert("category update successful");
			})
			.finally(() => setBusy(false));
	};

	return (
		<div className="p-3">
			<div>
				<div className="row">
					<div className="col-12">
						<h4 className="mb-0">
							<strong>{busy ? "Updating: " : "Editing: "} </strong> {obj.name}
						</h4>
					</div>
				</div>
				<hr />
				{busy ? (
					<Spinner2 />
				) : (
					<div className="row">
						<div className="col-12 mb-3">
							<label htmlFor="name" className="d-form-label">
								Name *
							</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								className="d-form-control w-100"
								value={record.name}
								onChange={(e) => handleChange(e)}
							/>
						</div>

						<div className="col-12 mb-3">
							<label htmlFor="description" className="d-form-label">
								Description
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
						<div className="col-12 mb-3">
							<button
								className="btn-dc-white"
								onClick={() => document.getElementById("catImg").click()}>
								<i className="bi bi-image mr-1"></i>
								upload image
							</button>
							<input type="file" name="catImg" id="catImg" hidden />
						</div>

						<div className="col-12">
							<img
								src={obj.imageUrl || placeholder}
								alt="category"
								height="200"
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

export { CategoryEdit };
