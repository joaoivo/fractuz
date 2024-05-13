USE fractuz
GO
CREATE OR ALTER PROCEDURE pr_ManagerUsers_del
	 @pGuid 						uniqueidentifier 	
	,@rProcessMessage			NVARCHAR(MAX)		= NULL 	OUTPUT 
	,@rProcessCode				INT					= NULL	OUTPUT
	,@rIsOK 						BIT 					= 1 		OUTPUT
	,@rRowsAffected			INT					= 0		OUTPUT
AS BEGIN 

SET NOCOUNT ON;
DECLARE @ErrorState INT;
BEGIN TRY
	BEGIN TRANSACTION;
	SET @rIsOK =0
	DELETE 	[fractuz].[dbo].[tbManagerUsers]
		WHERE [SystemIDX] = @pGuid

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
GO