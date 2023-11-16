namespace Domain.Shared.Event;
internal interface IEventDispatcher<TEventDataType>
{
    void Notify(TEventDataType data);
    void Register(string eventName, IEventHandler<TEventDataType> handler);
    void Unregister(string eventName, IEventHandler<TEventDataType> handler);
    void UnregisterAll();
}
