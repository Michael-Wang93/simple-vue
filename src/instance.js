import mountedComponent from './mounted.js';
const registerInstanceMethod = (Vue) => {
    Vue.prototype.$mounted = (el) => {
        mountedComponent(this, el)
    }
    Vue.prototype._update = (vnode) => {

    }
}
export default registerInstanceMethod;