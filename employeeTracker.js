const mysql = require('mysql');
const inquirer = require('inquirer');

// creating connection to mysql
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,
    user: 'root',

    password: 'PLEASEloveme101!',
    database: 'employee_trackerdb',
});

connection.connect((err) => {
    if (err) throw err;
    mainHub();
});

// inital questions user will be prompted to answer when starting program
const mainHub = () => {
    inquirer.prompt({
        name: 'initial',
        type: 'list',
        message: 'Which of the following would you like to do?',
        choices: [
            'Add an additional department?',
            'Add an additional role?',
            "Add an additoinal employee?",
            "View departments?",
            'View roles?',
            'View employees?'
        ]
    })
        .then((answer) => {
            switch (answer.initial) {
                case 'Add an additional department?':
                    addDepartment();
                    break;

                case 'Add an additional role?':
                    addRole();
                    break;

                case 'Add an additoinal employee?':
                    addEmployee();
                    break;

                case 'View departments?':
                    viewDepartment();
                    break;

                case 'View roles?':
                    viewRole();
                    break;

                case 'View employees?':
                    viewEmployees();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        })
};

// allows the user to view all the departments and then returns them to the mainHub
const viewDepartment = () => {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.log("displaying all departments");
        console.table(results);
        mainHub();
    });
};
// Allows user to view all roles and then returns them to the mainHub
const viewRole = () => {
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        console.log("displaying all roles");
        console.table(results);
        mainHub();
    });
};

// Allows user to view all employees and then returns them to the mainHub
const viewEmployees = () => {
    connection.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        console.log("displaying all employees");
        console.table(results);
        mainHub();
    });
};

// adds an additonal role to our SQL
const addRole = () => {
    connection.query('SELECT * FROM role', (err, results) =>{
        if (err) throw err;
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "Please input the title for the new role?",
            }, {
                name: "salary",
                type: "input",
                message: "Please input the new salary for the new role?",
            },
            {
                name: 'department',
                type: 'rawlist',
                choices(){
                    const departmentChoice = [];
                    results.forEach(({title}) => {
                        departmentChoice.push(title);
                    });
                    return departmentChoice;
                },
                message: 'what department would you like to choose?'
            },
        ])
        .then((answer) => {
            let chosenDepartment;
            results.forEach((role) =>{
                if(role.title === answer.department){
                    chosenDepartment = role;
                }
            })

            connection.query('INSERT INTO role SET ?',
            {
                title: answer.title, 
                salary: answer.salary,
                department_id: chosenDepartment.id
            },
            (error) => {
                if (error) throw err;
                console.log('Role added successfully!');
                mainHub();
              });
        })
    });
}
