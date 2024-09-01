# orm examples

read

```php
Articles::all();
```
```sql
SELECT * FROM articles;
```

create

```php
$article = new Article();
$article->title = 'my first article';
$article->content = 'lorem ipsum';
$article->save();
```
```sql
INSERT INTO articles (title, content) 
VALUES ('my first article', 'lorem ipsum');
```

update

```php
$article = Article::find(1);
$article->title = 'updated article';
$article->save();
```
```sql
UPDATE articles
SET title = 'updated article' 
WHERE id = 1;
```

delete

```php
$article = Article::find(1);
$article->delete();
```
```sql
DELETE FROM articles
WHERE id = 1;
```
