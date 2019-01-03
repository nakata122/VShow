let subscriptions = {
    'logging': [],
    'notifications': []
};

export default {
    subscribe: (eventName, fn) => {
        subscriptions[eventName].push(fn);
    },
    unsubscribe: (eventName, fn) => {
        subscriptions[eventName] = subscriptions[eventName].filter(subscriber => subscriber !== fn);
    },
    fire: (eventName, data) =>{
        subscriptions[eventName].forEach((fn) => {
            fn(data);
        })
    }
}