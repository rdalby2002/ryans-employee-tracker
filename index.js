// Import necessary packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Creates mysql connection
const db = mysql.createConnection(
  {
    // My host server, since I have to use MAMP to get MySQL to work on my computer. If you use MySQL natively, replace 127.0.0.1 with localhost
    host: '127.0.0.1',
    // MySQL username
    user: 'root',
    // MAMP MySQL password. Replace with your personal MySQL password.
    password: 'root',
    database: 'employee_db',
    // MAMP connects to MySQL at a different port than what's standard, 3306. Upon cloning and if your use case is as mentioned above, you should be able to delete this line entirely.
    port: 8889
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

// Function that's called when the app is first run, gives users the initial command prompt and contains a switch case pertaining to each answer.
const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please select from the following options:",
        name: "initialize",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "I'm finished"
        ]
      }
    ]).then(ans => {
      switch (ans.initialize) {
        case "View all departments": viewDept();
          break;
        case "View all roles": viewRoles();
          break;
        case "View all employees": viewEmployees();
          break;
        case "Add a department": addDept();
          break;
        case "Add a role": addRole();
          break;
        case "Add an employee": addEmployee();
          break;
        case "Update an employee role": updateEmployee();
          break;
        case "I'm finished":
          console.log("Thank you very much!");
          process.exit();
      }
    }).catch(err => console.error(err));
}

// Init function call
init();

// viewDebt uses a SQL query to log a table of all departments in the database in the console, then redirects to the init prompt.
const viewDept = () => {
  db.query(`SELECT * FROM department`, (err, results) => {
    err ? console.error(err) : console.table(results);
    init();
  })
};

// viewRoles uses a sequel query to log all roles in the console, then redirects to the init prompt.
const viewRoles = () => {
  db.query(`SELECT * FROM role`, (err, results) => {
    err ? console.error(err) : console.table(results);
    init();
  })
};

// viewEmployees uses a sequel query to log a table of all employee values in the console, then redirects to the init prompt.
const viewEmployees = () => {
  db.query(`SELECT * FROM employee`, (err, results) => {
    err ? console.error(err) : console.table(results);
    init();
  })
};

const addDept = () => {
  // Inquirer prompt gets the name of the new department to be added
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you'd like to add?",
        name: "addDept"
      }
    ]).then(ans => {
      // SQL query inserts the new department into the department table
      db.query(`INSERT INTO department(name)
                    VALUES(?)`, ans.addDept, (err, results) => {
        if (err) {
          console.log(err)
        } else {
          db.query(`SELECT * FROM department`, (err, results) => {
            err ? console.error(err) : console.table(results);
            init();
          })
        }
      }
      )
    })
};

const addRole = () => {
  // Reads all departments and maps them to the names variable to be chosen from via an inquirer list
  const deptChoices = () => db.promise().query(`SELECT * FROM department`)
    .then((rows) => {
      let names = rows[0].map(obj => obj.name);
      return names
    })
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the title of the role you'd like to add?",
        name: "roleTitle"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "roleSalary"
      },
      {
        type: "list",
        message: "Which department is this role in?",
        name: "addDept",
        choices: deptChoices
      }
    ]).then(ans => {
      // Selects chosen department
      db.promise().query(`SELECT id FROM department WHERE name = ?`, ans.addDept)
      // gets the id of chosen department
        .then(answer => {
          let mappedId = answer[0].map(obj => obj.id);
          return mappedId[0]
        })
        .then((mappedId) => {
          // SQL query uses answers to insert a new role into the roles table
          db.promise().query(`INSERT INTO role(title, salary, department_id)
                VALUES(?, ?, ?)`, [ans.roleTitle, ans.roleSalary, mappedId]);
                init();
        })
    })
};

const addEmployee = () => {
    // Reads all departments and maps them to the names variable to be chosen from via an inquirer list
  const rollChoices = () => db.promise().query(`SELECT * FROM role`)
  .then((rows) => {
      let title = rows[0].map(obj => obj.title);
      return title
  })
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName"
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "employeeRole",
        choices: rollChoices
      }
    ]).then(ans => {
      // creates a new employee with the first and last name given via prompts
      db.query(`INSERT INTO employee(first_name, last_name)
                    VALUES(?, ?)`, [ans.firstName, ans.lastName], (err, results) => {
        if (err) {
          console.log(err)
        } else {
          // shows the newly appended employee table
          db.query(`SELECT * FROM employee`, (err, results) => {
            err ? console.error(err) : console.table(results);
            init();
          })
        }
      }
      )
    });
};