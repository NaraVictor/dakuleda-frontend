import React from "react";
import { Link } from "react-router-dom";
import { generateFileUrl } from "./../../helpers/utilities";

const Category = (props) => {
	const { imageFileName, name, slug } = props.category;
	return (
		<Link to={`/c/${slug}`} category={name}>
			<div className="category text-center">
				<img src={generateFileUrl(imageFileName)} alt="category" />
			</div>
			<div className="category-title text-center">{name}</div>
		</Link>
	);
};

export default Category;
