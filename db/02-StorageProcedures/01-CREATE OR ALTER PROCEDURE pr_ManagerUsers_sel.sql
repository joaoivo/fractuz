USE fractuz
GO
-- exec pr_ManagerUsers_sel
CREATE OR ALTER PROCEDURE pr_ManagerUsers_sel
	 @guid 					uniqueidentifier 	= NULL
	,@pParticName			NVARCHAR (150) 	= NULL
	,@pParticMail			NVARCHAR (150) 	= NULL
	,@pIsAdm					BIT					= NULL

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
			,[ParticPass]
			,[IsAdm]
			,[SystemActive]
			,[SystemCreationDt]
			,[SystemCreationUser]
			,[SystemLastUpdateDt]
			,[SystemLastUpdateUser]
	FROM [fractuz].[dbo].[tbManagerUsers]'

	DECLARE @where nvarchar(max)=null

	IF @guid IS NOT NULL SET @where = CONCAT(' ([SystemIDX]=''',@guid,''') ')

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

	--exec(@query)
	set @rQuery = @query
	EXEC sp_executesql @query
END; 
go
