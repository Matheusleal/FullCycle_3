using Domain.CustomerAggregator.Factory;

namespace Domain.UnityTest.CustomerAggregate.Factory;

public class CustomerFactoryTests
{
    //[ThingUnderTest]_Should_[ExpectedResult]_[Conditions]
    [Fact]
    public void Create_Should_Works_WithCorrectData()
    {
        //Arrange
        string name = "John";
        //Act
        var customer = CustomerFactory.Create(name);

        //Assert
        Assert.Equal("John", customer.Name);
    }

    [Fact]
    public void CreateWithAddress_Should_Works_WithCorrectData()
    {
        //Arrange
        string name = "John";

    }
}

