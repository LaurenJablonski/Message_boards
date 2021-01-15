SELECT *
FROM OPENROWSET (BULK 'C:\Users\ljablonski\Documents\GitHub\Message_boards\message_dictionary.JSON', SINGLE_CLOB) as j --This function returns a table with a single column (Column Name: Bulk)

Declare @JSON varchar(max)

SELECT @JSON = BulkColumn
FROM OPENROWSET (BULK 'C:\Users\ljablonski\Documents\GitHub\Message_boards\message_dictionary.JSON', SINGLE_CLOB) as j

Select @JSON

If (ISJSON(@JSON)=1)
Print 'Valid JSON'

