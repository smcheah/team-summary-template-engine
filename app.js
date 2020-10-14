const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const whichRole = [
	{
		type: "checkbox",
		name: "roles",
		message: "which of the roles below are in your team?",
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
];

const questions = [
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
];

function roleQuestion(role) {
	if (role === "manager") {
		questions.push({
			type: "input",
			name: "officeNumber",
			message: "Office Number:",
		});
	}
	if (role === "engineer") {
		questions.push({
			type: "input",
			name: "github",
			message: "Github Username:",
		});
	}
	if (role === "intern") {
		questions.push({
			type: "input",
			name: "school",
			message: "School:",
		});
	}
}

async function init() {
	console.log(`
--------------------------------------------------------
TEAM SUMMARY TEMPLATE ENGINE

Answer the prompts to create your own team summary page!
--------------------------------------------------------`);

	try {
		const { roles } = await inquirer.prompt(whichRole);
        console.log(roles);

        roles.forEach(role => {
            await inquirer.prompt(questions);
            await inquirer.prompt(roleQuestion(role));
        })

	} catch (err) {
		console.log(`Error: ${err}`);
	}
}
init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

async function renderHTML() {}
render();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.


// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
