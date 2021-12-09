import { deleteData } from "./../../../../../helpers/utilities";
import placeholder from "../../../../../static/img/placeholder-image.png";

const SliderDetail = ({ slider, onDone }) => {
	console.log(slider);
	const deleteSlider = () => {
		deleteData(`sliders/${slider.id}`).then((res) => onDone);
	};
	return (
		<div className="p-3">
			{!slider.hasOwnProperty("id") ? (
				<p>Select a slider</p>
			) : (
				<div>
					<div className="row">
						<div className="col-12">
							<h3 className="mb-0">{slider.title}</h3>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-12">
							<p>
								<strong>Description:</strong> {slider.description}
							</p>
							<p>
								<strong>Url:</strong> {slider.url}
							</p>
							<p>
								<strong>Has a button:</strong> {slider.hasButton ? "Yes" : "No"}
							</p>
							{slider.hasButton && (
								<p>
									<strong>Button Text:</strong> {slider.buttonText}
								</p>
							)}
							<img
								src={slider.imageUrl || placeholder}
								alt="slider"
								style={{
									maxHeight: "200px",
									maxWidth: "350px",
								}}
							/>
						</div>
					</div>
					<hr />
					<div className="row">
						<button className="btn-dc-white">
							<i className="bi bi-arrow-clockwise"></i>
							update
						</button>

						<button className="btn-dc-white" onClick={() => deleteSlider()}>
							<i className="bi bi-trash"></i>
							delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export { SliderDetail };
