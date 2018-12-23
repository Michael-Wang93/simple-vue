export default class Watcher {
    observables = [];
    getter;
    value;
    constructor(vm, get, options) {
        this.getter = get;
        this.value = getter.call(vm);
    }
    update() {
        queueWatcher(this)
    }
    addObservable(observable) {
        this.observables.push(observable)
    }
}