import React from "react";
import { Link } from "react-router-dom";

const Category = (props) => {
	const { image, name, slug } = props.category;
	return (
		<Link to={`/c/${slug}`} category={name}>
			<div className="category text-center">
				<img src={image} alt="category" />
			</div>
			<div className="category-title text-center">{name}</div>
		</Link>
	);
};

export default Category;
