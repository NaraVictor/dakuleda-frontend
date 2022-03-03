import { useState, useEffect } from "react";
import { Spinner2 } from "../../../../../components/spinner";
import { useHistory, Link } from "react-router-dom";
import { fetchData, cedisLocale } from "../../../../../helpers/utilities";
import { ProductDetail } from "./product-detail";
import { ProductEdit } from "./product-edit";
import { getRole } from "../../../../../helpers/auth";

const ProductsComponent = (props) => {
	const [products, setProduct] = useState([]);
	const [selected, setSelected] = useState({});

	const [mode, setMode] = useState({
		edit: false,
		data: {},
	});

	const handleEdit = (data, editMode) => {
		setMode({
			edit: editMode,
			data,
		});
	};

	const selectItem = (item) => {
		setSelected(item);
		setMode({
			...mode,
			edit: false,
		});
	};

	const fetchProducts = () => {
		fetchData("products").then((res) => {
			res?.status === 200 && setProduct(res.data.data);
		});
	};

	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<div className="components">
			{getRole() !== "staff" && (
				<div className="buttons my-4">
					<Link className="btn-dc-white p-2" to="/admin/products/new">
						<i className="bi bi-plus"></i>
						add product
					</Link>
				</div>
			)}
			<div>
				{/* {products.length === 0 ? (
					<>
						<p>Nothing to display here...</p>
					</>
				) : ( */}
				<>
					<div className="row">
						<div className="col-5">
							{products.length === 0 ? (
								<Spinner2 />
							) : (
								<table className="table table-striped table-hover">
									<thead>
										<tr>
											<th>Product Name</th>
											<th>Category</th>
											<th>Price</th>
										</tr>
									</thead>
									<tbody>
										{products.map((product) => (
											<tr
												key={product.id}
												onClick={() => selectItem(product)}
												className={`${
													product.id === selected.id && "bg-info"
												}`}>
												<td>{product.name}</td>
												<td>{product.category.name}</td>
												<td>{product.newPrice}</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>
						<div className="col-7">
							<div className="shadow detail-view">
								{mode.edit ? (
									<ProductEdit obj={mode.data} onReload={fetchProducts} />
								) : (
									<ProductDetail
										product={selected}
										onEdit={handleEdit}
										onReload={() => {
											fetchProducts();
											setSelected({});
										}}
									/>
								)}
							</div>
						</div>
					</div>
				</>
				{/* )} */}
			</div>
		</div>
	);
};

export { ProductsComponent };
