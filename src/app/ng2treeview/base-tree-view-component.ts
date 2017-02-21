import { Output, EventEmitter, ViewChildren } from '@angular/core'
import { TreeNode } from './treenode/tree-node';

export abstract class BaseTreeViewComponent {
    @Output() onCreated = new EventEmitter<TreeNode>()
    protected onCreatedHandler(newNode: TreeNode) {
        console.log('BaseTreeViewComponent.onCreatedHandler: ', newNode)
        this.onCreated.emit(newNode);
    }

    //TODO: trigger this event
    @Output() onCreating = new EventEmitter<TreeNode>()
    protected onCreatingHandler(newNode: TreeNode) {
        console.log('BaseTreeViewComponent.onCreatingHandler: ', newNode)
        this.onCreating.emit(newNode);
    }

    @Output() onRemoved = new EventEmitter<TreeNode>()
    protected onRemovedHandler(node: TreeNode) {
        console.log('BaseTreeViewComponent.onRemovedHandler: ', node)
        this.onRemoved.emit(node);
    }

    //TODO: trigger this event
    @Output() onRemoving = new EventEmitter<TreeNode>()
    protected onRemovingHandler(node: TreeNode) {
        console.log('BaseTreeViewComponent.onRemovingHandler: ', node)
        this.onRemoving.emit(node);
    }
}
