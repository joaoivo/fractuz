USE fractuz
GO
CREATE OR ALTER PROCEDURE pr_SystemErrors_ins
	 @pAppLanguage		NVARCHAR (10) 		= NULL
	,@pAppProcessDesc	NVARCHAR (200) 	= NULL
	,@pAppExceptionType	NVARCHAR	(100)	= NULL
	,@pAppMessage		NVARCHAR (400) 	= NULL
	,@pAppStackTrace	NVARCHAR(MAX)		= NULL
	,@pAppID				uniqueidentifier 	= NULL
	,@pAppUserID		uniqueidentifier 	= NULL
	,@pPrevErrorID		uniqueidentifier 	= NULL
	,@pPageURL			NVARCHAR (200) 	= NULL
	,@pExtraData		NVARCHAR(MAX)		= NULL
	,@pRequest			NVARCHAR(MAX)		= NULL
	,@pSystemCreationDt	DATETIME			= NULL

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

	INSERT INTO [fractuz].[dbo].[tbSystemErrors](--
		[SystemIDX]	,[AppProcessDesc],[AppLanguage]	,[AppMessage]	,[AppStackTrace]	,[AppUserID]	,[AppID]	,[PrevErrorID]	,[PageURL] 	,[ExtraData] 	,[Request], [AppExceptionType],[SystemCreationDt]
	) VALUES(
		@rGuid		,@pAppProcessDesc,@pAppLanguage	,@pAppMessage	,@pAppStackTrace	,@pAppUserID	,@pAppID	,@pPrevErrorID	,@pPageURL	,@pExtraData	,@pRequest, @pAppExceptionType, @pSystemCreationDt
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