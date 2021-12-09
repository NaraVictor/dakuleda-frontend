import React from "react";
import ProductListView from "../../../components/shop/productListView";

const CategoryProductList = (props) => {
	const { prods } = props;
	return prods.map((prod) => (
		<span key={prod.id}>
			<ProductListView prod={prod} />
			<hr />
		</span>
	));
};

export default CategoryProductList;
