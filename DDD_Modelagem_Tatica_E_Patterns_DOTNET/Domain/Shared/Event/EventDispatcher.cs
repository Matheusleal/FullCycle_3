using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Shared.Event;
internal class EventDispatcher<TEventDataType> : IEventDispatcher<TEventDataType>
    where TEventDataType : IEvent
{
    internal Dictionary<string, List<IEventHandler<TEventDataType>>> Handlers { get; private set; } = new();

    public void Notify(TEventDataType data)
    {
        string eventName = data.GetType().Name;

        if (!Handlers.ContainsKey(eventName))
        {
            Handlers[eventName]
                .ForEach(x => x.Handle(data));
        }
    }

    public void Register(string eventName, IEventHandler<TEventDataType> handler)
    {
        if (!Handlers.ContainsKey(eventName))
            Handlers.Add(eventName, new List<IEventHandler<TEventDataType>>());

        Handlers[eventName].Add(handler);
    }

    public void Unregister(string eventName, IEventHandler<TEventDataType> handler)
    {
        if (!Handlers.ContainsKey(eventName))
            return;

        int index = Handlers[eventName].FindIndex(x => x == handler);

        if (index != -1)
            Handlers[eventName].Remove(handler);
    }

    public void UnregisterAll()
    {
        Handlers.Clear();
    }
}