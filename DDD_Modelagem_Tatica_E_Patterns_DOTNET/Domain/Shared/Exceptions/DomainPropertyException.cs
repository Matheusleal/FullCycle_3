namespace Domain.Shared.Exceptions;
public class DomainPropertyException : Exception
{
    public DomainPropertyException(string message) : base(message) { }
}
