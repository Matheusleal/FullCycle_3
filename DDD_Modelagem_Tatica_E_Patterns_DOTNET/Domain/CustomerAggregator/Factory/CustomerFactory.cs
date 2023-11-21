using Domain.CustomerAggregator.Entity;

namespace Domain.CustomerAggregator.Factory;
public static class CustomerFactory
{
    public static Customer Create(string name)
    {
        return new Customer(Guid.NewGuid(), name);
    }

    public static Customer CreateWithAddress(string name, CustomerAddress address)
    {
        var customer = Create(name);

        customer.SetAddress(address);
        customer.ClearEvents();

        return customer;
    }
}
