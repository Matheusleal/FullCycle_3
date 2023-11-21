using Domain.CustomerAggregator.Entity;
using Domain.Shared.Exceptions;

namespace Domain.UnityTest.CustomerAggregate.Entity;

public class CustomerTests
{
    //[ThingUnderTest]_Should_[ExpectedResult]_[Conditions]
    [Fact]
    public void Create_Should_Works_WithCorrectData()
    {
        // Arrange

        Guid id = Guid.NewGuid();
        string name = "Matheus Leal";

        // Act
        var customer = new Customer(id, name);

        // Assert

        Assert.Equal(id, customer.Id);
        Assert.Equal(name, customer.Name);
    }

    [Fact]
    public void Create_Should_ThrowException_WithNoId()
    {
        // Arrange
        Guid id = new();
        string name = "Matheus Leal";

        // Act
        Exception exception = Assert.Throws<DomainPropertyException>(() => new Customer(id, name));

        // Assert
        Assert.Equal("Id is required", exception.Message);
    }

    [Fact]
    public void Create_Should_ThrowException_WithNoName()
    {
        // Arrange
        Guid id = Guid.NewGuid();
        string name = "";

        // Act
        Exception exception = Assert.Throws<DomainPropertyException>(() => new Customer(id, name));

        // Assert
        Assert.Equal("Name is required", exception.Message);
    }

    [Fact]
    public void ChangeName_Should_Works_WithCorrectData()
    {
        // Arrange

        Guid id = Guid.NewGuid();
        string name = "Matheus Leal";
        var customer = new Customer(id, name);

        // Act
        Assert.Equal(name, customer.Name);

        customer.ChangeName("Gumercindo Pereira");

        // Assert

        Assert.Equal("Gumercindo Pereira", customer.Name);
    }

    [Fact]
    public void ChangeName_Should_ThrowExcption_WithIncorrectNewName()
    {
        // Arrange

        Guid id = Guid.NewGuid();
        string name = "Matheus Leal";
        var customer = new Customer(id, name);

        // Act
        Assert.Equal(name, customer.Name);

        // Assert

        Exception exception = Assert.Throws<DomainPropertyException>(() => customer.ChangeName(""));

        // Assert
        Assert.Equal("Name is required", exception.Message);
    }

    [Fact]
    public void Activate_Should_Works_WithCorrectData()
    {
        // Arrange
        Guid id = Guid.NewGuid();
        string name = "Matheus Leal";
        var customer = new Customer(id, name);
        var address = new CustomerAddress("Rua 1", 312, "13143-431", "São Paulo");

        customer.SetAddress(address);

        customer.Activate();

        // Assert

        Assert.True(customer.Active);
    }

    [Fact]
    public void Activate_Should_ThrowException_WithNoAddress()
    {
        // Arrange
        Guid id = Guid.NewGuid();
        string name = "Matheus Leal";
        var customer = new Customer(id, name);

        Exception exception = Assert.Throws<DomainPropertyException>(() => customer.Activate());

        // Assert
        Assert.Equal("Address is required", exception.Message);
    }

    [Fact]
    public void Deactivate_Should_Works_WithNoValidations()
    {
        // Arrange
        Guid id = Guid.NewGuid();
        string name = "Matheus Leal";
        var customer = new Customer(id, name);
        var address = new CustomerAddress("Rua 1", 312, "13143-431", "São Paulo");

        customer.SetAddress(address);

        customer.Deactivate();

        // Assert

        Assert.False(customer.Active);
    }

    [Fact]
    public void AddRewardPoints_Should_Works_WithNoValidations()
    {
        // Arrange
        Guid id = Guid.NewGuid();
        string name = "Matheus Leal";
        var customer = new Customer(id, name);

        //Act
        customer.AddRewardPoints(10);

        Assert.Equal(10, customer.RewardPoints);

        customer.AddRewardPoints(10);

        // Assert
        Assert.Equal(20, customer.RewardPoints);
    }
}
