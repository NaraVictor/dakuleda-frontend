import { updateData } from "../../../../../helpers/utilities";
import placeholder from "../../../../../static/img/placeholder-image.png";

const CategoryDetail = ({ category, onDone, onEdit }) => {
	const deleteCategory = () => {
		updateData(`accounts/${category.id}/update-status`).then((res) => onDone);
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
						<div className="col-7">
							<p>
								<strong>Slug:</strong> {category.slug}
							</p>
							<p>
								<strong>Description:</strong> {category.description}
							</p>
						</div>
						<div className="col-5">
							<img
								src={category.imageUrl || placeholder}
								alt="category"
								height="200"
							/>
						</div>
					</div>
					<hr />
					<div className="row">
						<button
							className="btn-dc-white"
							onClick={() => onEdit(category, true)}>
							<i className="bi bi-pencil"></i>
							edit
						</button>

						<button className="btn-dc-white" onClick={() => deleteCategory()}>
							<i className="bi bi-trash"></i>
							delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export { CategoryDetail };
