import Observable from './observable.js'
import {isObject} from './utils'
function defineProxy(vm, data) {
    if(!data.__ob__) {
        data.__ob__ = new Observable(vm, options)
    }
    
    let proxyData = new Proxy(data, {
        get: (target, key, receiver) => {
            if(Observable.target) {
                data.__ob__.addWatcher(Observable.target);
            }
            return Reflect.get(target, key, receiver);
        },
        set: () => {
            Reflect.set(target, key, receiver);
            data.__ob__.notify();
        }
    });
    return proxyData;
}
function walkProxy(vm, data) {
    if(!isObject(data)) {
        return;
    }
    Object.keys(data).forEach((key) => {
        let proxyData = walkProxy(vm, data[key]);
        data[key] = proxyData ? proxyData : data[key];
    });
    return defineProxy(vm, data);
}
const proxy = (vm, data) => {
    vm.data =  walkProxy(vm, data);
}

export default proxy;