import { fetchData, updateData } from "../../../../../helpers/utilities";
import { useState, useEffect } from "react";
import { Spinner2 } from "../../../../../components/spinner";
import placeholder from "../../../../../static/img/placeholder-image.png";

const ProductEdit = ({ obj, onReload, onEdit }) => {
	const [record, setRecord] = useState({
		id: obj.id,
		categoryId: obj.categoryId,
		manufacturerId: obj.manufacturerId,
		name: obj.name,
		description: obj.description,
		SKU: obj.SKU,
		imageUrl: obj.imageUrl,
		videoUrl: obj.videoUrl,
		giftEligible: obj.giftEligible,
		freeDelivery: obj.freeDelivery,
		purchasePrice: obj.purchasePrice,
		regularPrice: obj.regularPrice,
		newPrice: obj.newPrice,
		location: obj.location,
	});
	const [busy, setBusy] = useState(false);
	const [cats, setCats] = useState([]);
	const [mans, setMans] = useState([]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setRecord({
			...record,
			[name]: value,
		});
	};

	const updateRecord = () => {
		setBusy(true);
		updateData("products", { ...record })
			.then((res) => {
				onReload(true);
				alert("product update successful");
			})
			.finally(() => setBusy(false));
	};

	const fetchCategories = () => {
		fetchData("categories").then((res) => setCats(res.data.data));
	};

	const fetchManufacturers = () => {
		fetchData("manufacturers").then((res) => setMans(res.data.data));
	};

	useEffect(() => {
		fetchCategories();
		fetchManufacturers();
	}, []);

	return (
		<div className="p-3">
			<div>
				<div className="row">
					<div className="col-12">
						<h4 className="mb-0">
							<strong>{busy ? "Updating: " : "Editing: "} </strong>
							{record.name}
						</h4>
					</div>
				</div>
				<hr />
				{busy ? (
					<Spinner2 />
				) : (
					<div>
						<div className="row">
							<div className="col-6 mb-3">
								<label htmlFor="name" className="d-form-label">
									Name *
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									className="d-form-control w-100"
									value={record.name}
									onChange={(e) => handleChange(e)}
								/>
							</div>
							<div className="col-6 mb-3">
								<label htmlFor="SKU" className="d-form-label">
									SKU
								</label>
								<input
									type="text"
									id="SKU"
									name="SKU"
									className="d-form-control w-100"
									value={record.SKU}
									onChange={(e) => handleChange(e)}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-6 mb-3">
								<label htmlFor="categoryId" className="d-form-label">
									Category *
								</label>
								<select
									type="text"
									id="categoryId"
									name="categoryId"
									required
									className="d-form-control w-100"
									value={record.categoryId}
									onChange={(e) => handleChange(e)}>
									{cats.map((c) => (
										<option value={c.id}>{c.name}</option>
									))}
								</select>
							</div>
							<div className="col-6 mb-3">
								<label htmlFor="manufacturerId" className="d-form-label">
									Manufacturer *
								</label>
								<select
									type="text"
									id="manufacturerId"
									name="manufacturerId"
									required
									className="d-form-control w-100"
									value={record.manufacturerId}
									onChange={(e) => handleChange(e)}>
									{mans.map((m) => (
										<option value={m.id}>{m.name}</option>
									))}
								</select>
							</div>
						</div>
						<div className="row">
							<div className="col-6 mb-3">
								<label htmlFor="purchasePrice" className="d-form-label">
									Purchase Price *
								</label>
								<input
									type="text"
									id="purchasePrice"
									name="purchasePrice"
									required
									className="d-form-control w-100"
									value={record.purchasePrice}
									onChange={(e) => handleChange(e)}
								/>
							</div>
							<div className="col-6 mb-3">
								<label htmlFor="regularPrice" className="d-form-label">
									Regular Price *
								</label>
								<input
									type="text"
									id="regularPrice"
									name="regularPrice"
									required
									className="d-form-control w-100"
									value={record.regularPrice}
									onChange={(e) => handleChange(e)}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-6 mb-3">
								<label htmlFor="newPrice" className="d-form-label">
									New Price *
								</label>
								<input
									type="text"
									id="newPrice"
									name="newPrice"
									required
									className="d-form-control w-100"
									value={record.newPrice}
									onChange={(e) => handleChange(e)}
								/>
							</div>
							<div className="col-6 mb-3">
								<label htmlFor="location" className="d-form-label">
									Location
								</label>
								<input
									type="text"
									id="location"
									name="location"
									className="d-form-control w-100"
									value={record.location}
									onChange={(e) => handleChange(e)}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-12 mb-3">
								<label htmlFor="description" className="d-form-label">
									Description
								</label>
								<textarea
									type="text"
									id="description"
									name="description"
									className="d-form-control w-100"
									value={record.description}
									onChange={(e) => handleChange(e)}></textarea>
							</div>
						</div>
						<div className="row">
							<div className="col-6 mb-3">
								<input
									type="checkbox"
									id="giftEligible"
									name="giftEligible"
									checked={record.giftEligible}
									onChange={(e) => handleChange(e)}
								/>
								<label htmlFor="giftEligible" className="ml-3">
									Gift Eligible
								</label>
							</div>
							<div className="col-6 mb-3">
								<input
									type="checkbox"
									id="freeDelivery"
									name="freeDelivery"
									checked={record.freeDelivery}
									onChange={(e) => handleChange(e)}
								/>
								<label htmlFor="freeDelivery" className="ml-3">
									Free Delivery
								</label>
							</div>
						</div>
						<div className="row">
							<div className="col-6 mb-3">
								<button
									className="btn-dc-white mb-3"
									onClick={() => document.getElementById("imageUrl").click()}>
									<i className="bi bi-image mr-1"></i>
									change image
								</button>
								<input type="file" name="imageUrl" id="imageUrl" hidden />
								<img
									src={record.imageUrl || placeholder}
									alt="product"
									style={{
										maxHeight: "200px",
										maxWidth: "190px",
									}}
								/>
							</div>
							<div className="col-6 mb-3">
								<button
									className="btn-dc-white mb-3"
									onClick={() => document.getElementById("videoUrl").click()}>
									<i className="bi bi-camera-video mr-1"></i>
									change video
								</button>
								<input type="file" name="videoUrl" id="videoUrl" hidden />
								<img
									src={record.videoUrl || placeholder}
									alt="product video"
									style={{
										maxHeight: "200px",
										maxWidth: "190px",
									}}
								/>
							</div>
						</div>
					</div>
				)}
				<hr />
				<div className="row">
					<div className="col-12">
						<button
							className="btn-dc-white"
							disabled={busy}
							onClick={() => updateRecord()}>
							<i className="bi bi-arrow-clockwise"></i>
							{busy ? "updating..." : "update record"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export { ProductEdit };
