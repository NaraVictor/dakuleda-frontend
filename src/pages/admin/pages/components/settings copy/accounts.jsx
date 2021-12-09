import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../../helpers/utilities";
import { Spinner2 } from "../../../../../components/spinner";
import { AccountDetail } from "./account-detail";
import { AccountEdit } from "./account-edit";
const AccountsComponent = (props) => {
	const [users, setUsers] = useState([]);
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

	const fetchUsers = () => {
		fetchData("accounts").then((res) => setUsers(res?.data?.data));
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div className="components">
			<div className="buttons my-4">
				<Link className="btn-dc-white p-2" to="/user-signup">
					<i className="bi bi-plus"></i>
					add user account
				</Link>
			</div>
			<div className="row">
				<div className="col-5">
					{users.length === 0 ? (
						<Spinner2 />
					) : (
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th>Name</th>
									<th>Username</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr
										key={user.id}
										onClick={() => selectItem(user)}
										className={`${user.id === selected.id && "bg-info"}`}>
										<td>{user.fullName}</td>
										<td>{user.username}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
				<div className="col-7">
					<div className="shadow detail-view">
						{mode.edit ? (
							<AccountEdit user={mode.data} onReload={fetchUsers} />
						) : (
							<AccountDetail user={selected} onEdit={handleEdit} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export { AccountsComponent };
