combineReduce = reducer => {
    return (states, action) => {
        return Object.keys(states).reduce((nextState, key) => {
            nextState[key] = reducer[key](state[key], action);
        }, {});
    }
}


const createStore = reducer => {
    let states = {};
    let listeners = [];
    const getStates = () => {
        return states;
    }
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => {
            listener();
        })
    }
    const subscribe = () => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }

}