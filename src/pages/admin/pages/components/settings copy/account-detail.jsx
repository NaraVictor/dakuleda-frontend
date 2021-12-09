import { updateData } from "../../../../../helpers/utilities";

const AccountDetail = ({ user, onReload, onEdit }) => {
	const updateStatus = () => {
		updateData(`accounts/${user.id}/update-status`).then((res) => onReload);
	};
	return (
		<div className="p-3">
			{!user.hasOwnProperty("id") ? (
				<p>Select a user</p>
			) : (
				<div>
					<div className="row">
						<div className="col-12">
							<h3 className="mb-0">{user.fullName}</h3>
							<small>Fullname</small>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-12">
							<p>
								Username: <strong>{user.username}</strong>
							</p>
						</div>
						<div className="col-12">
							<p>
								Email: <strong>{user.email}</strong>
							</p>
						</div>
						<div className="col-12">
							<p>
								Role: <strong>{user.role}</strong>
							</p>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-12">
							<button
								className="btn-dc-white"
								onClick={() => onEdit(user, true)}>
								<i className="bi bi-pencil"></i>
								edit
							</button>

							<button
								onClick={() => (window.location.href = "/change-password")}
								className="btn-dc-white">
								<i className="bi bi-lock"></i>
								change password
							</button>
							<button className="btn-dc-white" onClick={() => updateStatus()}>
								<i className="bi bi-trash"></i>
								{user.isActive ? "de-activate" : "active"}
							</button>
							<div
								className={`text-white col-12 py-1 mt-4 ${
									user.isActive ? "bg-success" : "bg-danger"
								}`}>
								{user.isActive ? "Account active" : "Account de-activated"}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export { AccountDetail };
