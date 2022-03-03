import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toTitleCase } from "./../../../helpers/utilities";

const CategoryNav = (props) => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<>
			<nav className="bg-secondary text-white mb-3 p-2">
				<span
					className="categories-menu mr-3"
					onClick={() => setShowMenu(!showMenu)}>
					{showMenu ? (
						<i class="bi bi-x h5"></i>
					) : (
						<i class="bi bi-list h5"></i>
					)}
				</span>

				<span className="category-name">
					<Link to="#" className="text-white category-link mr-2">
						Categories
					</Link>
					{/* <Link to="/c/all" className="text-white category-link mr-2">
					Categories
				</Link> */}
					> {toTitleCase(props.category)}
				</span>
			</nav>
			<div className="d-md-none">
				{showMenu &&
					props.categories?.map((cat) => (
						<NavLink
							to={`/c/${cat.slug}`}
							category={cat.name}
							activeClassName="dc-gold h5"
							className="main-category">
							{toTitleCase(cat.name)}
						</NavLink>
					))}
			</div>
		</>
	);
};

export default CategoryNav;
