import React, { useState, useEffect, useContext } from "react";

// components
import SimilarProducts from "./components/similarProducts";
import SingleProduct from "./components/singleProduct";
import Specifications from "./components/specifications";
import ProductDetailNav from "./components/productDetailNav";
// import Reviews from "./components/reviews";
// import BrowsingHistory from "./components/browsingHistory";
import ScrollToTopOnMount from "../../components/scrollToTop";

//
import { shopContext } from "../../context/shopContext";
import LargeAd from "../../components/ads/largeAd";
import { fetchData } from "../../helpers/utilities";
import PageTitle from "../../components/page-title";
import { useHistory } from "react-router-dom";

const ProductDetailPage = (props) => {
	// const [state, setState] = useState({
	// 	prod: [],
	// 	specifications: [],
	// 	gallery: [],
	// 	similar: [],
	// });

	const [prod, setProduct] = useState({});

	const ctx = useContext(shopContext);
	const history = useHistory();

	useEffect(() => {
		fetchData(`products/${slug}`).then((res) => {
			setProduct(...res.data.data);
		});
		// ctx.getSelectedItem(slug).then((prod) => {
		// 	console.log("item slug is ", slug);
		// 	setState({
		// 		...state,
		// 		prod,
		// 	});

		// calls for similar products, specifications, n gallery
		// fetchSpecifications(prod.id);
		// fetchGallery(prod.id);
		// fetchSimilarProducts(prod.category);
		// fetchReviews();
		// });
	}, []);

	// const fetchSimilarProducts = (category) => {
	// 	fetchData(`categories/${category}/similar`)
	// 		.then((prods) =>
	// 			// setState({...state, similar: prods.data["similar products"] })
	// 		)
	// 		.catch((err) => console.log(err));
	// };

	// const fetchSpecifications = (id) => {
	// 	fetchData(`products/${id}/features`).then((specs) =>
	// 		// setState({ specifications: [...specs.data.data] })
	// 	);
	// };

	// const fetchGallery = (id) => {
	// 	fetchData(`products/${id}/gallery`).then((pics) =>
	// 		// setState({ gallery: pics.data.data })
	// 	);
	// };

	// const { prod, similar, gallery } = state;
	return (
		<>
			<PageTitle title="Product" />
			{/* <h2>Product Page</h2> */}
			<ScrollToTopOnMount />
			<SingleProduct prod={prod} />
			{/* <SimilarProducts prods={similar} /> */}
			<ProductDetailNav />
			{/* <div style={{ backgroundColor: "#eee" }} className="py-2">
				<Specifications features={state.specifications} />
				<Reviews />
				<BrowsingHistory />
			</div> */}
			{/* <LargeAd /> */}
		</>
	);
};

export { ProductDetailPage };
