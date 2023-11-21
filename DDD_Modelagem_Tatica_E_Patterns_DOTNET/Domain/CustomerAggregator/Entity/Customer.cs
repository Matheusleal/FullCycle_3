using Domain.Shared.Domain;
using Domain.Shared.Exceptions;

namespace Domain.CustomerAggregator.Entity;
public class Customer : AggregatedRoot
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public bool Active { get; private set; }
    public int RewardPoints { get; private set; }
    public CustomerAddress? Address { get; private set; }

    public Customer(Guid id, string name)
    {
        Id = id;
        Name = name;

        Validate();
    }

    private void Validate()
    {
        if (Id == Guid.Empty) throw new DomainPropertyException("Id is required");
        if (!Name.IsValid()) throw new DomainPropertyException("Name is required");
    }

    public void SetAddress(CustomerAddress address)
    {
        Address = address;
    }

    public void AddRewardPoints(int points)
    {
        RewardPoints += points;
    }

    public void ChangeName(string name)
    {
        Name = name;

        Validate();
    }

    public void Activate()
    {
        if (Address == null) throw new DomainPropertyException("Address is required");

        Address.Validate();

        Active = true;
    }

    public void Deactivate()
    {
        Active = false;
    }
}
