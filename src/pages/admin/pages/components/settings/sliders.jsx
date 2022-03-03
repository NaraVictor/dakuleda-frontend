import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner2 } from "../../../../../components/spinner";
import { fetchData } from "../../../../../helpers/utilities";
import { SliderDetail } from "./slider-detail";
import { SliderEdit } from "./slider-edit";
const SlidersComponent = (props) => {
	const [sliders, setSliders] = useState([]);
	const [selected, setSelected] = useState({});
	const [mode, setMode] = useState({
		edit: false,
		data: {},
	});

	const handleEdit = (data, edit) => {
		setMode({
			edit,
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

	const fetchSliders = () => {
		fetchData("sliders").then((res) => {
			setSliders(res.data.data);
		});
	};

	useEffect(() => {
		fetchSliders();
	}, []);

	return (
		<div className="components">
			<div className="buttons my-4">
				<Link className="btn-dc-white p-2" to="/admin/settings/new-slider">
					<i className="bi bi-plus"></i>
					add slider
				</Link>
			</div>
			<div className="row">
				<div className="col-4">
					{sliders.length === 0 ? (
						<Spinner2 />
					) : (
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th>Title</th>
									{/* <th>Status</th> */}
								</tr>
							</thead>
							<tbody>
								{sliders.map((slider) => (
									<tr
										key={slider.id}
										onClick={() => selectItem(slider)}
										className={`${slider.id === selected.id && "bg-info"}`}>
										<td>{slider.title}</td>
										{/* <td
											className={`${
												slider.title ? "bg-success" : "bg-danger"
											} text-white`}>
											<strong>{slider.title ? "Active" : "Inactive"}</strong>
										</td> */}
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
				<div className="col-8">
					<div className="shadow detail-view">
						{mode.edit ? (
							<SliderEdit obj={mode.data} onReload={fetchSliders} />
						) : (
							<SliderDetail
								slider={selected}
								onEdit={handleEdit}
								onReload={() => {
									fetchSliders();
									setSelected({});
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export { SlidersComponent };
