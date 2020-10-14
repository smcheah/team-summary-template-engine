const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// const util = require('util');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// const writeFileAsync = util.promisify(fs.writeFile);

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
		const input = await whichRole();
        const { name, id, email } = await employeeQ();
        
		if (input.role === "manager") {
		    const { officeNumber } = await managerQ();
		    const manager = new Manager(name, id, email, officeNumber)
		    employees.push(manager)
		} else if (input.role === "engineer") {
		    const { github } = await engineerQ();
		    const engineer = new Engineer(name, id, email, github)
		    employees.push(engineer)
		} else {
		    const { school } = await internQ();
		    const intern = new Intern(name, id, email, school)
		    employees.push(intern)
        }
        
        const { again } = await addAnother();
        if (again === true) {
            return init();
        } else {
            console.log(employees)
            // render(employees);
            fs.writeFile(outputPath, render(employees), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Success! HTML file created. Please see the output folder.`)
                }
            })
        }
	} catch (err) {
		console.log(`Error: ${err}`);
	}
}

const employees = [];

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

async function renderHTML() {
    try {
        

        fs.writeFileSync( outputPath, employees, function(err) {
            if (err) throw err;
            console.log(`RENDERHTML and write file IS RUNNING`)
        })
        // , function (err) {
        //     if (err) throw err;
        // })
    } catch (err) {
        console.log(`Error: ${err}`);
    }
}
// renderHTML();



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
