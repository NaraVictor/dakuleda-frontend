import * as yup from "yup";
import axios from "axios";
import { urls } from "./config";
import { getToken } from "./auth";
import { getYear } from "date-fns";
import XLSX from "xlsx";

// default url
export const appUrl = urls.devApi;

export const validateSignUp = (data) => {
	const schema = yup.object().shape({
		email: yup.string().email().lowercase().required(),
		username: yup.string().min(3).required(),
		password: yup.string().min(5).required(),
	});

	return schema.isValid(data, { stripUnknown: true });
};

export const validateLogin = (data) => {
	const schema = yup.object().shape({
		email: yup.string().min(3).lowercase().required(),
		password: yup.string().min(5).required(),
	});

	return schema.isValid(data);
};

export const fetchData = async (url = "", auth = false, config) => {
	try {
		if (auth) {
			axios.defaults.headers.common["authorization"] = getToken();
		}
		const res = await axios.get(`${appUrl}/${url}`, config);
		return res;
	} catch (ex) {
		return ex;
	}
};

export const postData = async (url = "", data = {}, auth = true, config) => {
	try {
		if (auth) {
			axios.defaults.headers.common["authorization"] = getToken();
		}
		const res = await axios.post(`${appUrl}/${url}`, data, config);
		return res;
	} catch (ex) {
		return ex;
	}
};

export const updateData = async (url = "", data = {}, auth = true, config) => {
	try {
		if (auth) {
			axios.defaults.headers.common["authorization"] = getToken();
		}
		const res = await axios.put(`${appUrl}/${url}`, data, config);
		return res;
	} catch (ex) {
		return ex;
	}
};

export const deleteData = async (url = "", auth = true, config) => {
	try {
		if (auth) {
			axios.defaults.headers.common["authorization"] = getToken();
		}
		const res = await axios.delete(`${appUrl}/${url}`, config);
		return res;
	} catch (ex) {
		return ex;
	}
};

export const toUrl = (text) => {
	// let url;
	// for ( let index = 0; index < text.length; index++ )
	// {
	// 	if ( text[ index ] === " " || "" )
	// 	{
	// no time
	// 	}
	// }

	if (text === undefined || text.length === 0 || text === "") return;
	return text.trim().toLowerCase().replace(" ", "-");
};

export const cedisLocale = Intl.NumberFormat("en-GH");

export const exportToExcel = (
	tableId,
	fileName = "Dakuleda Workbook",
	sheetName = "sheet1"
) => {
	try {
		var elt = document.getElementById(tableId);
		var wb = XLSX.utils.table_to_book(elt, { sheet: sheetName });
		return XLSX.writeFile(wb, `${fileName}.xlsx`);
	} catch (ex) {
		alert("there was an error");
		console.log(ex);
	}
};

export const toTitleCase = (word) => {
	let firstChar = word.slice(0, 1),
		remainder = word.slice(1);

	return `${firstChar.toUpperCase()}${remainder.toLowerCase()}`;
};

export const generateSlug = (text) => {
	if (!text) return;
	let slug = text.toLowerCase();
	slug = slug.replace(/\s+/g, "-");
	return slug;
};