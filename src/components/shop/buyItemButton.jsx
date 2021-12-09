import React, { useContext } from "react";
import { shopContext } from "./../../context/shopContext";

const BuyItemButton = ({ prod, classes }) => {
	const { buyItem } = useContext(shopContext);
	return (
		<button
			className={`btn-dc-primary ${classes}`}
			onClick={() => {
				window.location.href = "/checkout";
				buyItem(prod);
			}}>
			Buy now
		</button>
	);
};

export default BuyItemButton;
