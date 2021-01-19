--DROP TABLE IF EXISTS authors, articles, reviews, categories;
CREATE TABLE IF NOT EXISTS authors(
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(50) NOT NULL,
	surname VARCHAR(50) NOT NULL,
	img VARCHAR(65535)
);
CREATE TABLE IF NOT EXISTS categories(
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name TEXT NOT NULL,
	img VARCHAR(65535) NOT NULL
);
CREATE TABLE IF NOT EXISTS articles(
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	headline VARCHAR (100) NOT NULL,
	subhead VARCHAR (200),
	content TEXT NOT NULL,
	category_id INTEGER,
	author_id INTEGER NOT NULL,
	cover VARCHAR(65535) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	updated_at TIMESTAMPTZ DEFAULT NOW()
	--PRIMARY KEY(id) REFERENCE articles(updated_at) ON UPDATE NOW()
	--FOREIGN KEY(author_id) REFERENCES authors(id)
);
CREATE TABLE IF NOT EXISTS reviews(
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	text TEXT NOT NULL,
	author_id INTEGER NOT NULL,
	article_id INTEGER NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	updated_at TIMESTAMPTZ DEFAULT NOW()
 	--FOREIGN KEY(author_id) REFERENCES authors(id)
);
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS /*$$*/'
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;'
	LANGUAGE plpgsql;
CREATE TRIGGER update_article_modtime BEFORE UPDATE ON articles FOR EACH ROW EXECUTE PROCEDURE  update_updated_at_column();
CREATE TRIGGER update_article_modtime BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE PROCEDURE  update_updated_at_column();
--dummy data
INSERT INTO authors(name, surname) VALUES ('demo', 'demo');
INSERT INTO categories(name, img) VALUES ('news', 'https://picsum.photos/100');
INSERT INTO articles(headline, content, category_id, author_id, cover) VALUES ('Hello World', 'Your first article', '1','1', 'https://picsum.photos/400');
INSERT INTO reviews(text, author_id, article_id) VALUES ('look nice!', '1','1');
