import React from "react";

const ProductDetailNav = (props) => {
	return (
		<section className="bg-warning">
			{/* <hr className="m-0" /> */}
			<ul className="nav container py-2">
				<li className="nav-item">
					<a className="nav-link text-dark" href="#specifications">
						Specifications
					</a>
				</li>
				{/* <li className="nav-item">
					<a className="nav-link text-dark" href="#reviews">
						Reviews
					</a>
				</li> */}
			</ul>
		</section>
	);
};

export default ProductDetailNav;
