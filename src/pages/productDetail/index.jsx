import React, { Component } from "react";

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

class ProductDetailPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			prod: [],
			specifications: [],
			gallery: [],
			similar: [],
		};
	}

	static contextType = shopContext;

	componentDidMount() {
		const { slug } = this.props.match.params;

		this.context.getSelectedItem(slug).then((prod) => {
			this.setState({
				prod,
			});

			// calls for similar products, specifications, n gallery
			this.fetchSpecifications(prod.id);
			this.fetchGallery(prod.id);
			this.fetchSimilarProducts(prod.category);
			// this.fetchReviews();
		});
	}

	fetchSimilarProducts = (category) => {
		fetchData(`categories/${category}/similar`)
			.then((prods) =>
				this.setState({ similar: prods.data["similar products"] })
			)
			.catch((err) => console.log(err));
	};

	fetchSpecifications = (id) => {
		fetchData(`products/${id}/features`).then((specs) =>
			this.setState({ specifications: [...specs.data.data] })
		);
	};

	fetchGallery = (id) => {
		fetchData(`products/${id}/gallery`).then((pics) =>
			this.setState({ gallery: pics.data.data })
		);
	};

	// fetchReviews = async () => {
	// 	await console.log("Fetching product reviews");
	// };

	render() {
		const { prod, similar, gallery } = this.state;
		return (
			<>
				<PageTitle title="Product" />
				<ScrollToTopOnMount />
				<SingleProduct gallery={gallery} prod={prod} />
				<SimilarProducts prods={similar} />
				<ProductDetailNav />
				<div style={{ backgroundColor: "#eee" }} className="py-2">
					<Specifications features={this.state.specifications} />
					{/* <Reviews /> */}
					{/* <BrowsingHistory /> */}
				</div>
				<LargeAd />
			</>
		);
	}
}

export { ProductDetailPage };
