const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table')


let startApplication = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'options',
            message: 'Please choose from the following list of what you would like to do to your database of employees:',
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"]
        })
        .then(({ options }) => {
            switch (options) {
                case "View all departments":
                    viewDepartments(db)
                    break;
                case "View all roles":
                    viewRoles(db)
                    break;
                case "View all employees":
                    viewEmployees(db)
                    break;
                case "Add a department":
                    addDepartment(db)
                    break;
                case "Add a role":
                    addRole(db)
                    break;
                case "Add an employee":
                    addEmployee(db)
                    break;
                case "Update an employee":
                    console.log("update employees")
                    break;
                case "Quit":
                    console.log("goodbye!")
                    break
            }
        })
}

let viewDepartments = () => {
    const sql = `SELECT department.name AS Department, department.id AS id
                FROM department;`
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return
        }
        console.table(rows)
    })

}

let viewRoles = () => {
    const sql = `SELECT role.title, role.id, department.name AS department, role.salary
                FROM role
                LEFT JOIN department ON role.department_id = department.id;`
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return
        }
        console.table(rows)
    })
}

let viewEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary AS salary, department.name AS department, manager_id AS Manager
                 FROM employee
                 LEFT JOIN role ON employee.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id;`
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return
        }
        console.table(rows)
    })
}

let addDepartment = () => {
    const sql = `INSERT INTO department (name) VALUES (?)`
    inquirer
        .prompt({
            type: 'text',
            name: 'department',
            message: 'Please enter the name of the Department you would like to add to the database:'
        })
        .then(function ({ department }) {
            db.query(sql, (department), (err, result) => {
                if (err) throw err
                console.log('Successfully added ' + department + ' to the database!')
                startApplication()
            })
        })
}

let addRole = () => {

    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) throw err
        const choices = result.map(choice => {
            return choice = { ...choice, value: choice.id }
        })
        console.log(choices)
        inquirer
            .prompt([{
                type: 'text',
                name: 'title',
                message: 'Please enter the title of the role you would like added to the database:'
            },
            {
                type: 'text',
                name: 'salary',
                message: 'Please enter the salary of the role you would like added to the database:'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department is this new role under?',
                choices: choices
            }
            ]).then(function ({ title, salary, department_id }) {
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
                db.query(sql, [title, salary, department_id], (err, result) => {
                    if (err) throw err
                    console.log('Success')
                    startApplication()
                })
            })
    })
}

let addEmployee = () => {
    db.query(`SELECT id,title FROM role`, (err, result) => {
        if (err) throw err
        const choices = result.map(({ id, title}) => ({ name: title, value: id}))
        db.query(`SELECT * FROM employee`, (err,result) => {
            if (err) throw err
        const employeeList = result.map(({ id, first_name, last_name}) => ({ name: first_name + " " + last_name, value: id}))
        inquirer
            .prompt([{
                type: 'text',
                name: 'first_name',
                message: 'Please enter the first name for the employee:'
            },
            {
                type: 'text',
                name: 'last_name',
                message: "Please enter the last name for the employee:"
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Which role is this employee under?',
                choices: choices
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Who is the manager for this employee?',
                choices: employeeList
            }
            ]).then(function ({ first_name, last_name, role_id, manager_id}) {
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
                db.query(sql, [first_name, last_name, role_id, manager_id], (err, result) => {
                    if (err) throw err
                    console.log('Success')
                    startApplication()
                })
            })
            })
    })
}

startApplication() 
