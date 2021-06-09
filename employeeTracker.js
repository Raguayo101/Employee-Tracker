const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'employee_trackerDB',
});

connection.connect((err) => {
  if (err) throw err;
});

const mainHub = () =>{
    inquirer.prompt({
        name: 'initial',
        type: 'list',
        message: 'Which of the following would you like to do?',
        choices: [
            'Add an additional department?',
            'Add an additional role?',
            "Add an additoinal employee?",
            "View a department?",
            'View one of the roles?',
            'View one of the employees?'
        ]
    })
    .then((answer) => {
        switch(answer.initial){
            
        }
    })
}