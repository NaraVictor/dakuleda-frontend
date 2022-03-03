import React, { useState, useEffect, useContext } from "react";
import CategorySideBar from "./components/sidebar";
import CategoryProductList from "./components/productsList";
import CategoryNav from "./components/nav";
import { fetchData, toTitleCase } from "../../helpers/utilities";
import { useRouteMatch } from "react-router-dom";
import Product from "../../components/shop/product";
import ScrollToTopOnMount from "../../components/scrollToTop";
import ScrollToTop from "react-scroll-to-top";
import MetaTag from "../../components/meta-tags";
import { generateFileUrl } from "./../../helpers/utilities";

const CategoryPage = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const route = useRouteMatch();
	const { slug } = route.params;

	const fetchCategoriesProducts = () => {
		// if (slug === "all") {
		// 	fetchData("products").then(
		// 		(res) => res.status === 200 && setProducts(res.data.data)
		// 	);
		// 	return;
		// }

		fetchData(`categories/${slug}/products`).then((res) => {
			if (res.status === 200) {
				setProducts(res.data.data);
				setLoading(false);
			}
		});
	};

	const fetchCategories = () => {
		fetchData("categories").then(
			(res) => res.status === 200 && setCategories(res.data.data)
		);
	};

	useEffect(() => {
		fetchCategories();
		fetchCategoriesProducts();
	}, []);

	return (
		<>
			<ScrollToTopOnMount />
			<ScrollToTop smooth />
			{/* <PageTitle title={toTitleCase(slug)} /> */}
			<MetaTag
				key={Math.random()}
				pageTitle={toTitleCase(slug)}
				description={
					"shop for " + toTitleCase(slug) + " from us at Dakuleda.com"
				}
				link={window.location.href}
				title={toTitleCase(slug)}
				id={Math.random()}
				image={generateFileUrl(products[0]?.category.imageFileName)}
			/>
			<section className="row m-0 px-md-3">
				<article className="col-md-2 categories-list">
					<CategorySideBar categories={categories} />
				</article>
				<article className="col category-products p-0 no-gutters">
					{/* put categories slider here */}
					<CategoryNav category={toTitleCase(slug)} categories={categories} />
					{/* <CategoryProductList prods={products} /> */}
					<div className="container">
						<div className="row">
							{loading ? (
								<p className="ml-4">Loading...</p>
							) : products.length === 0 ? (
								<p className="alert alert-danger ml-4">
									<strong>No products in this category</strong>
								</p>
							) : (
								products.map((product) => (
									<div className="col-md-3 col-6 my-1">
										<Product prod={product} key={product.id} />
									</div>
								))
							)}
						</div>
					</div>
				</article>
			</section>
		</>
	);
};

export { CategoryPage };
