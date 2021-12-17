INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Accounting'),
    ('Maintenance');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Lead Engineer', 125000, 1),
    ('Team Engineer', 80000, 1),
    ('Head Accountant', 120000, 2),
    ('Team accountant', 90000, 2),
    ('Maintenance Manager', 70000, 3),
    ('Maintenance Associate', 40000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Jack', 1, NULL),
    ('Joe', 'Smith', 2, 1),
    ('Maria', 'Barber', 2, 1),
    ('Sanna', 'Mcnally', 3, NULL),
    ('Carwyn', 'Legge', 4, 3),
    ('Manveer', 'Wallis', 5, NULL),
    ('Nate', 'Adam', 6, 5),
    ('Misty', 'Livingston', 6, 5);


