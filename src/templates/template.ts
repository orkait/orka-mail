import Ajv from "ajv";
import path from "path";
import fs from "fs";

const ajv = new Ajv();

export const templateDirectory = path.join("./templates");

const lookup = (templateName: string) => {
	// nodejs check file in directory4
	const filePath = path.join(templateDirectory, templateName);

	// check if file exists
	if (fs.existsSync(filePath)) {
		// return file path
		return filePath;
	}
	return "";
};