const queues = [];
let pending = false;
let useMacroTask = false;

const flushQueues = () => {
    pending = false;
    queues.forEach(queue => {
        queue();
    });
}
const macroQueueCb = () => {
    setTimeout(() => {
        flushQueues();
    }, 0)
}
const microQueueCb = () => {
    if (typeof Promise !== 'undefined') {
        const p = Promise.resolve()
        p.then(flushCallbacks)
    } else {
        macroQueueCb();
    }
}
export function nextTick(queue, context) {
    queues.push(() => {
        if(queue) {
            queue();
        }
    });
    if(!pending) {
        pending = true
        if(useMacroTask) {
            macroQueueCb();
        } else {
            microQueueCb();
        }
    }
    return Promise.resolve();
}