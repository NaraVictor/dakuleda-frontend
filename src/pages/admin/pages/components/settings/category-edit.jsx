import { updateData, uploadFile } from "../../../../../helpers/utilities";
import { useState } from "react";
import { Spinner2 } from "../../../../../components/spinner";
import placeholder from "../../../../../static/img/placeholder-image.png";
import { generateFileUrl } from "./../../../../../helpers/utilities";

const CategoryEdit = ({ obj, onReload, onEdit }) => {
	const [record, setRecord] = useState({
		id: obj.id,
		name: obj.name,
		description: obj.description,
		imageFileName: obj.imageFileName,
	});
	const [busy, setBusy] = useState(false);
	const [image, setImage] = useState({
		file: {},
		url: "",
	});

	const imageUpload = (e) => {
		if (e.target.value) {
			setImage({
				file: e.target.files,
				url: URL.createObjectURL(e.target.files[0]),
			});

			uploadFile(
				`categories/${record.id}/upload-picture`,
				e.target.files[0],
				"categoryImage"
			).then((res) => {
				if (res?.status === 200) {
					alert("image successfully changed");
					onReload(true);
					return;
				}
			});

			return;
		}
		alert("image update failed");
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setRecord({
			...record,
			[name]: value,
		});
	};

	const updateRecord = () => {
		setBusy(true);
		updateData(`categories`, { ...record })
			.then((res) => {
				onReload(true);
				alert("category update successful");
			})
			.finally(() => setBusy(false));
	};

	return (
		<div className="p-3">
			<div>
				<div className="row">
					<div className="col-12">
						<h4 className="mb-0">
							<strong>{busy ? "Updating: " : "Editing: "} </strong> {obj.name}
						</h4>
					</div>
				</div>
				<hr />
				{busy ? (
					<Spinner2 />
				) : (
					<div className="row">
						<div className="col-12 mb-3">
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

						<div className="col-12 mb-3">
							<label htmlFor="description" className="d-form-label">
								Description
							</label>
							<input
								type="text"
								id="description"
								name="description"
								required
								className="d-form-control w-100"
								value={record.description}
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className="col-12 mb-3">
							<button
								className="btn-dc-white"
								onClick={() => document.getElementById("catImg").click()}>
								<i className="bi bi-image mr-1"></i>
								change image
							</button>
							<input
								type="file"
								name="catImg"
								id="catImg"
								onChange={imageUpload}
								hidden
							/>
						</div>

						<div className="col-12">
							{!image.url && (
								<img
									src={generateFileUrl(record.imageFileName) || placeholder}
									alt="category"
									id="categoryImage"
									style={{
										maxHeight: "200px",
										maxWidth: "300px",
									}}
								/>
							)}
							{image.url && (
								<img
									src={image.url}
									alt="category"
									id="updatedImage"
									style={{
										maxHeight: "200px",
										maxWidth: "300px",
									}}
								/>
							)}
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

export { CategoryEdit };
