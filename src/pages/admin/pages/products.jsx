import PageTitle from "../../../components/page-title";
import {
	ManufacturersComponent,
	ProductsComponent,
	ReviewsComponent,
	TagsComponent,
} from "./components";
import { useState } from "react";

const ProductsPage = (props) => {
	const [page, setPage] = useState(0);
	return (
		<div className="page products-page">
			<PageTitle title="Products" />
			<h5>Products</h5>
			<div className="sub-menu shadow-sm">
				<a
					className={`tab ${page === 0 && "active-tab"}`}
					href="#"
					onClick={() => setPage(0)}>
					Products
				</a>
				{/* <a
					className={`tab ${page === 1 && "active-tab"}`}
					href="#"
					onClick={() => setPage(1)}>
					Reviews
				</a> */}
				{/* <a
					className={`tab ${page === 2 && "active-tab"}`}
					href="#"
					onClick={() => setPage(2)}>
					Tags
				</a> */}
				<a
					className={`tab ${page === 3 && "active-tab"}`}
					href="#"
					onClick={() => setPage(3)}>
					Manufacturers
				</a>
			</div>
			<section>
				{page === 0 && <ProductsComponent />}
				{/* {page === 1 && <ReviewsComponent />} */}
				{/* {page === 2 && <TagsComponent />} */}
				{page === 3 && <ManufacturersComponent />}
			</section>
		</div>
	);
};

export { ProductsPage };
