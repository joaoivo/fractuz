USE fractuz
GO
CREATE OR ALTER PROCEDURE pr_ManagerUsers_ins
	 @pParticName				NVARCHAR (150) 	= NULL
	,@pParticMail				NVARCHAR (150) 	= NULL
	,@pParticPass				NVARCHAR (300) 	= NULL
	,@pIsAdm						BIT					= NULL
	
	,@pSystemActive			BIT					= 1
	,@pSystemCreationUser	uniqueidentifier 	= NULL

	,@rGuid 						uniqueidentifier 	= NULL 	OUTPUT
	,@rIsOK 						BIT 					= 1 		OUTPUT
	,@rRowsAffected			INT					= 0		OUTPUT
	,@rProcessMessage			NVARCHAR(MAX)		= NULL 	OUTPUT
	,@rProcessCode				INT					= NULL	OUTPUT
AS BEGIN 

SET NOCOUNT ON;
DECLARE @ErrorState INT;
BEGIN TRY
	BEGIN TRANSACTION;
	SET @rGuid = newid()
	SET @rIsOK =0

	DECLARE @passwordHash VARCHAR(64) = dbo.GenerateAlphaNumericHash(@pParticPass);

	INSERT INTO [fractuz].[dbo].[tbManagerUsers](
		[SystemIDX]	,[ParticName]	,[ParticMail]	,[ParticPass]		,[IsAdm]	,[SystemCreationUser] 
	) VALUES(
		@rGuid		,@pParticName	,@pParticMail	,@passwordHash	,@pIsAdm	,@pSystemCreationUser
	)

	--- Verificar se houve erro durante a atualização
	IF @@ERROR <> 0
		BEGIN
		SET @rProcessCode = @@ERROR;
		SET @rProcessMessage = 'Erro ao inserir o registro.';
		SET @ErrorState = ERROR_STATE();
		RAISERROR(@rProcessMessage, @ErrorState, 1);
		END
	ELSE
		BEGIN
		COMMIT;
		SET @rIsOK =1
		SET @rProcessCode = 0; -- Nenhum erro
		SET @rProcessMessage = 'Registro inserido com sucesso.';
		END

END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
			SET @rProcessCode = ERROR_NUMBER();
			SET @rProcessMessage = ERROR_MESSAGE();
		END
	END CATCH;
END;
SET @rRowsAffected = @@ROWCOUNT;
GO