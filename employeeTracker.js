const mysql = require('mysql');
const inquirer = require('inquirer');

// creating connection to mysql
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,
    user: 'root',

    password: 'SECRET',
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
            'View employees?',
            "Update Employess?"
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
                
                case 'Update Employess?':
                    updateEmployee();
                    break;    

                default:
                    console.log(`Invalid action: ${answer.initial}`);
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
    connection.query('SELECT * FROM department', (err, results) =>{
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
                    results.forEach(({name}) => {
                        departmentChoice.push(name);
                    });
                    return departmentChoice;
                },
                message: 'what department would you like to choose?',
            },
        ])
        .then((answer) => {
            let chosenDepartment;
            results.forEach((role) =>{
                if(role.name === answer.department){
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

// adds new employee to list 
const addEmployee = () => {
    connection.query('SELECT * FROM employees, role', (err, results) =>{
        if (err) throw err;
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "Please input the first name of new employee?",
            }, {
                name: "last_name",
                type: "input",
                message: "Please input the last name of new employee?",
            },
            {
                name: 'role',
                type: 'rawlist',
                choices(){
                    const roleChoice = [];
                    results.forEach(({title}) => {
                        roleChoice.push(title);
                    });
                    // easers copies that were being generated
                    let clearRoleChoice = [...new Set(roleChoice)];
                    return clearRoleChoice;
                },
                message: 'what role would you like to choose?',
            },
        ])
        .then((answer) => {
            let chosenRole;
            results.forEach((role) =>{
                if(role.title === answer.role){
                    chosenRole = role;
                }
            })

            connection.query('INSERT INTO employees SET ?',
            {
                first_name: answer.first_name, 
                last_name: answer.last_name,
                role_id: chosenRole.id,
            },
            (error) => {
                if (error) throw err;
                console.log('Employee added successfully!');
                mainHub();
              });
        })
    });
}

// allows user to add department to SQL
const addDepartment = () => {
    connection.query('SELECT * FROM department', (err, results) =>{
        if (err) throw err;
        inquirer.prompt([
            {
                name: "department",
                type: "input",
                message: "Please input the name for new Department?",
            }    
        ])
        .then((answer) => {

            connection.query('INSERT INTO department SET ?',
            {
                name: answer.department
            },
            (error) => {
                if (error) throw err;
                console.log('Department added successfully!');
                mainHub();
              });
        })
    });
}

const updateEmployee = () => {
    connection.query('SELECT * FROM employees, role', (err, results) =>{
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'employee',
                type: 'rawlist',
                choices(){
                    const employeeChoice = [];
                    results.forEach(({last_name}) => {
                        employeeChoice.push(last_name);
                    });
                    // easers copies that were being generated
                    let clearemployeeChoice = [...new Set(employeeChoice)];
                    return clearemployeeChoice;
                },
                message: 'Which employee would you like to update?'
            },
            {
                name: 'role',
                type: 'rawlist',
                choices(){
                    const roleChoice = [];
                    results.forEach(({title}) => {
                        roleChoice.push(title);
                    });
                    // easers copies that were being generated
                    let clearRoleChoice = [...new Set(roleChoice)];
                    return clearRoleChoice;
                },
                message: 'what role would you like to update?'
            }
        ])
        .then((answer) => {
            let chosenEmployee;
            let chosenRole;
            results.forEach((employee) =>{
                if(employee.last_name === answer.employee){
                    chosenEmployee = employee;
                }
            })
            results.forEach((role) =>{
                if(role.title === answer.role){
                    chosenRole = role;
                }
            })

            connection.query('UPDATE employees SET ? WHERE ?',
            [
                {
                    role_id: chosenRole,
                },
                {
                    last_name:chosenEmployee,
                }
            ],
            (error) => {
                if (error) throw err;
                console.log('Employee updated successfully!');
                mainHub();
              });
        })
    });
}