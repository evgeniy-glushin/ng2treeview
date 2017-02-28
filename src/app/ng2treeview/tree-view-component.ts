import { TreeNodeComponent } from './treenode/treenode.component';
import { Output, EventEmitter, ViewChildren, SkipSelf, Host, Optional, Input, QueryList, AfterViewInit, AfterContentInit, ContentChildren } from '@angular/core'
import { TreeNode, TreeViewConfig, NodeState, AddNodeCallback } from './treenode/tree-node';

//Represents abstraction and basic implementation for tree-like components.  
export abstract class TreeViewComponent {
    //The dafault settings
    @Input() protected config: TreeViewConfig = new TreeViewConfig(true, true, true, 'simple');

    protected state: NodeState;

    protected get hasChildren() {
        let children = this.node.children;
        return (children != undefined && children.length > 0);
    }

    protected get isCreating() {
        return this.state == NodeState.creating;
    }

    private _node: TreeNode;
    @Input() protected set node(value: TreeNode) {
        // console.log('TreeNodeComponent.setNode', value)
        if (!value.id && !value.text)
            this.state = NodeState.creating;

        this._node = value;
    }

    protected get node() {
        // console.log('TreeNodeComponent.getNode', this._node)
        return this._node;
    }


    //If it looks wierd or unfamiliar for you look into Template Method design pattern.
    abstract get children(): TreeNode[]
    removeChild(node: TreeNode) {
        if (this.children) {
            let idx = this.children.indexOf(node);
            console.log('TreeViewComponent.removeChild. target index: ', idx)
            this.children.splice(idx, 1);
            this.onRemoved.emit(node);
        }
    }

    //If it looks wierd or unfamiliar for you look into Template Method design pattern.
    abstract get parent(): TreeViewComponent
    protected remove(node: TreeNode) {
        console.log('TreeViewComponent.remove: ', node)
        this.parent.removeChild(node);
    }

    abstract toggle(escalation: boolean, value?: boolean): void;
    private add() {
        let validationResult = this.onCreating.emit(() => {
            console.log(`TreeViewComponent. add. emit callback`);

            //TODO: figure default values out
            let newNode = new TreeNode("", "")
            this.children.push(newNode);

            this.toggle(false, true)
        });
    }

    private readonly ENTER_KEY_CODE = 13;
    private save(node: TreeNode, text: string, keyCode = this.ENTER_KEY_CODE) {
        if (text && keyCode == this.ENTER_KEY_CODE) {
            node.text = text;
            this.state = NodeState.added;
            this.onCreated.emit(node);
        }
        console.log(`save. text: ${text}; code: ${keyCode};`);
    }

    @Output() onClick = new EventEmitter<TreeNode>()
    protected onClickHandler(node: TreeNode) {
        console.log('TreeViewComponent.onClickHandler: ', node)
        this.onClick.emit(node);
    }

    @Output() onCreated = new EventEmitter<TreeNode>()
    protected onCreatedHandler(newNode: TreeNode) {
        console.log('TreeViewComponent.onCreatedHandler: ', newNode)
        this.onCreated.emit(newNode);
    }

    @Output() onRemoved = new EventEmitter<TreeNode>()
    protected onRemovedHandler(node: TreeNode) {
        console.log('TreeViewComponent.onRemovedHandler: ', node)
        this.onRemoved.emit(node);
    }

    @Output() protected onCreating = new EventEmitter<AddNodeCallback>()
    protected onCreatingHandler(addCallback: AddNodeCallback) {
        console.log('TreeViewComponent.onCreatingHandler.')
        //TODO: Perform validation stuff and only then apply addCallback. 
        //For instance make sure that we can't create two and more nodes simultaneously.          
        return this.onCreating.emit(addCallback);
    }
}
