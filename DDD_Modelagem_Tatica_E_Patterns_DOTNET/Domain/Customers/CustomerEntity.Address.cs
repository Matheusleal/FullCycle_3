using Domain.Shared.Exceptions;

namespace Domain.Customers;
public class CustomerAddress
{
    public string Street { get; private set; } = string.Empty;
    public string ZipCode { get; private set; } = string.Empty;
    public string City { get; private set; } = string.Empty;
    public int Number { get; private set; }

    public CustomerAddress(
        string street,
        int number,
        string zipCode,
        string city
        )
    {
        Street = street;
        Number = number;
        ZipCode = zipCode;
        City = city;

        Validate();
    }

    public void Validate()
    {
        if (!Street.IsValid()) throw new DomainPropertyException("Street is required");
        if (!ZipCode.IsValid()) throw new DomainPropertyException("ZipCode is required");
        if (!City.IsValid()) throw new DomainPropertyException("City is required");
        if(Number == 0 ) throw new DomainPropertyException("Number is required");
    }

    public string ToString()
    {
        return $"{Street}, {Number},  {ZipCode} - {City}";
    }
}
