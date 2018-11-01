import {initProp, initData, initComputed, initWatch} from './init'

export default class Vue {
    constructor(options) {
        this._options = options || {};
        this._init();
    }
    _init() {
        initProp();
        initData();
        initComputed();
        initWatch();
    }
}