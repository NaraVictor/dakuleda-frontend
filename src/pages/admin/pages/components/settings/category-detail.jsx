import { getRole } from "../../../../../helpers/auth";
import { deleteData } from "../../../../../helpers/utilities";
import placeholder from "../../../../../static/img/placeholder-image.png";
import { generateFileUrl } from "./../../../../../helpers/utilities";

const CategoryDetail = ({ category, onReload, onEdit }) => {
	const deleteCategory = () => {
		if (window.confirm("Are you sure ?")) {
			deleteData(`categories/${category.id}`).then((res) => onReload());
		}
	};
	return (
		<div className="p-3">
			{!category.hasOwnProperty("id") ? (
				<p>Select a category</p>
			) : (
				<div>
					<div className="row">
						<div className="col-12">
							<h3 className="mb-0">{category.name}</h3>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-6">
							<p>
								<strong>Slug:</strong> {category.slug}
							</p>
							<p>
								<strong>Description:</strong> {category.description}
							</p>
						</div>
						<div className="col-6">
							<img
								src={generateFileUrl(category.imageFileName) || placeholder}
								alt="category"
								style={{
									maxHeight: "200px",
									maxWidth: "300px",
								}}
							/>
						</div>
					</div>
					<hr />
					<div className="row">
						{getRole() === "admin" && (
							<div className="col-12">
								<button
									className="btn-dc-white"
									onClick={() => onEdit(category, true)}>
									<i className="bi bi-pencil"></i>
									edit
								</button>

								<button
									className="btn-dc-white"
									onClick={() => deleteCategory()}>
									<i className="bi bi-trash"></i>
									delete
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export { CategoryDetail };
