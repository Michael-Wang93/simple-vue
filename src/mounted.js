import patch from './patch'
import {performWork, scheduleWork} from './schedule-work'
import {Renderer} from './renderer'
import {tag} from './tags'
import callhook from './callhook'
import Watcher from './watch'
const mountedComponent = (vm, Container)=> {
    vm.$el = Container;
    Renderer.updateQueue.push({
        fromTag: tag.HOST_ROOT,
        stateNode: Container,
        props: { children: Vnode }
    })

    updateComponent = () => {
        vm._update(vm._render(), hydrating)
    }
    new Watcher(vm, updateComponent, () => {}, {
        before () {
          if (vm._isMounted && !vm._isDestroyed) {
            callHook(vm, 'beforeUpdate')
          }
        }
    }, true /* isRenderWatcher */);
}
export default mounted;