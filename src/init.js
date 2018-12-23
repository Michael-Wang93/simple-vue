import proxy from './proxy'
import mounted from './mounted'
export const initProp = (vm) => {

}

export const initData = (vm) => {
    let _data = vm._options.data;
    proxy(vm, _data);
}

export const initComputed = (vm) => {
    
}

export const initWatch = (vm) => {
    
}

export const initLifecycle = (vm) => {
    vm.mounted = (el) => {
        mounted(vm, el);
    };
}

export const initOptions = (vm) => {
    let options = vm._options;
    vm._render = options.render;
}
