import {Renderer} from './renderer'
import {tag} from './tags'
function performUnitOfWork(workInProgress) {
    const nextChild = beginWork(workInProgress)
    if (nextChild) return nextChild
    // 没有 nextChild, 我们看看这个节点有没有 sibling
    let current = workInProgress
    while (current) {
        //收集当前节点的effect，然后向上传递
        completeWork(current)
        if (current.sibling) return current.sibling
        if (!current.return) {
        // 到达最顶端了
        Renderer.pendingCommit = current
        }
        //没有 sibling，回到这个节点的父亲，看看有没有sibling
        current = current.return
    }
}

function beginWork(currentFiber) {
    switch (currentFiber.tag) {
        case tag.CLASS_COMPONENT: {
            return updateClassComponent(currentFiber)
        }
        case tag.FunctionalComponent: {
            return updateFunctionalComponent(currentFiber)
        }
        default: {
            return updateHostComponent(currentFiber)
        }
    }
}

function completeWork() {

}

export default {
    performUnitOfWork
}