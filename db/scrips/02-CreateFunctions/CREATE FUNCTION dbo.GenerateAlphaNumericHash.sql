CREATE FUNCTION dbo.GenerateAlphaNumericHash(@inputString VARCHAR(MAX))
RETURNS VARCHAR(64)
AS
BEGIN
    DECLARE @convertedString VARBINARY(MAX);
    DECLARE @hash VARBINARY(64);
    DECLARE @result VARCHAR(64);

    -- Converta a string para um charset específico (UTF-8, por exemplo)
    SET @convertedString = CONVERT(VARBINARY(MAX), @inputString);

    -- Calcule o hash da string convertida
    SET @hash = HASHBYTES('SHA2_256', @convertedString); -- Algoritmo SHA-256

    -- Converte o hash em uma representação alfanumérica (hexadecimal)
    SET @result = CONVERT(VARCHAR(64), @hash, 2);

    RETURN @result;
END;
