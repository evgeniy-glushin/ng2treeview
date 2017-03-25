import { TreeViewConfig, NodeState, ITreeNode, ITreeNodeBase } from './tree-node';
import { Input, Output, EventEmitter } from '@angular/core';
import { TreeNodeComponent } from 'app/ng2-tree-view/tree-node-component';
export abstract class TreeViewComponent {
    //The dafault settings
    @Input() protected config: TreeViewConfig = new TreeViewConfig(true, true, true, 'simple');

    protected state: NodeState;

    protected toggle(node: ITreeNode<ITreeNodeBase>, escalation = false, value?: boolean) {
        //TODO: make sure that value? param is realy needed
        node.expanded = value !== undefined ?
            value : !node.expanded;

        console.log('TreeViewComponent.toggle: ', node);
        if (escalation) {
            escalateToggle(node, node.children);
        }

        console.log('TreeViewComponent.toggle. Before ontoggle emit');
        this.onToggle.emit();

        function escalateToggle(parentNode: ITreeNode<ITreeNodeBase>, children?: ITreeNode<ITreeNodeBase>[]) {
            if (children) {
                let stack = [...children];
                while (stack.length) {
                    let node = stack.pop() as ITreeNode<ITreeNodeBase>; //condition in while loop guarantees that it can't be undefined
                    node.expanded = parentNode.expanded;

                    if (node.children)
                        stack.push(...node.children);
                }
            }
        }
    }

    protected removeChild(children: ITreeNodeBase[], node: ITreeNodeBase) {
        console.log(`removeChild. node: ${node.text}; children: `, children)
        if (children) {
            let idx = children.indexOf(node);
            console.log('TreeViewComponent.removeChild. target index: ', idx);
            children.splice(idx, 1);
            this.onRemoved.emit(node);
        }
    }

    @Output() protected onToggle = new EventEmitter();
    protected onToggleHandler() {
        console.log('TreeViewComponent.onToggleHandler.');
        return this.onToggle.emit();
    }

    @Output() onRemoved = new EventEmitter<ITreeNode<ITreeNodeBase>>();
    protected onRemovedHandler(node: ITreeNode<ITreeNodeBase>) {
        console.log('TreeViewComponent.onRemovedHandler: ', node);
        this.onRemoved.emit(node);
    }

    @Output() onRemove = new EventEmitter<ITreeNode<ITreeNodeBase>>();
    protected abstract onRemoveHandler(node: ITreeNode<ITreeNodeBase>);
    // {
    //     console.log('TreeViewComponent.onRemoveHandler: ', node);
    //     // this.removeChild
    // }

    @Output() onCreated = new EventEmitter<ITreeNode<ITreeNodeBase>>();
    protected onCreatedHandler(newNode: ITreeNode<ITreeNodeBase>) {
        console.log('TreeViewComponent.onCreatedHandler: ', newNode);
        this.onCreated.emit(newNode);
    }

}
