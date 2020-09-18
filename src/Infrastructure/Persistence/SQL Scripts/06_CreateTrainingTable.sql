SELECT * INTO RssFeedItems_Learning2 FROM RssFeedItems
WHERE UserRating IS NOT NULL

update RssFeedItems_Learning2
set author = REPLACE(REPLACE(REPLACE(author, CHAR(10), ''), CHAR(13), ''),CHAR(9),'')
	,Categories = REPLACE(REPLACE(REPLACE(Categories, CHAR(10), ''), CHAR(13), ''),CHAR(9),'')
	,Content = REPLACE(REPLACE(REPLACE(Content, CHAR(10), ''), CHAR(13), ''),CHAR(9),'')
	,Description = REPLACE(REPLACE(REPLACE(Description, CHAR(10), ''), CHAR(13), ''),CHAR(9),'')	
	,Link = REPLACE(REPLACE(REPLACE(Link, CHAR(10), ''), CHAR(13), ''),CHAR(9),'')
	,Title = REPLACE(REPLACE(REPLACE(Title, CHAR(10), ''), CHAR(13), ''),CHAR(9),'')

