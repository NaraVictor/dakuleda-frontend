import React from "react";

import ShopByCategory from "./components/categories";
// import Deals from "./components/deals";
import Shop from "./components/shop";
import DefaultSlider, { SlimSlider } from "../../components/carousel";
import { SplideSlide } from "@splidejs/react-splide";
import { useState, useEffect } from "react";
import { fetchData } from "../../helpers/utilities";
import { generateFileUrl } from "./../../helpers/utilities";
import Ad from "../../components/ads/ad";
import ScrollToTop from "react-scroll-to-top";
import MetaTag from "./../../components/meta-tags";

const HomePage = (props) => {
	const [sliders, setSliders] = useState([]);

	const fetchSliders = () => {
		fetchData("sliders").then((res) => {
			if (res.data?.data) {
				setSliders(res?.data?.data);
			}
		});
	};
	useEffect(() => {
		fetchSliders();
	}, []);

	return (
		<div className="container mt-1">
			<ScrollToTop smooth />
			<MetaTag
				pageTitle={"Home"}
				description={
					"home of authentic electronics, vehicles, motorbikes, home appliances and more."
				}
				link={window.location.href}
				title={"Dakuleda"}
				id={Math.random()}
				image={generateFileUrl("logo.png")}
			/>
			{sliders.length > 0 && (
				<div className="text-center">
					<DefaultSlider>
						{sliders?.map((slide) => (
							<SplideSlide>
								<a href={`${slide.url || "#"}`}>
									<img
										src={generateFileUrl(slide?.imageFileName)}
										alt="slider"
										className="slider-image"
									/>
								</a>
							</SplideSlide>
						))}
					</DefaultSlider>
				</div>
			)}
			<br />
			{/* <Deals /> */}

			<ShopByCategory />
			<div className="mt-5 pt-4">
				<Ad />
			</div>
			{/* <Shop /> */}
		</div>
	);
};

export { HomePage };
// "https://placeimg.com/1200/350/any"
