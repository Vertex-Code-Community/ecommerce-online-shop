using Microsoft.EntityFrameworkCore;

namespace StoreApp.DAL.Exceptions.Handlers;

public interface IDbExceptionHandler
{
    void DetermineTypeOfDbUpdateException(DbUpdateException exception);
}