use fractuz
go

CREATE TABLE [dbo].[tbAppDbTables] (
    [SystemIDX]            UNIQUEIDENTIFIER NOT NULL,
    [TableDatabase]        UNIQUEIDENTIFIER NOT NULL,
    [TableBuiltOrder]      INT              NOT NULL,
    [TableName]            NVARCHAR (50)    NOT NULL,
    [TableDescription]     TEXT             NULL,
    [FieldPrefix]          NVARCHAR (10)    NOT NULL,
    [TableHistory]         BIT              CONSTRAINT [DEFAULT_tbAppDbTables_TableHistory] DEFAULT ((0)) NOT NULL,
    [SystemActive]         BIT              CONSTRAINT [DEFAULT_tbAppDbTables_SystemActive] DEFAULT ((1)) NOT NULL,
    [SystemCreationDt]     DATETIME         CONSTRAINT [DEFAULT_tbAppDbTables_SystemCreationDt] DEFAULT (getdate()) NOT NULL,
    [SystemCreationUser]   UNIQUEIDENTIFIER NOT NULL,
    [SystemLastUpdateDt]   DATETIME         NULL,
    [SystemLastUpdateUser] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [PK_tbAppDbTables] PRIMARY KEY CLUSTERED ([SystemIDX] ASC),
    CONSTRAINT [FK_tbAppDbTables_tbAppDataBases] FOREIGN KEY ([TableDatabase]) REFERENCES [dbo].[tbAppDataBases] ([SystemIDX]),
    CONSTRAINT [FK_tbAppDbTables_tbManagerUsers_Create] FOREIGN KEY ([SystemCreationUser]) REFERENCES [dbo].[tbManagerUsers] ([SystemIDX]),
    CONSTRAINT [FK_tbAppDbTables_tbManagerUsers_Update] FOREIGN KEY ([SystemLastUpdateUser]) REFERENCES [dbo].[tbManagerUsers] ([SystemIDX])
);


GO
CREATE NONCLUSTERED INDEX [Index_tbAppDbTables_OneDatabase_SamePrefix]
    ON [dbo].[tbAppDbTables]([TableDatabase] ASC, [FieldPrefix] ASC);


GO
CREATE UNIQUE NONCLUSTERED INDEX [Index_tbAppDbTables_OneDatabase_SameTable]
    ON [dbo].[tbAppDbTables]([TableDatabase] ASC, [TableName] ASC);

