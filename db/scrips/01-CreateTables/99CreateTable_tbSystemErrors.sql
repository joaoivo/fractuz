SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbSystemErrors](
	[SystemIdx] 		[uniqueidentifier] 	NOT NULL,
	[AppProcessDesc]	NVARCHAR (200)			NOT NULL,
	[AppLanguage] 		[nvarchar](10) 		NULL,
	[AppMessage] 		[text] 					NOT NULL,
	[AppStackTrace] 	[nvarchar](max) 		NULL,
	[AppID] 				[uniqueidentifier] 	NULL,
	[AppUserID] 		[uniqueidentifier] 	NULL,
	[PrevErrorID] 		[uniqueidentifier] 	NULL,
	[PageURL] 			[nvarchar](200) 		NULL,
	[Request] 			[nvarchar](MAX) 		NULL,
	[ExtraData] 		[nvarchar](max) 		NULL,
	[SystemCreationDt] DATETIME		 		NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[tbSystemErrors] ADD  CONSTRAINT [PK_tbSystemErrors] PRIMARY KEY CLUSTERED 
(
	[SystemIdx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
