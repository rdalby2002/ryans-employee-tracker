const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'employee_db',
    port: 8889
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

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

init();

const viewDept = () => {
  db.query(`SELECT * FROM department`, (err, results) => {
    err ? console.error(err) : console.table(results);
    init();
  })
};

const viewRoles = () => {
  db.query(`SELECT * FROM role`, (err, results) => {
    err ? console.error(err) : console.table(results);
    init();
  })
};

const viewEmployees = () => {
  db.query(`SELECT * FROM employee`, (err, results) => {
    err ? console.error(err) : console.table(results);
    init();
  })
};

const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you'd like to add?",
        name: "addDept"
      }
    ]).then(ans => {
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
      db.promise().query(`SELECT id FROM department WHERE name = ?`, ans.addDept)
        .then(answer => {
          let mappedId = answer[0].map(obj => obj.id);
          return mappedId[0]
        })
        .then((mappedId) => {
          db.promise().query(`INSERT INTO role(title, salary, department_id)
                VALUES(?, ?, ?)`, [ans.roleTitle, ans.roleSalary, mappedId]);
                init();
        })
    })
};

const addEmployee = () => {
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
      db.query(`INSERT INTO employee(first_name, last_name)
                    VALUES(?, ?)`, [ans.firstName, ans.lastName], (err, results) => {
        if (err) {
          console.log(err)
        } else {
          db.query(`SELECT * FROM employee`, (err, results) => {
            err ? console.error(err) : console.table(results);
            init();
          })
        }
      }
      )
    });
};