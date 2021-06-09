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
                    viewEmployee();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        })
};

const viewDepartment = () => {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.log("displaying all departments");
        console.table(results);
        mainHub();
    });
};


