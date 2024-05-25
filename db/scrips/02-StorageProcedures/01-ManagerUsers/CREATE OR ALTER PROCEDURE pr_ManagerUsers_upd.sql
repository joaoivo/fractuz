USE fractuz
GO
CREATE OR ALTER PROCEDURE pr_ManagerUsers_upd
	 @pGuid 						uniqueidentifier 	= NULL 
	,@pParticName				NVARCHAR (150) 	= NULL
	,@pParticMail				NVARCHAR (150) 	= NULL
	,@pParticPass				NVARCHAR (300) 	= NULL
	,@pIsAdm						BIT					= NULL
	
	,@pSystemActive			BIT					= 1
	,@pSystemLastUpdateUser	uniqueidentifier 	= NULL

	,@rIsOK 						BIT 					= 1 		OUTPUT
	,@rRowsAffected			INT					= 0		OUTPUT
	,@rProcessMessage			NVARCHAR(MAX)		= NULL 	OUTPUT 
	,@rProcessCode				INT					= NULL	OUTPUT

AS BEGIN 

SET NOCOUNT ON;
DECLARE @ErrorState INT;
BEGIN TRY
	BEGIN TRANSACTION;
	SET @rIsOK =0;

	IF @pParticPass is not null
		BEGIN
		set @pParticPass = HASHBYTES('SHA2_256', CONVERT(VARBINARY(MAX), @pParticPass))
		END
	UPDATE [fractuz].[dbo].[tbManagerUsers]
		SET
			 [ParticName]				= isNull(@pParticName,[ParticName])
			,[ParticMail]				= isNull(@pParticMail,[ParticMail])
			,[ParticPass]				= isNull(@pParticPass,[ParticPass])
			,[IsAdm]						= isNull(@pIsAdm,[IsAdm])
			,[SystemActive] 			= isNull(@pSystemActive,[SystemActive])
			,[SystemLastUpdateDt] 	= GETDATE()
			,[SystemLastUpdateUser] = @pSystemLastUpdateUser
		WHERE
			[SystemIDX] = @pGuid

	--- Verificar se houve erro durante a atualização
	IF @@ERROR <> 0
		BEGIN
		SET @rProcessCode = @@ERROR;
		SET @rProcessMessage = 'Erro ao atualizar o registro.';
		SET @ErrorState = ERROR_STATE();
		RAISERROR(@rProcessMessage, @ErrorState, 1);
		END
	ELSE
		BEGIN
		COMMIT;
		SET @rIsOK =1
		SET @rProcessCode = 0; -- Nenhum erro
		SET @rProcessMessage = 'Registro atualizado com sucesso.';
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