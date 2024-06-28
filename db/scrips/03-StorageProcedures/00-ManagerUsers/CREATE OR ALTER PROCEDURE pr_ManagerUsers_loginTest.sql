USE fractuz
GO
-- exec pr_ManagerUsers_sel
CREATE OR ALTER PROCEDURE pr_ManagerUsers_loginTest

	 @pParticMail				NVARCHAR (150)
	,@pParticPass				NVARCHAR (300)

	,@rProcessMessage			NVARCHAR(MAX)	= NULL 	OUTPUT
	,@rProcessCode				INT				= NULL	OUTPUT
	,@rQuery					NVARCHAR(MAX)		= NULL 	OUTPUT --- instrução SQL que trouxe estes dados (DEbug apenas)

AS BEGIN 
DECLARE @query nvarchar(max)='
	SELECT [SystemIDX]
			,[ParticName]
			,[ParticMail]
			,[IsAdm]
			,[SystemActive]
	FROM [fractuz].[dbo].[tbManagerUsers]'

	----- where
	DECLARE @where nvarchar(max)=null

	IF @pParticMail IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, ' and ')
		SET @where = CONCAT(@where,'([ParticMail] = ''',@pParticMail,''')')
		END
	ELSE
		BEGIN
		RAISERROR('Sem Email de Login', 1, 1);
		END

	IF @pParticPass IS NOT NULL 
		BEGIN
		IF @where IS NOT NULL set @where = CONCAT(@where, ' and ')
		--SET @where = CONCAT(@where,'([ParticPass] = ''',HASHBYTES('SHA2_256', @pParticPass),''')')
		SET @where = CONCAT(@where,'([ParticPass] =dbo.GenerateAlphaNumericHash(''',@pParticPass,'''))')
		END
	ELSE
		BEGIN
		RAISERROR('Sem Senha de Login', 1, 1);
		END

	IF @where IS NOT NULL set @query = CONCAT(@query , ' where ',@where)

	--select (@query)
	set @rQuery = @query
	EXEC sp_executesql @query
END; 
go
