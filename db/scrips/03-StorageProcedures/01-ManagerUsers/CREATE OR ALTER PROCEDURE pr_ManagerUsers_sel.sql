USE fractuz
GO
-- exec pr_ManagerUsers_sel
CREATE OR ALTER PROCEDURE pr_ManagerUsers_sel
	 @pGuid 					uniqueidentifier 	= NULL
	,@pParticName			NVARCHAR (150) 	= NULL
	,@pParticMail			NVARCHAR (150) 	= NULL
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
			,[ParticName]
			,[ParticMail]
			,[IsAdm]
			,[SystemActive]
			,[SystemCreationDt]
			,[SystemCreationUser]
			,[SystemLastUpdateDt]
			,[SystemLastUpdateUser]
	FROM [fractuz].[dbo].[tbManagerUsers]'



	----- where
	DECLARE @where nvarchar(max)=null

	IF @pGuid IS NOT NULL SET @where = CONCAT(' ([SystemIDX]=''',@pGuid,''') ')

	IF @pParticName IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, ' and ')
		SET @where = CONCAT(@where,'([ParticName] = ''',@pParticName,''')')
		END

	IF @pParticMail IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, ' and ')
		SET @where = CONCAT(@where,'([ParticMail] = ''',@pParticMail,''')')
		END

	IF @pIsAdm IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, ' and ')
		SET @where = CONCAT(@where,'([IsAdm] = ''',@pIsAdm,''')')
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
