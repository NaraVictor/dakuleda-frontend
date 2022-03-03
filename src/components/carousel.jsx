import React, { Component } from "react";
import { Splide } from "@splidejs/react-splide";

// css
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

export default class DefaultSlider extends Component {
	render() {
		const { slideNo, slideSpeed } = this.props;

		return (
			<Splide
				className="w-100"
				options={{
					type: "loop",
					gap: "1rem",
					autoplay: true,
					pauseOnHover: true,
					resetProgress: false,
					arrows: "slider",
					drag: true,
					keyboard: true,
					lazyload: true,
					autoheight: true,
					speed: slideSpeed ?? 400,
					perPage: slideNo ?? 1,
				}}
				hasAutoplayProgress
				hasSliderWrapper>
				{this.props.children}
			</Splide>
		);
	}
}

export class SlimSlider extends Component {
	render() {
		const { slideNo, duration } = this.props;

		return (
			<Splide
				options={{
					type: "loop",
					gap: "1rem",
					autoplay: true,
					pauseOnHover: true,
					resetProgress: false,
					arrows: "false",
					drag: true,
					keyboard: true,
					// lazyload: true,
					interval: duration ?? 5000,
					autoheight: true,
					perPage: slideNo ?? 1,
					pagination: false,
				}}
				hasSliderWrapper>
				{this.props.children}
			</Splide>
		);
	}
}

// export class BootstrapSlider extends Component {
// 	render() {
// 		return (
// 			<div id="bootstrapslider" className="carousel slide" data-ride="carousel">
// 				<div className="carousel-inner">{this.props.children}</div>

// 				<a
// 					className="carousel-control-prev"
// 					href="#bootstrapslider"
// 					role="button"
// 					data-slide="prev">
// 					<span
// 						className="carousel-control-prev-icon"
// 						aria-hidden="true"></span>
// 					<span className="sr-only">Previous</span>
// 				</a>
// 				<a
// 					className="carousel-control-next"
// 					href="#bootstrapslider"
// 					role="button"
// 					data-slide="next">
// 					<span
// 						className="carousel-control-next-icon"
// 						aria-hidden="true"></span>
// 					<span className="sr-only">Next</span>
// 				</a>
// 			</div>
// 		);
// 	}
// }
