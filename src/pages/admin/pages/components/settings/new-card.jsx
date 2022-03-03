import { useForm } from "react-hook-form";
import { postData, uploadFile } from "../../../../../helpers/utilities";
import { useState, useContext } from "react";
import AppModal from "./../../../../../components/modal";
import { NewCardCodes } from "./new-card-codes";
import { shopContext } from "./../../../../../context/shopContext";
const NewCard = (props) => {
	const ctx = useContext(shopContext);
	const { register, handleSubmit, reset } = useForm();
	const [busy, setBusy] = useState(false);
	const [isFixed, setIsFixed] = useState(false);
	const [value, setValue] = useState({
		fixedValue: "",
		percentageValue: "",
	});

	const [image, setImage] = useState({
		file: {},
		url: "",
	});

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

	const imageUpload = (e) => {
		if (e.target.value) {
			setImage({
				file: e.target.files,
				url: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	const submitData = (data) => {
		setBusy(true);

		// ensure user has uploaded a card image
		if (image.url === "") {
			alert("please upload a card picture");
			setBusy(false);

			return;
		}

		if ((value.fixedValue === "" || 0) && (value.percentageValue === "" || 0)) {
			alert("card must either have a fixed or percentage value");
			setBusy(false);

			return;
		}

		if (
			(value.fixedValue !== "" || value.fixedValue > 0) &&
			(value.percentageValue !== "" || value.percentageValue > 0)
		) {
			alert("card cannot have both fixed and percentage values");
			setBusy(false);

			return;
		}

		postData("cards", {
			...data,
			isFixedValue: isFixed,
			...value,
			codes: ctx.getCodes(),
		})
			.then((res) => {
				if (res.status === 200) {
					uploadFile(
						`cards/${res.data.data.id}/upload-picture`,
						image.file[0],
						"cardImage"
					)
						.then((res) => {
							if (res.status === 200) {
								reset();
								setImage({
									file: {},
									url: "",
								});
								setValue({
									fixedValue: "",
									percentageValue: "",
								});
								ctx.resetCodes();
								alert("card created successfully");
							} else {
								throw new Error();
							}
						})
						.catch((ex) => alert("Card image not uploaded"));
				} else {
					throw new Error();
				}
			})
			.catch((ex) => alert("Error. Card not created"))
			.finally(() => setBusy(false));
	};
	return (
		<div>
			<AppModal
				title={modal.title}
				onClose={toggleModal}
				open={modal.open}
				containerClass={modal.size}>
				{modal.content}
			</AppModal>
			<div className="d-flex justify-content-between align-items-center">
				<div>
					<h5>New Card</h5>
					<small>
						<strong>{ctx.getCodes().length} </strong>code(s) added
					</small>{" "}
				</div>
				<button className="btn" onClick={() => props.history.go(-1)}>
					<span className="h5">
						<i className="bi bi-arrow-left-circle"></i> back
					</span>
				</button>
			</div>
			<hr />
			<div className="d-flex justify-content-between">
				<button
					className={`${
						busy ? "btn-dc-white" : "btn-primary-filled"
					} px-4 py-2`}
					disabled={busy}
					onClick={() => document.getElementById("submitter").click()}>
					<i className="bi bi-check-all"></i>
					{busy ? "processing..." : "Submit"}
				</button>

				<div>
					<button
						className="btn-dc-white"
						onClick={() => toggleModal(<NewCardCodes />, "Add Codes")}>
						<i className="bi bi-plus mr-2"></i>
						add codes
					</button>

					<button
						className="btn-dc-white"
						onClick={() => document.getElementById("cardImage").click()}>
						<i className="bi bi-image mr-1"></i>
						upload image
					</button>
				</div>
			</div>
			<hr />

			<form onSubmit={handleSubmit(submitData)}>
				<div className="row">
					<div className="col-md-7">
						<div className="row">
							<div className="col-6">
								<label htmlFor="title" className="d-form-label">
									Title *
								</label>
								<input
									type="text"
									id="title"
									required
									{...register("title", { required: true })}
									className="d-form-control w-100 shadow"
								/>
							</div>
							<div className="col-6">
								<label htmlFor="title" className="d-form-label">
									Vendor Code *
								</label>
								<input
									type="text"
									id="vendorCode"
									required
									{...register("vendorCode", { required: true })}
									className="d-form-control w-100 shadow"
								/>
							</div>
							{/* <div className="col-4">
								<label htmlFor="amount" className="d-form-label">
									Minimum Purchase Amount
								</label>
								<input
									type="number"
									step="0.1"
									placeholder="0.0"
									id="minimumPurchaseAmount"
									{...register("minimumPurchaseAmount")}
									className="d-form-control w-100 shadow"
								/>
							</div> */}
						</div>
						<div className="row my-3">
							<div className="col-6">
								<label htmlFor="startDate" className="d-form-label">
									Start Date *
								</label>
								<input
									type="date"
									id="startDate"
									className="d-form-control w-100 shadow"
									{...register("startDate", { required: true })}
								/>
							</div>
							<div className="col-6">
								<label htmlFor="endDate" className="d-form-label">
									End Date *
								</label>
								<input
									type="date"
									id="endDate"
									className="d-form-control w-100 shadow"
									{...register("endDate", { required: true })}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<label htmlFor="descripton" className="d-form-label">
									Description
								</label>
								<textarea
									type="text"
									id="descripton"
									className="d-form-control w-100 shadow"
									{...register("description")}></textarea>
							</div>
						</div>
						<hr />
						<div className="mb-2">How is worth of card calculated?:</div>
						<div className="row">
							<div className="col-md-4 col-12">
								<input
									type="radio"
									id="fixed"
									onClick={() => setIsFixed(true)}
									name="cardWorth"
									value="true"
								/>
								<label htmlFor="fixed" className="ml-2">
									Fixed Value
								</label>
							</div>
							<div className="col-md-4 col-12">
								<input
									type="radio"
									id="percentage"
									name="cardWorth"
									onClick={() => setIsFixed(false)}
									value="false"
								/>
								<label htmlFor="percentage" className="ml-2">
									Percentage Value
								</label>
							</div>
						</div>
						<div className="row">
							<div className="col-6">
								{isFixed && (
									<>
										<label htmlFor="fixedValue" className="d-form-label">
											Fixed Value (input amount)
										</label>
										<input
											type="number"
											step="0.1"
											placeholder="0.0"
											id="fixedValue"
											className="d-form-control w-100 shadow"
											value={value.fixedValue}
											onChange={(e) =>
												setValue({
													...value,
													fixedValue: e.target.value,
												})
											}
										/>
									</>
								)}
								{!isFixed && (
									<>
										<label htmlFor="percentageValue" className="d-form-label">
											Percentage Value (input percentage without symbol e.g 9)
										</label>
										<input
											type="number"
											step="0.1"
											placeholder="0.0"
											id="percentageValue"
											className="d-form-control w-100 shadow"
											value={value.percentageValue}
											onChange={(e) =>
												setValue({
													...value,
													percentageValue: e.target.value,
												})
											}
										/>
									</>
								)}
							</div>
						</div>
					</div>
					<div className="col-md-5">
						{image.url && (
							<img
								src={image.url}
								alt="slider img"
								style={{
									maxHeight: "250px",
								}}
							/>
						)}
					</div>
				</div>
				<input hidden type="submit" id="submitter" />
			</form>
			<input
				type="file"
				name="cardImage"
				id="cardImage"
				onChange={(e) => imageUpload(e)}
				hidden
				accept=".jpg, .png, .gif, .jpeg"
			/>
		</div>
	);
};

export { NewCard };
