import { Link } from "react-router-dom";
const TagsComponent = (props) => {
	return (
		<div className="components">
			<div className="buttons mt-3">
				<Link className="btn-dc-white p-2" to="/admin/products/new-tag">
					<i className="bi bi-plus"></i>
					create a tag
				</Link>
			</div>
		</div>
	);
};

export { TagsComponent };
