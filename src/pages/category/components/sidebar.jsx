import React from "react";
import { Link, NavLink } from "react-router-dom";
import { toTitleCase } from "./../../../helpers/utilities";

const CategorySideBar = (props) => {
	const { categories } = props;

	return (
		<ul className="categories-menu-list">
			{categories.map((cat) => (
				<NavLink
					to={`/c/${cat.slug}`}
					category={cat.name}
					activeClassName="dc-gold h5"
					className="main-category pl-2">
					{toTitleCase(cat.name)}
				</NavLink>
			))}
		</ul>
	);
};

export default CategorySideBar;
