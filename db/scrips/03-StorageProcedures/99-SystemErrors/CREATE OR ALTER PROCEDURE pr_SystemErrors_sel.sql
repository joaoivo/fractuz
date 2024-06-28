USE fractuz
GO
-- exec pr_SystemErrors_sel
CREATE OR ALTER PROCEDURE pr_SystemErrors_sel
	 @pGuid 					uniqueidentifier 	= NULL
	,@pAppLanguage			NVARCHAR (10) 		= NULL
	,@pAppMessage			NVARCHAR (400) 	= NULL
	,@pAppUserID			uniqueidentifier 	= NULL
	,@pAppID					uniqueidentifier 	= NULL
	,@pPrevErrorID			uniqueidentifier 	= NULL
	,@pPageURL				NVARCHAR (400) 	= NULL

	,@pColumnsOrderBy		NVARCHAR(MAX)		= NULL
	,@pPageNumber			INT					= NULL 	OUTPUT
	,@pPageRowCount		INT					= NULL 	OUTPUT

	,@rTotalRowCount		INT					= 0		OUTPUT --- quantas linhas totais a pesquisa trouxe
	,@rSeachRowCount		INT					= 0		OUTPUT --- quantas linhas serão exibidas
	,@pSearchPageCount	INT					= NULL 	OUTPUT
	,@rQuery					NVARCHAR(MAX)		= NULL 	OUTPUT --- instrução SQL que trouxe estes dados (DEbug apenas)

AS BEGIN 
DECLARE @query nvarchar(max)='
	SELECT [SystemIdx]
			,[AppLanguage]
			,[AppMessage]
			,[AppStackTrace]
			,[AppUserID]
			,[AppID]
			,[PrevErrorID]
			,[PageURL]
			,[ExtraData]
		FROM [fractuz].[dbo].[tbSystemErrors]'

	----- where
	DECLARE @where nvarchar(max)=null

	IF @pGuid IS NOT NULL SET @where = CONCAT(' ([SystemIDX]=''',@pGuid,''') ')

	IF @pAppLanguage IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, ' and ')
		SET @where = CONCAT(@where,'([AppLanguage] like ''%',@pAppLanguage,'%'')')
		END

	IF @pAppMessage IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, ' and ')
		SET @where = CONCAT(@where,'([AppMessage] like ''%',@pAppMessage,'%'')')
		END

	IF @pAppUserID IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, ' and ')
		SET @where = CONCAT(@where,'([AppUserID] = ''',@pAppUserID,''')')
		END

	IF @pAppID IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, ' and ')
		SET @where = CONCAT(@where,'([AppID] = ''',@pAppID,''')')
		END

	IF @pPrevErrorID IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, ' and ')
		SET @where = CONCAT(@where,'([PrevErrorID] = ''',@pPrevErrorID,''')')
		END

	IF @pPageURL IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, ' and ')
		SET @where = CONCAT(@where,'([PageURL] like ''%',@pPageURL,'%'')')
		END
	
	IF @where IS NOT NULL set @query = CONCAT(@query , ' where ',@where)

	----- order by	
	IF @pColumnsOrderBy IS NOT NULL 
		BEGIN
		SET @query = CONCAT(@query,' ORDER BY ',@pColumnsOrderBy)
		END

	------- paginação
	IF @pPageRowCount IS NOT NULL 
		BEGIN
		SET @query = CONCAT(@query,' LIMIT ',@pPageRowCount)
		END
			
	IF @pPageNumber IS NOT NULL 
		BEGIN
		SET @query = CONCAT(@query,' OFFSET ', (@pPageNumber - 1) *@pPageRowCount)
		END
	
	--exec(@query)
	set @rQuery = @query
	EXEC sp_executesql @query
END; 
go
