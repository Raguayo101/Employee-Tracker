use employee_trackerdb;

INSERT INTO department(name)
VALUES("Romance"),("Science"),("Movie"),("Books");

-- WAS GETTING ERROR, WEBSITE SUGGESTED PUTTING SQL_MODE TO IGNORE PRIMARY KEY ISSUE I WAS HAVING
SET SQL_MODE = ''; INSERT INTO role (title, salary, department_id)
VALUES
    ("Romance lead", 30000, 1),
    ("Romance actor",60000, 1),
    ("Romance support",15000, 1),
    ("Science Professor", 90000, 2),
    ("Science TA", 35000, 2),
    ("Science GradStudent", 15000, 2),
    ("Movie Lead Actor", 45000, 3),
    ("Movie Supporting Lead", 35000, 3),
    ("Lead Writing", 50000, 4),
    ("lead assistant", 35000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("Drigo", "Aguayo", 1, 1),
    ("Ramon", "Gurloro", 1, NULL),
    ("Jayce","Jacklyn", 1 , NULL),
    ("Dr. Joleah","Lamb", 2, 2),
    ("Phoebe", "Joyce", 2 , NULL),
    ("Sam", "wehrle", 2, NULL),
    ("Marcus", "Umali", 3, 3),
    ("Irma","Rodriguez", 3, NULL),
    ("Marissa","Reyes", 4, 4),
    ("James","hicks", 4 , NULL);

