import React from "react";
import { Link } from "react-router-dom";

const SubNav = (props) => {
	return (
		<div className="subnav dc-bg-gold text-center py-2">
			<Link to="/" className="text-black-50 px-2">
				Today Deals
			</Link>
			<Link to="/" className="text-black-50 px-2">
				Gifts
			</Link>
			<Link to="/" className="text-black-50 px-2">
				Showroom
			</Link>
			<Link to="/" className="text-black-50 px-2">
				Services
			</Link>
		</div>
	);
};

export default SubNav;
