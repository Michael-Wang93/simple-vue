import {Renderer} from './renderer'
import {performUnitOfWork} from './collect-work'
import {commitAllwork} from './commit-work'
const EXPIRATION_TIME = 1 // 逾期时间
function workLoop() {
    if (!Renderer.nextUnitOfWork) {
        //一个周期内只创建一次
        Renderer.nextUnitOfWork = createWorkInProgress(Renderer.updateQueue)
    }
    while (Renderer.nextUnitOfWork && deadline.timeRemaining() > EXPIRATION_TIME) {
        Renderer.nextUnitOfWork = performUnitOfWork(Renderer.nextUnitOfWork)
    }
    
    if (Renderer.pendingCommit) {
        //当全局 Renderer.pendingCommit 变量被负值
        commitAllwork(Renderer.pendingCommit)
    }
}
function performWork(deadline) {
    workLoop(deadline)
    if (Renderer.nextUnitOfWork || Renderer.updateQueue.length > 0) {
        requestIdleCallback(performWork) //继续干
    }
}
function scheduleWork(vm, updater) {
    Renderer.updateQueue.push(updater)
    requestIdleCallback(performWork)
}
export default {
    workLoop,
    performWork,
    scheduleWork
}