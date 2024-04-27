CREATE TABLE [dbo].[tbAppDataBases] (
    [SystemIDX]            UNIQUEIDENTIFIER NOT NULL,
    [Application]          UNIQUEIDENTIFIER NOT NULL,
    [DatabaseName]         NVARCHAR (100)   NOT NULL,
    [BuildOrder]           INT              CONSTRAINT [DEFAULT_tbAppDataBases_BuildOrder] DEFAULT ((0)) NOT NULL,
    [SystemActive]         BIT              CONSTRAINT [DEFAULT_tbAppDataBases_SystemActive] DEFAULT ((0)) NOT NULL,
    [SystemCreationDt]     DATETIME         CONSTRAINT [DEFAULT_tbAppDataBases_SystemCreationDt] DEFAULT (getdate()) NOT NULL,
    [SystemCreationUser]   UNIQUEIDENTIFIER NOT NULL,
    [SystemLastUpdateDt]   DATETIME         NULL,
    [SystemLastUpdateUser] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [PK_tbAppDataBases] PRIMARY KEY CLUSTERED ([SystemIDX] ASC),
    CONSTRAINT [FK_tbAppDataBases_tbApplications] FOREIGN KEY ([Application]) REFERENCES [dbo].[tbApplications] ([SystemIdx])
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [Index_tbAppDataBases_App_Databases]
    ON [dbo].[tbAppDataBases]([Application] ASC, [DatabaseName] ASC);