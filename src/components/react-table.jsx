import { useMemo } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import GlobalFilter from "./global-filter";
import { Spinner2 } from "./spinner";
// import { cedisLocale } from "./../helpers/utilities";

// [
// 	{
// 		Header: "Name",
// 		accessor: "name",
// 	},
// ];

const ReactTable = ({ data, columns, tableId }) => {
	data = useMemo(() => [...data], [data]);
	columns = useMemo(() => [...columns], []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		preGlobalFilteredRows,
		setGlobalFilter,
		state,
	} = useTable({ columns, data }, useGlobalFilter, useSortBy);

	return (
		<div>
			{rows.length < 1 ? (
				<Spinner2 />
			) : (
				<>
					<div className="row">
						<div className="col-8">
							<GlobalFilter
								preGlobalFilteredRows={preGlobalFilteredRows}
								setGlobalFilter={setGlobalFilter}
								globalFilter={state.globalFilter}
							/>
						</div>
						<div className="col-4">
							<p>
								<strong>{data.length}</strong> records
							</p>
						</div>
					</div>
					<table
						{...getTableProps}
						className="table table-striped table-hover"
						id={tableId}>
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column) => (
										<th
											{...column.getHeaderProps(column.getSortByToggleProps())}>
											{column.render("Header")}
											{column.isSorted && (column.isSortedDesc ? " 🔽" : " 🔼")}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{rows.map((row) => {
								prepareRow(row);
								return (
									<tr {...row.getRowProps()} key={row.id}>
										{row.cells.map((cell) => (
											<td {...cell.getCellProps()}>{cell.value}</td>
										))}
									</tr>
								);
							})}
						</tbody>
					</table>
				</>
			)}
		</div>
	);
};

export default ReactTable;
