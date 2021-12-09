import React, { createContext } from "react";
import { fetchData } from "../helpers/utilities";

export const shopContext = createContext();

class ShopContext extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			selectedItem: {},
			buy: false,
		};
	}

	componentDidMount() {
		this.fetchProducts().then((res) => {
			this.setState({ products: res.data?.data });
		});
	}

	findProduct = (slug) => {
		// query all products n return a matching slug
		const q = this.state.products.filter((prod) => {
			return prod.slug === slug;
		});

		return q;
	};

	fetchProducts = async () => {
		const p = await fetchData("products/");
		return p;
	};

	handleFetchProducts = () => {
		return this.state.products;
	};

	handleCheckout = (type) => {
		// types are cart, buy

		//
		if (type === "buy") {
			this.setState({ buy: false });
			localStorage.removeItem("buy");
			return;
		}

		return true;
	};

	handleGetBuyItem = () => {
		if (localStorage.getItem("buy") === null) return null;
		return JSON.parse(localStorage.getItem("buy"));
	};

	// buy an item
	handleBuyItem = (item) => {
		if (localStorage.getItem("buy") !== null) {
			localStorage.removeItem("buy");
		}

		this.setState({ buy: true });
		localStorage.setItem("buy", JSON.stringify(item));
	};

	// select an item
	handleSelectItem = (item) => {
		this.setState({ selectedItem: { ...item } });
	};

	handleSelectedItem = async (slug) => {
		const { selectedItem } = this.state;
		// fetch item from state if it exists
		if (selectedItem.hasOwnProperty("id")) return { ...selectedItem };

		// fetch product from server if it doesn't
		let sp;

		await fetchData(`products/?slug=${slug}`)
			.then((p) => {
				sp = p.data;
			})
			.catch((err) => {
				sp = this.fetchProducts().then((res) => ({
					...res.data?.data,
					notfound: true,
				}));
			});
		return sp;
	};

	render() {
		return (
			<shopContext.Provider
				value={{
					fetchProducts: this.handleFetchProducts,
					getSelectedItem: this.handleSelectedItem,
					selectItem: this.handleSelectItem,
					buyItem: this.handleBuyItem,
					getBuyItem: this.handleGetBuyItem,
					checkOut: this.handleCheckout,
				}}>
				{this.props.children}
			</shopContext.Provider>
		);
	}
}

export default ShopContext;
