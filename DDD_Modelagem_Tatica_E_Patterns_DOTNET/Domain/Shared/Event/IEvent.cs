namespace Domain.Shared.Event;
public interface IEvent
{
    DateTime DateTimeOccured { get; init; }
    object Data { get; init; }
}
