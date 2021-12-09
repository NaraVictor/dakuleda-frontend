import React, { Component } from "react";
import CategorySideBar from "./components/sidebar";
import CategoryProductList from "./components/productsList";
import CategoryNav from "./components/nav";
import { fetchData, toTitleCase } from "../../helpers/utilities";
import PageTitle from "../../components/page-title";

class CategoryPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			categories: [],
		};
	}

	async componentDidMount() {
		const { category } = this.props.match.params;

		await fetchData(`categories/${category}/products`).then((res) =>
			this.setState({ products: res.data.data })
		);

		await fetchData("categories/").then((res) =>
			this.setState({ categories: res.data.data })
		);
	}

	render() {
		return (
			<>
				<PageTitle title="Categories" />
				<section className="row m-0 px-md-3">
					<article className="col-md-2 categories-list">
						<CategorySideBar categories={this.state.categories} />
					</article>
					<article className="col category-products p-0 mt-2 no-gutters">
						{/* put categories slider here */}
						<CategoryNav
							category={toTitleCase(this.props.match.params.category)}
						/>
						<CategoryProductList prods={this.state.products} />
					</article>
				</section>
			</>
		);
	}
}

export { CategoryPage };
