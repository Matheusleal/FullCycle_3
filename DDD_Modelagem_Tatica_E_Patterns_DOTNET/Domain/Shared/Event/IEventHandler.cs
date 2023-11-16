namespace Domain.Shared.Event;
internal interface IEventHandler<TEventDataType> : IEvent
{
    void Handle(TEventDataType eventProps);
}
