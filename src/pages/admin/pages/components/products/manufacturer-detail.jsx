import { updateData } from "../../../../../helpers/utilities";

const ManufacturerDetail = ({ manufactuer, onReload, onEdit }) => {
	const deleteManufacturer = () => {
		updateData(`manufacturers/${manufactuer.id}/delete`).then(
			(res) => onReload,
			onEdit
		);
	};
	return (
		<div className="p-3">
			{!manufactuer.hasOwnProperty("id") ? (
				<p>Select a manufactuer</p>
			) : (
				<div>
					<div className="row">
						<div className="col-12">
							<h3 className="mb-0">{manufactuer.name}</h3>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-12">
							<p>
								<strong>Email:</strong> {manufactuer.email}
							</p>
							<p>
								<strong>Website:</strong> {manufactuer.website}
							</p>
						</div>
					</div>
					<hr />
					<div className="row">
						<button
							className="btn-dc-white"
							onClick={() => onEdit(manufactuer, true)}>
							<i className="bi bi-pencil"></i>
							edit
						</button>

						<button
							className="btn-dc-white"
							onClick={() => deleteManufacturer()}>
							<i className="bi bi-trash"></i>
							delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export { ManufacturerDetail };
