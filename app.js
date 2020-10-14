const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// asks which role to input
function whichRole() {
	return inquirer.prompt([
		{
			type: "list",
			name: "role",
			message: "Which role would you like to input?",
			choices: [
				{
					name: "Manager",
					value: "manager",
				},
				{
					name: "Engineer",
					value: "engineer",
				},
				{
					name: "Intern",
					value: "intern",
				},
			],
		},
	]);
}
//default employee questions
function employeeQ() {
	return inquirer.prompt([
		{
			type: "input",
			name: "name",
			message: "Name:",
		},
		{
			type: "input",
			name: "id",
			message: "ID:",
		},
		{
			type: "input",
			name: "email",
			message: "Email:",
		},
	]);
}
// role specific employee questions
function managerQ() {
	return inquirer.prompt({
		type: "input",
		name: "officeNumber",
		message: "Office Number:",
	});
}
function engineerQ() {
	return inquirer.prompt({
		type: "input",
		name: "github",
		message: "Github Username:",
	});
}
function internQ() {
	return inquirer.prompt({
		type: "input",
		name: "school",
		message: "School:",
	});
}
function addAnother() {
	return inquirer.prompt({
		type: "confirm",
		name: "again",
		message: "Would you like to add another employee?",
	});
}

async function init() {
	console.log(`
--------------------------------------------------------
TEAM SUMMARY TEMPLATE ENGINE

Answer the prompts to customise your team summary page!
--------------------------------------------------------`);

	try {
		// prompts the user for input
		const input = await whichRole();
		const { name, id, email } = await employeeQ();

		// asks role specific question, then add employee to 'employees' array
		if (input.role === "manager") {
			const { officeNumber } = await managerQ();
			const manager = new Manager(name, id, email, officeNumber);
			employees.push(manager);
		} else if (input.role === "engineer") {
			const { github } = await engineerQ();
			const engineer = new Engineer(name, id, email, github);
			employees.push(engineer);
		} else {
			const { school } = await internQ();
			const intern = new Intern(name, id, email, school);
			employees.push(intern);
		}

		// asks if there is another employee to add
		const { again } = await addAnother();
		if (again === true) {
			return init(); // if yes, loops through init again
		} else {
			console.log(employees);
			// else, it renders the user input as html through 'htmlRenderer.js'
			// then outputs to the output folder
			fs.writeFile(outputPath, render(employees), (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log(
						`Success! HTML file created. Please see the output folder.`
					);
				}
			});
		}
	} catch (err) {
		console.log(`Error: ${err}`);
	}
}

const employees = [];

init();
