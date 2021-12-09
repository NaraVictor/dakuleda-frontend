import React from "react";
import { Link } from "react-router-dom";

const CategorySideBar = (props) => {
	const { categories } = props;

	return (
		<ul className="sticky-top">
			{categories.map((cat) => (
				<Link
					to={`/c/${cat.slug}`}
					category={cat.name}
					className="main-category pl-2">
					{cat.name}
				</Link>
			))}
		</ul>
	);
};

export default CategorySideBar;
