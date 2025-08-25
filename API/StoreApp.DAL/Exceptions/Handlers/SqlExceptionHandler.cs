using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace StoreApp.DAL.Exceptions.Handlers;

public class SqlExceptionHandler : IDbExceptionHandler
{
    private const int DuplicatePrimaryKeyCode = 2627;

    private const int ForeignKeyViolationCode = 547;

    private const int UniqueConstraintViolationCode = 2601;

    public void DetermineTypeOfDbUpdateException(DbUpdateException exception)
    {
        throw exception.InnerException is SqlException sqlException
            ? sqlException.Number switch
            {
                DuplicatePrimaryKeyCode => new DuplicateRecordException("Record with the same key already exists.", exception),
                UniqueConstraintViolationCode => new DuplicateRecordException("Record with the same unique property already exists.", exception),
                ForeignKeyViolationCode => new ForeignKeyViolationException("Foreign key constraint violation occurred.", exception),
                _ => new DatabaseOperationException("An error occurred while processing the database operation.", exception),
            }
            : exception;
    }
}