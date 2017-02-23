import { TreeNodeComponent } from './treenode/treenode.component';
import { Output, EventEmitter, ViewChildren, SkipSelf, Host, Optional, Input } from '@angular/core'
import { TreeNode, TreeViewConfig, NodeState } from './treenode/tree-node';

//Represents abstraction and basic implementation for tree-like components.  
export abstract class TreeViewComponent {
    //The dafault settings
    @Input() protected config: TreeViewConfig = new TreeViewConfig(false, false);

    //If it looks wierd or unfamiliar for you look into Template Method design pattern.
    abstract get children(): TreeNode[]
    removeChild(node: TreeNode) {
        if (this.children) {
            let idx = this.children.indexOf(node);
            console.log('BaseTreeViewComponent.removeChild. target index: ', idx)
            this.children.splice(idx, 1);
            this.onRemoved.emit(node);
        }
    }

    //If it looks wierd or unfamiliar for you look into Template Method design pattern.
    abstract get parent(): TreeViewComponent
    protected remove(node: TreeNode) {
        console.log('BaseTreeViewComponent.remove: ', node)
        this.parent.removeChild(node);
    }

    expanded: boolean
    private add() {
        //TODO: figure default values out
        let newNode = new TreeNode("", "", NodeState.creating)
        this.children.push(newNode);

        if (!this.expanded)
            this.expanded = true;
    }

    private readonly ENTER_KEY_CODE = 13;
    private save(node: TreeNode, text: string, keyCode = this.ENTER_KEY_CODE) {
        if (text && keyCode == this.ENTER_KEY_CODE) {
            node.text = text;
            node.state = NodeState.added;
            this.onCreated.emit(node);
        }
        console.log(`save. text: ${text}; code: ${keyCode};`);
    }


    @Output() onCreated = new EventEmitter<TreeNode>()
    protected onCreatedHandler(newNode: TreeNode) {
        console.log('BaseTreeViewComponent.onCreatedHandler: ', newNode)
        this.onCreated.emit(newNode);
    }

    //TODO: trigger this event in children classes
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

    //TODO: trigger this event in children classes
    @Output() onRemoving = new EventEmitter<TreeNode>()
    protected onRemovingHandler(node: TreeNode) {
        console.log('BaseTreeViewComponent.onRemovingHandler: ', node)
        this.onRemoving.emit(node);
    }
}
