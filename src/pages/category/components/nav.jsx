import React from "react";
import { Link } from "react-router-dom";

const CategoryNav = (props) => {
	return (
		<nav className="bg-secondary text-white mb-3 p-2 sticky-top">
			<span className="categories-menu mr-3">
				<i className="fas fa-bars"></i>
				<span> Categories</span>
			</span>
			<span className="category-name">
				<Link to="/c/all" className="text-white category-link mr-2">
					Categories
				</Link>
				> {props.category}
			</span>

			{/* <span className="view-options d-inline">
				<span id="list-view">
					<i className="fas fa-list-ul mr-1"></i>
					List View
				</span>
				<span className="grid-view ml-3">
					<i className="fas fa-th-large mr-1"></i>
					Grid View
				</span>
			</span> */}
			{/* <form action="" className="d-inline">
				<input type="search" name="category-search" id="category-search" />
			</form> */}
		</nav>
	);
};

export default CategoryNav;
