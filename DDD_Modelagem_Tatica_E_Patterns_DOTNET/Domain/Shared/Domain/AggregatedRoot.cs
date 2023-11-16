namespace Domain.Shared.Domain;

public abstract class AggregatedRoot
{
    private HashSet<IDomainEvent> Events { get; set; } = new();

    protected void AddEvent(IDomainEvent dataEvent)
    {
        Events.Add(dataEvent);
    }
    protected void ClearEvents()
    {
        Events.Clear();
    }
}
