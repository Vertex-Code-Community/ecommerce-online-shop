namespace StoreApp.DAL.Exceptions;

public class ForeignKeyViolationException : Exception
{
    public ForeignKeyViolationException(string message)
        : base(message)
    {
    }

    public ForeignKeyViolationException(string message, Exception innerException)
        : base(message, innerException)
    {
    }
}
