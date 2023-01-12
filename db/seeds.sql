INSERT INTO department (name)
VALUES
('Finance'),
('Marketing'),
('Operations'),
('HR'),
('IT'),
('Executive');

INSERT INTO role (title, salary, department_id)
VALUES
('Financial Analyst', 85000, 1),
('Securities Trader', 120000, 1),
('Finance Manager', 200000, 1),
('Marketing Analyst', 80000, 2),
('Marketing Coordinator', 100000, 2),
('Marketing Manager', 200000, 2),
('Operations Coordinator', 70000, 3),
('Operations Analyst', 70000, 3),
('Operations Manager', 90000, 3),
('Human Resources Assistant', 60000, 4),
('Employment Specialist', 70000, 4),
('Human Resources Coordinator', 90000, 4),
('Human Resources Manager', 150000, 4),
('Software Engineer', 120000, 5),
('Fullstack Dev', 75000, 5),
('Cybersecurity Specialist', 75000, 5),
('Project Manager', 200000, 5),
('CEO', 500000, 6),
('CFO', 450000, 6),
('CMO', 450000, 6),
('COO', 450000, 6),
('CHRO', 450000, 6),
('CTO', 450000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Thomas', 'Miller', 18, null),
('Alexis', 'Garcia', 19, 1)
('Alex', 'Jefferson', 20, 1),
('Marie', 'Smith', 21, 1),
('Derek', 'Johnson', 22, 1),
('Ryan', 'Davis', 23, 1),
('Jeffrey', 'Brown', 3, 2),
('Leonna', 'Williams', 6, 3),
('Robert', 'Rodriguez', 9, 4),
('Bart', 'Wilson', 13, 5),
('Veronica', 'Taylor', 17, 6),
('Amanda', 'Harris', 1, 7),
('Clarence', 'Walker', 2, 7),
('Eloisa', 'Perez', 4, 8),
('Gabrielle', 'Robinson', 5, 8),
('Daniel', 'Lopez', 7, 9),
('Sofia', 'Lee', 8, 9),
('Amelia', 'Gonzalez', 10, 10),
('David', 'Lewis', 11, 10),
('Patrick', 'Clark', 12, 10),
('Florence', 'Thompson', 14, 11),
('Greg', 'Hall', 15, 11),
('Jaden', 'Martin', 16, 11);