namespace StoreApp.DAL.Exceptions;

public class DuplicateRecordException : Exception
{
    public DuplicateRecordException(string message)
        : base(message)
    {
    }

    public DuplicateRecordException(string message, Exception innerException)
        : base(message, innerException)
    {
    }
}
