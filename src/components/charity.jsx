import { useState, useEffect } from "react";
import closeIcon from "../static/img/close.png";
import charityImage from "../static/img/charity-2.png";

const CharityAlert = (props) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (sessionStorage.getItem("charity")) {
			setOpen(false);
		} else {
			sessionStorage.setItem("charity", "charity-alert-ad-open");
			setOpen(true);
		}
	}, []);

	return (
		<>
			<div
				className={`${open && "popup1"}`}
				style={{
					display: open ? "block" : "none",
				}}>
				<div className={`${open && "newsletter-sign-box"}`}>
					<h4>
						<a href={charityImage} download="dakuleda changing colors">
							Download Flyer
						</a>
					</h4>
					<img
						src={closeIcon}
						alt="close"
						className="x"
						onClick={() => {
							sessionStorage.removeItem("charity");
							setOpen(false);
						}}
					/>
					<div className="newsletter_img">
						<img alt="newsletter" src={charityImage} />
					</div>
				</div>
			</div>
			<div
				id={`${open && "fade"}`}
				style={{
					display: open ? "block" : "none",
				}}></div>
		</>
	);
};

export default CharityAlert;
