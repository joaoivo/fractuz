CREATE TABLE [dbo].[tbApplications] (
    [SystemIdx]            UNIQUEIDENTIFIER NOT NULL,
    [Name]                 NVARCHAR (200)   NOT NULL,
    [Description]          TEXT             NULL,
    [SystemActive]         BIT              CONSTRAINT [DEFAULT_tbApplications_SystemActive] DEFAULT ((1)) NOT NULL,
    [SystemCreationDt]     DATETIME         CONSTRAINT [DEFAULT_tbApplications_SystemCreationDt] DEFAULT (getdate()) NOT NULL,
    [SystemCreationUser]   UNIQUEIDENTIFIER NOT NULL,
    [SystemLastUpdateDt]   DATETIME         NULL,
    [SystemLastUpdateUser] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [PK_tbApplications] PRIMARY KEY CLUSTERED ([SystemIdx] ASC),
    CONSTRAINT [FK_tbApplications_tbManagerUsers_Create] FOREIGN KEY ([SystemCreationUser]) REFERENCES [dbo].[tbManagerUsers] ([SystemIDX]),
    CONSTRAINT [FK_tbApplications_tbManagerUsers_Update] FOREIGN KEY ([SystemLastUpdateUser]) REFERENCES [dbo].[tbManagerUsers] ([SystemIDX])
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [Index_tbApplication_Name]
    ON [dbo].[tbApplications]([Name] ASC);

