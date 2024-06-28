USE fractuz
GO
CREATE OR ALTER PROCEDURE pr_SystemErrors_upd
	 @pGuid 				uniqueidentifier 	= NULL
	,@pAppLanguage		NVARCHAR (10) 		= NULL
	,@pAppMessage		NVARCHAR (400) 	= NULL
	,@pAppStackTrace	NVARCHAR(MAX)		= NULL
	,@pAppID				uniqueidentifier 	= NULL
	,@pAppUserID		uniqueidentifier 	= NULL
	,@pPrevErrorID		uniqueidentifier 	= NULL
	,@pPageURL			NVARCHAR (200) 	= NULL
	,@pExtraData		NVARCHAR(MAX)		= NULL
	
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

	UPDATE [fractuz].[dbo].[tbSystemErrors]
		SET
			 [AppLanguage]				= isNull(@pAppLanguage	,[AppLanguage])
			,[AppMessage]				= isNull(@pAppMessage	,[AppMessage])
			,[AppStackTrace]			= isNull(@pAppStackTrace,[AppStackTrace])
			
			,[AppUserID]				= isNull(@pAppUserID		,[AppUserID])
			,[AppID]						= isNull(@pAppID			,[AppID])
			,[PrevErrorID]				= isNull(@pPrevErrorID	,[PrevErrorID])

			,[PageURL]					= isNull(@pPageURL		,[PageURL])
			,[ExtraData]				= isNull(@pExtraData		,[ExtraData])

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