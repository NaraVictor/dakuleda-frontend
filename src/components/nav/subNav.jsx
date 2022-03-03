import React from "react";
import { NavLink } from "react-router-dom";

const SubNav = (props) => {
	return (
		<div className="subnav dc-bg-gold text-center py-2">
			{/* <Link to="/" className="text-black-50 px-2">
				Today Deals
			</Link> */}
			<NavLink
				activeClassName="active-subnav"
				exact
				to="/"
				className="text-black-50 px-2">
				Home
			</NavLink>
			<NavLink
				activeClassName="active-subnav"
				exact
				to="/about"
				className="text-black-50 px-2">
				About Us
			</NavLink>
			<NavLink
				to="/cards"
				activeClassName="active-subnav"
				exact
				className="text-black-50 px-2">
				Cards
			</NavLink>
			<NavLink
				to="/showrooms"
				activeClassName="active-subnav"
				exact
				className="text-black-50 px-2">
				Showrooms
			</NavLink>
		</div>
	);
};

export default SubNav;
