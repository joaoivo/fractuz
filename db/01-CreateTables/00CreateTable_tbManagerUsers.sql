CREATE TABLE [dbo].[tbManagerUsers] (
    [SystemIDX]            UNIQUEIDENTIFIER NOT NULL,
    [ParticName]           NVARCHAR (150)   NOT NULL,
    [ParticMail]           NVARCHAR (150)   NOT NULL,
    [ParticPass]           NVARCHAR (300)   NOT NULL,
    [IsAdm]                BIT              CONSTRAINT [DEFAULT_tbManagerUsers_IsAdm] DEFAULT 0 NOT NULL,
    [SystemActive]         BIT              CONSTRAINT [DEFAULT_tbManagerUsers_SystemActive] DEFAULT 1 NOT NULL,
    [SystemCreationDt]     DATETIME         CONSTRAINT [DEFAULT_tbManagerUsers_SystemCreationDt] DEFAULT getDate() NOT NULL,
    [SystemCreationUser]   UNIQUEIDENTIFIER NOT NULL,
    [SystemLastUpdateDt]   DATETIME         NULL,
    [SystemLastUpdateUser] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [PK_tbManagerUsers] PRIMARY KEY CLUSTERED ([SystemIDX] ASC)
);

GO
CREATE UNIQUE NONCLUSTERED INDEX [Index_tbManagerUsers_ParticName]
    ON [dbo].[tbManagerUsers]([ParticName] ASC);

GO
CREATE UNIQUE NONCLUSTERED INDEX [Index_tbManagerUsers_ParticMail]
    ON [dbo].[tbManagerUsers]([ParticMail] ASC);