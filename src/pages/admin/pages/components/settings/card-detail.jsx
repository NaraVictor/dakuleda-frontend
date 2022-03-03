import { deleteData, generateFileUrl } from "../../../../../helpers/utilities";
import { format } from "date-fns";
import { useState } from "react";
import AppModal from "./../../../../../components/modal";
import { CardCodes } from "./codes";
import { getRole } from "../../../../../helpers/auth";

const CardDetail = ({ card, onReload, onEdit }) => {
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

	const deleteCard = () => {
		deleteData(`cards/${card.id}`).then((res) => onReload());
	};
	return (
		<div className="p-3">
			{!card.hasOwnProperty("id") ? (
				<p>Select a card</p>
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
							<h3 className="mb-0">{card.title}</h3>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-12">
							<p>
								<strong>Vendor Code:</strong> {card.vendorCode}
							</p>
							<p>
								<strong>Number of codes:</strong> {card.codes.length}
							</p>
							<p>
								<strong>Card Value: </strong>
								{card.isFixedValue ? (
									<span>₵ {card.fixedValue}</span>
								) : (
									<span>{card.percentageValue * 100} %</span>
								)}
							</p>
							<p>
								<strong>Start Date:</strong>{" "}
								{format(new Date(card.startDate), "EEEE, MMMM d yyyy")}
							</p>
							<p>
								<strong>End Date:</strong>{" "}
								{format(new Date(card.endDate), "EEEE, MMMM d yyyy")}
							</p>

							<p>
								<strong>Description:</strong> {card.description}
							</p>
							<hr />
							<img
								src={generateFileUrl(card.imageFileName)}
								style={{
									maxHeight: "200px",
								}}
								alt=""
							/>
						</div>
					</div>
					<hr />
					<div className="d-flex justify-content-between">
						{getRole() === "admin" && (
							<div>
								<button
									className="btn-dc-white"
									onClick={() => onEdit(card, true)}>
									<i className="bi bi-pencil"></i>
									edit
								</button>

								<button className="btn-dc-white" onClick={() => deleteCard()}>
									{!card.isDeleted ? (
										<>
											<i className="bi bi-x-circle-fill mr-1"></i>
											stop
										</>
									) : (
										<>
											<i className="bi bi-play-fill mr-1"></i>
											start
										</>
									)}
								</button>
							</div>
						)}
						<div>
							<button
								className="btn-dc-white"
								onClick={() =>
									toggleModal(<CardCodes cardId={card.id} />, "Card Codes")
								}>
								<i className="bi bi-list-ol mr-2"></i>
								codes
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export { CardDetail };
