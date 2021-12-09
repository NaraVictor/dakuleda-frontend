import { format } from "date-fns";
import arraySort from "array-sort";

export const Products = [];

export const salesChartData = (sales) => {
	sales = arraySort(sales, "saleDate");
	if (sales.length > 5) {
		let counter = 0;
		while (sales.length < 5) {
			sales.push(sales[counter]);
			++counter;
		}
	}

	const chartLabels = sales.map((s) =>
		format(new Date(s.saleDate), "EEE, MMM d")
	);
	const values = sales.map((s) => s.total_amount);
	return {
		labels: chartLabels,
		datasets: [
			{
				label: "Sales",
				data: values,
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
				],
				borderWidth: 1,
			},
		],
	};
};
