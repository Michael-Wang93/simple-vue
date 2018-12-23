export default class Observable {
    constructor(vm, options) {
        this.vm = vm;
        this.watchers = [];
    }
    notify() {
        this.watchers.forEach(item => {
            item.update();
        })
    }
    addWatcher(watcher) {
        const self = this;
        this.watchers.push(watcher);
        if(Observable.target) {
            Observable.target.addObservable(self);
        }
    }
    setWatcherTarget(watcher) {
        Observable.target = watcher;
    }
    cleanWatcherTarget() {
        Observable.target = null;
    }
}
Observable.target = null