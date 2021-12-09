import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "../../../../../helpers/utilities";
import { Spinner2 } from "../../../../../components/spinner";
import { ManufacturerDetail } from "./manufacturer-detail";
import { ManufacturerEdit } from "./manufacturers-edit";
const ManufacturersComponent = (props) => {
	const [manufacturers, setManufacturers] = useState([]);
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

	const fetchManufacturers = () => {
		fetchData("manufacturers").then((res) => setManufacturers(res.data.data));
	};
	useEffect(() => {
		fetchManufacturers();
	}, []);
	return (
		<div className="components">
			<div className="buttons my-4">
				<Link
					className="btn-dc-white p-2"
					to="/admin/products/new-manufacturer">
					<i className="bi bi-plus"></i>
					add manufacturer
				</Link>
			</div>
			<div className="row">
				<div className="col-5">
					{manufacturers.length === 0 ? (
						<Spinner2 />
					) : (
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th>Manufacturer Name</th>
								</tr>
							</thead>
							<tbody>
								{manufacturers.map((manufacturer) => (
									<tr
										key={manufacturer.id}
										onClick={() => selectItem(manufacturer)}
										className={`${
											manufacturer.id === selected.id && "bg-info"
										}`}>
										<td>{manufacturer.name}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
				<div className="col-7">
					<div className="shadow detail-view">
						{mode.edit ? (
							<ManufacturerEdit obj={mode.data} onReload={fetchManufacturers} />
						) : (
							<ManufacturerDetail manufactuer={selected} onEdit={handleEdit} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export { ManufacturersComponent };
