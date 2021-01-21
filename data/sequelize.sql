--sequelize dummy data
INSERT INTO authors(name, surname, "createdAt", "updatedAt") VALUES ('demo', 'demo', '2020-01-01', '2020-01-01');
INSERT INTO categories(name, img) VALUES ('news', 'https://picsum.photos/100');
INSERT INTO articles("headLine", content, "categoryId", "authorId", cover,  "createdAt", "updatedAt") VALUES ('Hello World', 'Your first article', '1','1', 'https://picsum.photos/400',  '2020-01-01', '2020-01-01');
INSERT INTO articles("headLine", content, "categoryId", "authorId", cover,  "createdAt", "updatedAt") VALUES ('Hello World', 'Your first article', '1','1', 'https://picsum.photos/400',  '2020-01-01', '2020-01-01');
INSERT INTO articles("headLine", content, "categoryId", "authorId", cover,  "createdAt", "updatedAt") VALUES ('Hello World', 'Your first article', '1','1', 'https://picsum.photos/400',  '2020-01-01', '2020-01-01');
INSERT INTO articles("headLine", content, "categoryId", "authorId", cover,  "createdAt", "updatedAt") VALUES ('Hello World', 'Your first article', '1','1', 'https://picsum.photos/400',  '2020-01-01', '2020-01-01');
INSERT INTO articles("headLine", content, "categoryId", "authorId", cover,  "createdAt", "updatedAt") VALUES ('Hello World', 'Your first article', '1','1', 'https://picsum.photos/400',  '2020-01-01', '2020-01-01');
INSERT INTO articles("headLine", content, "categoryId", "authorId", cover,  "createdAt", "updatedAt") VALUES ('Hello World', 'Your first article', '1','1', 'https://picsum.photos/400',  '2020-01-01', '2020-01-01');
INSERT INTO articles("headLine", content, "categoryId", "authorId", cover,  "createdAt", "updatedAt") VALUES ('Hello World', 'Your first article', '1','1', 'https://picsum.photos/400',  '2020-01-01', '2020-01-01');
INSERT INTO articles("headLine", content, "categoryId", "authorId", cover,  "createdAt", "updatedAt") VALUES ('Hello World', 'Your first article', '1','1', 'https://picsum.photos/400',  '2020-01-01', '2020-01-01');
INSERT INTO reviews(text, "authorId", "articleId", "createdAt", "updatedAt") VALUES ('look nice!', '1','1', '2020-01-01', '2020-01-01');
