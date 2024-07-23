use fractuz
go

CREATE TABLE [dbo].[tbAppDbTableFields] (
    [SystemIDX]              UNIQUEIDENTIFIER NOT NULL,
    [FieldTable]             UNIQUEIDENTIFIER NOT NULL,
    [FieldName]              NVARCHAR (100)   NOT NULL,
    [FieldDescription]       NVARCHAR (100)   NOT NULL,
    [FieldDbDataType]        NVARCHAR (10)    NOT NULL,
    [FieldDbDataSize]        INT              NULL,
    [FieldDbDataSizeDecimel] INT              NULL,
    [IsPrimaryKey]           BIT              CONSTRAINT [DEFAULT_tbAppDbTableFields_IsPrimaryKey] DEFAULT ((0)) NOT NULL,
    [IsAllowNull]            BIT              CONSTRAINT [DEFAULT_tbAppDbTableFields_IsAllowNull] DEFAULT ((1)) NOT NULL,
    [IsUnique]               BIT              CONSTRAINT [DEFAULT_tbAppDbTableFields_IsUnique] DEFAULT ((0)) NOT NULL,
    [IsInsigned]             BIT              NULL,
    [FieldDefaultValue]      NVARCHAR (MAX)   NULL,
    [ConstraintField]        UNIQUEIDENTIFIER NULL,
    [AppDataType]            NVARCHAR (3)     NULL,
    [AppDataNickname]        NVARCHAR (200)   NULL,
    [SystemActive]           BIT              CONSTRAINT [DEFAULT_tbAppDbTableFields_SystemActive] DEFAULT ((1)) NOT NULL,
    [SystemCreationDt]       DATETIME         CONSTRAINT [DEFAULT_tbAppDbTableFields_SystemCreationDt] DEFAULT (getdate()) NOT NULL,
    [SystemCreationUser]     UNIQUEIDENTIFIER NOT NULL,
    [SystemLastUpdateDt]     DATETIME         NULL,
    [SystemLastUpdateUser]   UNIQUEIDENTIFIER NULL,
    CONSTRAINT [PK_tbAppDbTableFields] PRIMARY KEY CLUSTERED ([SystemIDX] ASC),
    CONSTRAINT [FK_tbAppDbTableFields_tbAppDbTables] FOREIGN KEY ([FieldTable]) REFERENCES [dbo].[tbAppDbTables] ([SystemIDX]),
    CONSTRAINT [FK_tbAppDbTableFields_tbManagerUsers_create] FOREIGN KEY ([SystemCreationUser]) REFERENCES [dbo].[tbManagerUsers] ([SystemIDX]),
    CONSTRAINT [FK_tbAppDbTableFields_tbManagerUsers_update] FOREIGN KEY ([SystemLastUpdateUser]) REFERENCES [dbo].[tbManagerUsers] ([SystemIDX])
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [Index_tbAppDbTableFields_EachTable_OneFieldName]
    ON [dbo].[tbAppDbTableFields]([FieldTable] ASC, [FieldName] ASC);

