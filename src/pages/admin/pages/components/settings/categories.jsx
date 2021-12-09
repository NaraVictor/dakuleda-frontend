import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../../helpers/utilities";
import { CategoryDetail } from "./category-detail";
import { CategoryEdit } from "./category-edit";

const CategoriesComponent = (props) => {
	const [categories, setCategories] = useState([]);
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

	const fetchCategories = () => {
		fetchData("categories").then((res) => setCategories(res.data.data));
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div className="components">
			<div className="buttons my-4">
				<Link className="btn-dc-white p-2" to="/admin/settings/new-category">
					<i className="bi bi-plus"></i>
					add category
				</Link>
			</div>
			<div className="row">
				<div className="col-5">
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>Name</th>
							</tr>
						</thead>
						<tbody>
							{categories.map((cat) => (
								<tr
									key={cat.id}
									onClick={() => selectItem(cat)}
									className={`${cat.id === selected.id && "bg-info"}`}>
									<td>{cat.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="col-7">
					<div className="shadow detail-view">
						{mode.edit ? (
							<CategoryEdit obj={mode.data} onReload={fetchCategories} />
						) : (
							<CategoryDetail category={selected} onEdit={handleEdit} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export { CategoriesComponent };
