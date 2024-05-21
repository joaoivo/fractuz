USE fractuz
GO
-- exec pr_ManagerUsers_sel
CREATE OR ALTER PROCEDURE pr_AppDbTableFields_sel
	 @pGuid 					uniqueidentifier 	= NULL
	,@pName					NVARCHAR (200) 	= NULL
	,@pDescription			NVARCHAR (max) 	= NULL
	,@pIsAdm					BIT					= NULL

	,@pColumnsOrderBy		NVARCHAR(MAX)		= NULL
	,@pPageNumber			INT					= NULL 	OUTPUT
	,@pPageRowCount		INT					= NULL 	OUTPUT

	,@rTotalRowCount		INT					= 0		OUTPUT --- quantas linhas totais a pesquisa trouxe
	,@rSeachRowCount		INT					= 0		OUTPUT --- quantas linhas serão exibidas
	,@pSearchPageCount	INT					= NULL 	OUTPUT
	,@rQuery					NVARCHAR(MAX)		= NULL 	OUTPUT --- instrução SQL que trouxe estes dados (DEbug apenas)

AS BEGIN 
DECLARE @query nvarchar(max)='
	SELECT [SystemIDX]
	
			,[FieldTable]
			,[FieldName]
			,[FieldDescription]
			,[FieldDbDataType]
			,[FieldDbDataSize]
			,[FieldDbDataSizeDecimel]
			,[IsPrimaryKey]
			,[IsAllowNull]
			,[IsUnique]
			,[IsInsigned]
			,[FieldDefaultValue]
			,[ConstraintField]
			,[AppDataType]
			,[AppDataNickname]

			,[SystemActive]
			,[SystemCreationDt]
			,[SystemCreationUser]
			,[SystemLastUpdateDt]
			,[SystemLastUpdateUser]
		FROM [fractuz].[dbo].[tbAppDbTableFields]'

	----- where
	DECLARE @where nvarchar(max)=null

	IF @pGuid IS NOT NULL SET @where = CONCAT('\n\t ([SystemIDX]=''',@pGuid,''') ')

	IF @pName IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, '\n\t and ')
		SET @where = CONCAT(@where,'([Name] = ''',@pName,''')')
		END

	IF @pDescription IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, '\n\t and ')
		SET @where = CONCAT(@where,'([Description] = ''',@pDescription,''')')
		END
	
	IF @where IS NOT NULL set @query = CONCAT(@query , ' where ',@where)

	----- order by	
	IF @pColumnsOrderBy IS NOT NULL 
		BEGIN
		SET @query = CONCAT(@query,'\n ORDER BY ',@pColumnsOrderBy)
		END

	------- paginação
	IF @pPageRowCount IS NOT NULL 
		BEGIN
		SET @query = CONCAT(@query,'\n LIMIT ',@pPageRowCount)
		END
			
	IF @pPageNumber IS NOT NULL 
		BEGIN
		SET @query = CONCAT(@query,'\n OFFSET ', (@pPageNumber - 1) *@pPageRowCount)
		END
	
	--exec(@query)
	set @rQuery = @query
	EXEC sp_executesql @query
END; 
go
