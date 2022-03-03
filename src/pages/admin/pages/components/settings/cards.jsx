import { Link } from "react-router-dom";
import { Spinner2 } from "../../../../../components/spinner";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../../helpers/utilities";
import { CardDetail } from "./card-detail";
import { CardEdit } from "./card-edit";
import { getRole } from "../../../../../helpers/auth";
const CardsComponent = (props) => {
	const [cards, setCards] = useState([]);
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

	const fetchCards = () => {
		fetchData("cards").then((res) => setCards(res.data.data));
	};
	useEffect(() => {
		fetchCards();
	}, []);

	return (
		<div className="components">
			{getRole() === "admin" && (
				<div className="buttons my-4">
					<Link className="btn-dc-white p-2" to="/admin/settings/new-card">
						<i className="bi bi-plus"></i>
						add card
					</Link>
				</div>
			)}
			<div className="row">
				<div className="col-5">
					{cards.length === 0 ? (
						<Spinner2 />
					) : (
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th>Title</th>
									<th># Codes</th>
									<th>Value</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{cards.map((card) => (
									<tr
										key={card.id}
										onClick={() => selectItem(card)}
										className={`${card.id === selected.id && "bg-info"}`}>
										<td>{card.title}</td>
										<td>{card.codes.length}</td>
										<td>
											{card.isFixedValue ? (
												<span>₵ {card.fixedValue}</span>
											) : (
												<span>{card.percentageValue * 100} %</span>
											)}
										</td>
										<td
											className={`${
												card.isDeleted ? "bg-danger" : "bg-success"
											} text-white`}>
											<strong>{card.isDeleted ? "Inactive" : "Running"}</strong>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
				<div className="col-7">
					<div className="shadow detail-view">
						{mode.edit ? (
							<CardEdit obj={mode.data} onReload={fetchCards} />
						) : (
							<CardDetail
								card={selected}
								onEdit={handleEdit}
								onReload={() => {
									fetchCards();
									setSelected({});
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export { CardsComponent };
