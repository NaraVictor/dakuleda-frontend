import { deleteData, generateFileUrl } from "../../../../../helpers/utilities";
import placeholder from "../../../../../static/img/placeholder-image.png";
import { useState } from "react";
import AppModal from "./../../../../../components/modal";
import { ProductFeatures } from "./features";
import { ProductGallery } from "./gallery";

const ProductDetail = ({ product, onReload, onEdit }) => {
	const [modal, setModal] = useState({
		open: false,
		content: "",
		title: "",
		size: "",
	});

	const toggleModal = (content, title, size = "md-modal") => {
		setModal({
			open: !modal.open,
			content,
			title,
			size,
		});
	};

	const deleteProduct = () => {
		if (
			window.confirm("are you sure of deleting this product ? can't be undone")
		)
			deleteData(`products/${product.id}`).then((res) => onReload());
	};
	return (
		<div className="p-3">
			{!product.hasOwnProperty("id") ? (
				<p>Select a product</p>
			) : (
				<div>
					<AppModal
						title={modal.title}
						onClose={toggleModal}
						open={modal.open}
						containerClass={modal.size}>
						{modal.content}
					</AppModal>
					<div className="row">
						<div className="col-12">
							<h3 className="mb-0">{product.name}</h3>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-7">
							<p>
								<strong>Purchase Price:</strong> {product.purchasePrice}
							</p>
							<p>
								<strong>Regular Price:</strong> {product.regularPrice}
							</p>
							<p>
								<strong>New Price:</strong> {product.newPrice}
							</p>
							<p>
								<strong>Delivery Cost:</strong> {product.deliveryCost}
							</p>
							<p>
								<strong>Delivery Period:</strong> {product.deliveryPeriod}
							</p>
							<p>
								<strong>Category:</strong> {product.category.name}
							</p>
							<p>
								<strong>Manufacturer:</strong> {product.manufacturer.name}
							</p>

							<p>
								<strong>SKU:</strong> {product.SKU}
							</p>
							<p>
								<strong>Gift Eligble:</strong>
								{product.giftEligible ? "Yes" : "No"}
							</p>
							<p>
								<strong>Free Delivery:</strong>
								{product.freeDelivery ? "Yes" : "No"}
							</p>

							<p>
								<strong>Location:</strong> {product.location}
							</p>
							<p>
								<strong>Number of Orders:</strong> {product.orderCount}
							</p>
							<p>
								<strong>Tags:</strong> {product.productTags}
							</p>
							<p>
								<strong>Description:</strong> {product.description}
							</p>
						</div>
						<div className="col-5">
							<img
								src={generateFileUrl(product.imageFileName) || placeholder}
								alt="category"
								style={{
									maxHeight: "200px",
									maxWidth: "190px",
								}}
							/>
						</div>
					</div>
					<hr />
					<div className="d-flex justify-content-between">
						<div>
							<button
								className="btn-dc-white"
								onClick={() => onEdit(product, true)}>
								<i className="bi bi-pencil"></i>
								edit
							</button>

							<button className="btn-dc-white" onClick={() => deleteProduct()}>
								<i className="bi bi-trash"></i>
								delete
							</button>
						</div>
						<div>
							<button
								className="btn"
								onClick={() =>
									toggleModal(
										<ProductFeatures
											productId={product.id}
											name={product.name}
										/>,
										"Product Features"
									)
								}>
								<i className="bi bi-card-checklist mr-1"></i>
								<strong>features</strong>
							</button>
							<button
								className="btn"
								onClick={() =>
									toggleModal(
										<ProductGallery
											productId={product.id}
											name={product.name}
										/>,
										"Product Gallery"
									)
								}>
								<i className="bi bi-images mr-1"></i>
								<strong>gallery</strong>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export { ProductDetail };
