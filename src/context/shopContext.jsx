import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../helpers/utilities";

export const shopContext = createContext();

const ShopContext = (props) => {
	const [state, setState] = useState({
		products: [],
		selectedItem: {},
		buy: false,
	});

	useEffect(() => {
		fetchProducts().then((res) => {
			setState({ ...state, products: res.data?.data });
		});
	}, []);

	const findProduct = (slug) => {
		// query all products n return a matching slug
		const q = state.products.filter((prod) => {
			return prod.slug === slug;
		});

		return q;
	};

	const fetchProducts = async () => {
		const p = await fetchData("products");
		return p;
	};

	const handleFetchProducts = () => {
		return state.products;
	};

	const handleCheckout = (type) => {
		// types are cart, buy

		//
		if (type === "buy") {
			setState({ buy: false });
			localStorage.removeItem("buy");
			return;
		}

		return true;
	};

	const handleGetBuyItem = () => {
		if (localStorage.getItem("buy") === null) return null;
		return JSON.parse(localStorage.getItem("buy"));
	};

	// buy an item
	const handleBuyItem = (item) => {
		if (localStorage.getItem("buy") !== null) {
			localStorage.removeItem("buy");
		}

		setState({ buy: true });
		localStorage.setItem("buy", JSON.stringify(item));
	};

	// select an item
	const handleSelectItem = (item) => {
		setState({ ...state, selectedItem: { ...item } });
	};

	const handleGetSelectedItem = async (slug) => {
		const { selectedItem } = state;
		// fetch item from state if it exists
		if (selectedItem.hasOwnProperty("id")) return { ...selectedItem };

		// fetch product from server if it doesn't exist
		let sp;

		await fetchData(`products/${slug}`)
			.then((p) => {
				sp = p.data.data;
			})
			.catch((err) => {
				sp = fetchProducts().then((res) => ({
					...res.data?.data,
					notfound: true,
				}));
			});
		return sp;
	};

	return (
		<shopContext.Provider
			value={{
				fetchProducts: handleFetchProducts,
				getSelectedItem: handleGetSelectedItem,
				selectItem: handleSelectItem,
				buyItem: handleBuyItem,
				getBuyItem: handleGetBuyItem,
				checkOut: handleCheckout,
			}}>
			{props.children}
		</shopContext.Provider>
	);
};

export default ShopContext;
