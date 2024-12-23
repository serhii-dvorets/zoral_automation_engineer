```
I faced some query limitations ON the https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_columns platform,
that's why I'd ask to execute all the commands ON another similar platform without such query limitations: https://www.db-fiddle.com/
```

## Insert these commands into `Schema SQL` tab ON the https://www.db-fiddle.com/

CREATE TABLE `user` (id INT PRIMARY KEY, firstName VARCHAR(255), lastName VARCHAR(255), email VARCHAR(255),  cultureID INT, deleted bit(1), country VARCHAR(255), isRevokeAccess bit(1), created DATETIME);

INSERT INTO `user` (id, firstName, lastName, email, cultureID, deleted, country, isRevokeAccess, created) VALUES
(1, 'Victor', 'Shevchenko', 'vs@ gmail.com', 1033, 1, 'US', 0, '2011-04-05'),
(2, 'Oleksandr', 'Petrenko', 'op@ gmail.com', 1034, 0, 'UA', 0, '2014-05-01'),
(3, 'Victor', 'Tarasenko', 'vt@gmail.com', 1033, 1, 'US', 1, '2015-07-03'),
(4, 'Sergiy', 'Ivanenko', 'sergiy@gmail.com', 1046, 0, 'UA', 1, '2010-02-02'),
(5, 'Vitalii', 'Danilchenko', 'shumko@ gmail.com', 1031, 0, 'UA', 1, '2014-05-01'),
(6, 'Joe', 'Dou', 'joe@ gmail.com', 1032, 0, 'US', 1, '2009-01-01'),
(7, 'Marko', 'Polo', 'marko@gmail.com', 1033, 1, 'UA', 1, '2015-07-03');

CREATE TABLE `group` (id INT PRIMARY KEY, name VARCHAR(255), created DATETIME);

INSERT INTO `group` (id, name, created) VALUES 
(10, 'Support', '2010-02-02'),
(12, 'Dev team', '2010-02-03'),
(13, 'Apps team', '2011-05-06'),
(14, 'TEST - dev team', '2013-05-06'),
(15, 'Guest', '2014-02-02'),
(16, 'TEST-QA-team', '2014-02-02'),
(17, 'TEST-team', '2011-01-07');

CREATE TABLE `groupMembership` (id INT PRIMARY KEY, userID INT NOT NULL, groupID INT NOT NULL, created DATETIME, foreign key (userID) references user(id), foreign key (groupID) references `group`(id));

INSERT INTO `groupMembership` (id, userID, groupID, created) VALUES
(110, 2, 10, '2010-02-02'),
(112, 3, 15, '2010-02-03'),
(114, 1, 10, '2014-02-02'),
(115, 1, 17, '2011-05-02'),
(117, 4, 12, '2014-07-13'),
(120, 5, 15, '2014-06-15');

## insert these commands sequentially into `Query SQL` tab ON the https://www.db-fiddle.com/

```
I decided to use `TEST%` substring instead of `TEST-%` to use with `LIKE` operator in order to include the 'TEST - dev team' to the results.
This group name looks LIKE quite a good candidate to be included in the group of other TEST groups (in real life, I'd ask the client or a manager about the clarifications, but now, for the sake of simplicity, I made the choice for myself)
```

SELECT name FROM `group` g
LEFT JOIN `groupMembership` gm
ON gm.groupID = g.id
WHERE g.name LIKE 'TEST%'
AND gm.id IS NULL;

SELECT distinct u.firstName, u.lastName
FROM `user` u
LEFT JOIN `groupMembership` gm ON u.id = gm.userID
LEFT JOIN `group` g ON gm.groupID = g.id
WHERE u.firstName = 'Victor'
AND (g.name NOT LIKE 'TEST%' OR g.name IS NULL);

SELECT g.name as groupName, u.firstName, u.lastName FROM `user` u
join `groupMembership` gm
ON gm.userID = u.id
join `group` g 
ON g.id = gm.groupID
WHERE u.created < g.created;