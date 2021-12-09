import React from "react";
import { Link } from "react-router-dom";
import logo from "../../static/img/logo/logo.png";
import CartIcon from "./../shop/cart";
import SearchBox from "./search";

const NavBar = (props) => {
	return (
		<nav className="navbar main-nav navbar-light bg-dark-gray">
			<Link className="navbar-brand pl-md-5 pl-sm-0" to="/">
				{/* home */}
				<img src={logo} alt="dakuleda logo" className="logo" />
			</Link>

			<SearchBox />

			<div className="pr-md-5 pr-sm-0 cart-wrapper">
				<Link to="/" className="px-4">
					Help
				</Link>
				<Link to="/cart">
					{/* Cart */}
					<CartIcon />
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
