USE fractuz
GO
-- exec pr_ManagerUsers_sel
CREATE OR ALTER PROCEDURE pr_Applications_sel
	 @pGuid 					uniqueidentifier 	= NULL
	,@pName					NVARCHAR (200) 	= NULL
	,@pDescription			NVARCHAR (max) 	= NULL

	,@pColumnsOrderBy		NVARCHAR(MAX)		= NULL
	,@pPageNumber			INT					= NULL 	OUTPUT
	,@pPageRowCount		INT					= NULL 	OUTPUT

	,@rTotalRowCount		INT					= 0		OUTPUT --- quantas linhas totais a pesquisa trouxe
	,@rSeachRowCount		INT					= 0		OUTPUT --- quantas linhas serão exibidas
	,@rSearchPageCount	INT					= NULL 	OUTPUT
	,@rQuery					NVARCHAR(MAX)		= NULL 	OUTPUT --- instrução SQL que trouxe estes dados (DEbug apenas)

AS BEGIN 
DECLARE @query nvarchar(max)='
	SELECT [SystemIDX]
			,[Name]
			,[Description]
			,[SystemActive]
			,[SystemCreationDt]
			,[SystemCreationUser]
			,[SystemLastUpdateDt]
			,[SystemLastUpdateUser]
	FROM [fractuz].[dbo].[tbApplications]'

	----- where
	DECLARE @where nvarchar(max)=null

	IF @pGuid IS NOT NULL SET @where = CONCAT('  ([SystemIDX]=''',@pGuid,''') ')

	IF @pName IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where,Char(10), '  and ')
		SET @where = CONCAT(@where,'([Name] like ''%',@pName,'%'')')
		END

	IF @pDescription IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where,Char(10), '  and ')
		SET @where = CONCAT(@where,'([Description] like ''%',@pDescription,'%'')')
		END
	
	IF @where IS NOT NULL set @query = CONCAT(@query ,Char(10), ' where ',@where)

	----- order by	
	IF @pColumnsOrderBy IS NOT NULL 
		BEGIN
		SET @query = CONCAT(@query,Char(10),' ORDER BY ',@pColumnsOrderBy)
		END

	------- paginação
	IF @pPageRowCount IS NOT NULL 
		BEGIN
		SET @query = CONCAT(@query,Char(10),' LIMIT ',@pPageRowCount)
		END
			
	IF @pPageNumber IS NOT NULL 
		BEGIN
		SET @query = CONCAT(@query,Char(10),' OFFSET ', (@pPageNumber - 1) *@pPageRowCount)
		END
	
	set @rQuery = @query
	exec(@query)
END; 
go
