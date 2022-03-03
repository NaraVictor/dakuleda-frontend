import React, { useState, useEffect, useContext } from "react";

// components
import SimilarProducts from "./components/similarProducts";
import SingleProduct from "./components/singleProduct";
import ProductDetailNav from "./components/productDetailNav";
// import Reviews from "./components/reviews";
// import BrowsingHistory from "./components/browsingHistory";
import ScrollToTopOnMount from "../../components/scrollToTop";
import ScrollToTop from "react-scroll-to-top";

//
import { shopContext } from "../../context/shopContext";
import LargeAd from "../../components/ads/largeAd";
import { fetchData, postData } from "../../helpers/utilities";
import PageTitle from "../../components/page-title";
import { useRouteMatch } from "react-router-dom";
import Features from "./components/features";
import axios from "axios";
import Ad from "../../components/ads/ad";
import MetaTag from "../../components/meta-tags";
import { generateFileUrl } from "./../../helpers/utilities";

const ProductDetailPage = (props) => {
	const ctx = useContext(shopContext);
	const [prod, setProduct] = useState({});
	const [features, setFeatures] = useState([]);
	const [similarProds, setSimilarProds] = useState([]);
	const [gallery, setGallery] = useState([]);

	const route = useRouteMatch();
	const { slug } = route.params;

	const fetchFeatures = (id) => {
		return fetchData(`products/${id}/features`).then((res) => res.data?.data);
	};
	const fetchGallery = (id) => {
		return fetchData(`products/${id}/gallery`).then((res) => res.data?.data);
	};

	const fetchSimilarProducts = (slug) => {
		fetchData(`categories/${slug}/similar-products`)
			.then((res) => {
				if (res.status === 200) {
					setSimilarProds(res.data.data);
				}
			})
			.catch((err) => console.log(err));
	};

	const recordVisitor = async () => {
		const rs = await axios.get("https://ipapi.co/json/");
		const visitor = {
			product: prod["name"],
			country: rs.data.country_name,
			city: rs.data.city,
			url: window.location.href,
		};

		postData("analytics?type=product", visitor);
	};

	useEffect(() => {
		ctx.getSelectedItem(slug).then((res) => {
			setProduct({ ...res });
			// calls for similar products, features, n gallery
			fetchSimilarProducts(res.category.slug);
			if (res.features === undefined) {
				fetchFeatures(res.id).then((r) => {
					r?.length > 0 && setFeatures(r);
				});
				// return;
			} else {
				setFeatures(res.features);
			}

			if (res.gallery === undefined) {
				fetchGallery(res.id).then((r) => {
					r?.length > 0 && setGallery(r);
				});
				return;
			}

			setGallery(res.gallery);
		});
		recordVisitor();
	}, [slug]);

	return (
		<>
			<ScrollToTopOnMount />
			<ScrollToTop smooth />

			<MetaTag
				pageTitle={prod.name}
				description={prod.description}
				link={window.location.href}
				title={prod.name}
				id={prod.id}
				image={generateFileUrl(prod.imageFileName)}
			/>

			<SingleProduct prod={prod} gallery={gallery} />
			<ProductDetailNav />
			<div className="py-2">
				<Features features={features} />
				{/* <Reviews />
				<BrowsingHistory /> */}
			</div>
			<div className="container">
				<Ad />
			</div>
			{similarProds?.length > 0 && <SimilarProducts prods={similarProds} />}
		</>
	);
};

export { ProductDetailPage };
