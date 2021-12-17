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
                    console.log("clicked role")
                    break;
                case "Add an employee":
                    console.log("adding employee")
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
    db.query(sql, (err,rows) => {
        if (err){
            res.status(500).json({ error: err.message})
            return
        }
        console.table(rows)
    })

}

let viewRoles = () => {
    const sql = `SELECT role.title, role.id, department.name AS department, role.salary
                FROM role
                LEFT JOIN department ON role.department_id = department.id;`
    db.query(sql, (err,rows) => {
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
    db.query(sql, (err,rows) => {
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
            console.log(department)
            db.query(sql, (department), (err,result) => {
                if (err) throw err
                console.log('Successfully added department to the database!')
                startApplication()
            })
        })
}




startApplication()