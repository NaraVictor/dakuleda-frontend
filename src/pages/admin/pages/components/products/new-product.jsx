// import imagePH from "../../../../../static/img/placeholder-image.png";
// import videoPH from "../../../../../static/img/video-placeholder.jpg";
import { useForm } from "react-hook-form";
import {
	postData,
	generateSlug,
	fetchData,
} from "./../../../../../helpers/utilities";
import { useState } from "react";
import { useEffect } from "react";

const NewProduct = (props) => {
	const { handleSubmit, reset, register } = useForm();
	const [busy, setBusy] = useState(false);
	const [categories, setCategories] = useState([]);
	const [manufacturers, setManufacturers] = useState([]);

	const fetchCategories = () => {
		fetchData("categories").then((res) => setCategories(res.data.data));
	};

	const fetchManufacturers = () => {
		fetchData("manufacturers").then((res) => setManufacturers(res.data.data));
	};

	useEffect(() => {
		fetchCategories();
		fetchManufacturers();
	}, []);

	const submitData = (data) => {
		setBusy(true);
		postData("products", { ...data })
			.then((res) => {
				if (res.status === 200) {
					reset();
					alert("product added successfully");
				}
			})
			.catch((ex) => alert("an error occurred"))
			.finally(() => setBusy(false));
	};

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center">
				<h5>New Product</h5>
				<button className="btn" onClick={() => props.history.go(-1)}>
					<span className="h5">
						<i className="bi bi-arrow-left-circle"></i> back
					</span>
				</button>
			</div>
			<hr />
			<div className="row">
				<div className="col-9">
					<button
						className={`${
							busy ? "btn-dc-white" : "btn-primary-filled"
						} px-4 py-2`}
						disabled={busy}
						onClick={() => document.getElementById("submitter").click()}>
						<i className="bi bi-check-all"></i>
						{busy ? "processing..." : "Submit"}
					</button>
				</div>
				<div className="col-3">
					<span className="mr-2">upload:</span>
					<button
						className="btn-dc-white"
						onClick={() => document.getElementById("productImage").click()}>
						<i className="bi bi-image mr-1"></i>
						image
					</button>
					<button
						className="btn-dc-white"
						onClick={() => document.getElementById("productVideo").click()}>
						<i className="bi bi-camera-video mr-1"></i>
						video
					</button>
				</div>
			</div>
			<hr />

			<form onSubmit={handleSubmit(submitData)}>
				<div className="row">
					<div className="col-9">
						<div className="row">
							<div className="col-md-9 col-12">
								<label htmlFor="name" className="d-form-label">
									Product Name *
								</label>
								<input
									type="text"
									id="name"
									required
									className="d-form-control w-100 shadow"
									{...register("name", { required: true })}
								/>
							</div>
							<div className="col-md-3 col-12">
								<label htmlFor="purchasePrice" className="d-form-label">
									Purchase Price *
								</label>
								<input
									type="text"
									id="purchasePrice"
									className="d-form-control w-100 shadow"
									required
									{...register("purchasePrice", { required: true })}
								/>
							</div>
						</div>
						<div className="row my-2">
							<div className="col-md-4 col-12">
								<label htmlFor="regularPrice" className="d-form-label">
									Regular Price *
								</label>
								<input
									type="text"
									id="regularPrice"
									required
									className="d-form-control w-100 shadow"
									{...register("regularPrice", { required: true })}
								/>
							</div>

							<div className="col-md-4 col-12">
								<label htmlFor="newPrice" className="d-form-label">
									New Price *
								</label>
								<input
									type="text"
									id="newPrice"
									required
									className="d-form-control w-100 shadow"
									{...register("newPrice", { required: true })}
								/>
							</div>
							<div className="col-md-4 col-12">
								<label htmlFor="location" className="d-form-label">
									Product Location
								</label>
								<input
									type="text"
									id="location"
									className="d-form-control w-100 shadow"
									{...register("location")}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-4 col-12">
								<label htmlFor="SKU" className="d-form-label">
									SKU
								</label>
								<input
									type="text"
									id="SKU"
									className="d-form-control w-100 shadow"
									{...register("SKU")}
								/>
							</div>

							<div className="col-md-4 col-12">
								<label htmlFor="category" className="d-form-label">
									Category *
								</label>
								<select
									name="category"
									id="category"
									required
									{...register("categoryId", { required: true })}
									className="d-form-control w-100 shadow">
									<option value="">select a category</option>
									{categories.map((cats) => (
										<option value={cats.id} key={cats.id}>
											{cats.name}
										</option>
									))}
								</select>
							</div>
							<div className="col-md-4 col-12">
								<label htmlFor="manufacturer" className="d-form-label">
									Manufacturer *
								</label>
								<select
									name="manufacturer"
									id="manufacturer"
									required
									{...register("manufacturerId", { required: true })}
									className="d-form-control w-100 shadow">
									<option value="">select a manufacturer</option>
									{manufacturers.map((man) => (
										<option value={man.id} key={man.id}>
											{man.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="row my-2">
							<div className="col-12">
								<label htmlFor="description" className="d-form-label">
									Description
								</label>
								<textarea
									type="text"
									id="description"
									{...register("description")}
									className="d-form-control w-100 shadow"></textarea>
							</div>
						</div>
						<hr />
						<div className="row my-2">
							<div className="col-md-4 col-12">
								<input
									type="checkbox"
									{...register("giftEligible")}
									name="giftEligible"
									id="giftEligible"
								/>
								<label htmlFor="giftEligible" className="ml-2">
									Gift Eligible
								</label>
							</div>
							<div className="col-md-4 col-12">
								<input
									type="checkbox"
									{...register("freeDelivery")}
									name="freeDelivery"
									id="freeDelivery"
								/>
								<label htmlFor="freeDelivery" className="ml-2">
									Free Delivery
								</label>
							</div>
						</div>
						{/* <p>
							<strong>Generated Slug</strong>: {generateSlug("product name")}
						</p> */}
					</div>

					<div className="col-3">
						<p>features</p>
						<hr />
						<p>gallery</p>
					</div>
				</div>
				<input
					type="file"
					accept=".png, .jpg, .jpeg, .gif"
					name="productImage"
					id="productImage"
					hidden
				/>
				<input
					type="file"
					accept=".mp4, .mov, .ogg, .avi, .mpeg4"
					name="productVideo"
					id="productVideo"
					hidden
				/>
				<input hidden type="submit" id="submitter" />
			</form>
		</div>
	);
};

export { NewProduct };
