import { useState, useEffect } from "react";
import { fetchData } from "../../helpers/utilities";
import { generateFileUrl } from "./../../helpers/utilities";
const Ad = (props) => {
	const [ads, setAds] = useState([]);
	useEffect(() => {
		fetchData("ads").then((res) => {
			if (res?.status === 200) {
				setAds(res.data?.data);
			}
		});
	}, []);

	return (
		<div className="row my-5">
			{ads?.length > 0 &&
				ads.map((ad) =>
					ad.size === "Big" ? (
						<div className="col-md-8 col-12 ad ad-big py-2" key={ad.id}>
							<a href={`${ad.url || "#"}`}>
								<img src={generateFileUrl(ad.imageFileName)} alt="" />
							</a>
						</div>
					) : (
						<div className="col-md-4 col-12 ad ad-small py-2" key={ad.id}>
							<a href={`${ad.url || "#"}`}>
								<img src={generateFileUrl(ad.imageFileName)} alt="" />
							</a>
						</div>
					)
				)}
		</div>
	);
};

export default Ad;
