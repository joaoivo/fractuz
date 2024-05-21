USE fractuz
GO
CREATE OR ALTER PROCEDURE pr_AppDbTables_ins
	 @pTableDatabase			uniqueidentifier 	= NULL
	,@pTableBuiltOrder		INT 					= NULL
	,@pTableName				NVARCHAR (050) 	= NULL
	,@pTableDescription		NVARCHAR (MAX) 	= NULL
	,@pFieldPrefix				NVARCHAR (010) 	= NULL
	,@pTableHistory			BIT  					= NULL
	
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

	INSERT INTO [fractuz].[dbo].[tbAppDbTables](
		[SystemIDX]	,[TableDatabase]	,[TableBuiltOrder]	,[TableName]	,[TableDescription]	,[FieldPrefix]	,[TableHistory]	,[SystemCreationUser] 
	) VALUES(
		@rGuid		,@pTableDatabase	,@pTableBuiltOrder	,@pTableName	,@pTableDescription	,@pFieldPrefix	,@pTableHistory	,@pSystemCreationUser
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