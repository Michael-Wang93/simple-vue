import {initProp, initData, initComputed, initWatch, initLifecycle, initOptions} from './init'
import initInstance from './instance.js'
import initGlobal from './global.js'
import callhook from './callhook'

export default class Vue {
    constructor(options) {
        const vm = this;
        this._options = options || {};
        callhook(vm, 'beforeCreate');
        this._init(vm);
    }
    _init(vm) {
        initLifecycle(vm);
        initOptions(vm);
        initProp(vm);
        initData(vm);
        initComputed(vm);
        initWatch(vm);
    }
}
initInstance(Vue);
initGlobal(Vue);