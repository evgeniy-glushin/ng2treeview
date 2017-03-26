import { TreeViewComponent } from './tree-view-component';
import { Output, EventEmitter, Input } from '@angular/core';
import { TextTreeNode, TreeViewConfig, NodeState, AddNodeCallback, ITreeNode, createTreeNode, ITreeNodeBase } from './tree-node';

//Represents abstraction and basic implementation for tree-like components.
export abstract class TreeNodeComponent<TNode extends ITreeNode<TNode>> extends TreeViewComponent {
    private _node: TNode;
    @Input() set node(value: TNode) {
        if (!value.text)
            this.state = NodeState.creating;

        this._node = value;
    }

    protected add() {
        console.log(`TreeViewComponent. add was called.`);
        let validationResult = this.onCreating.emit(() => {
            console.log(`TreeViewComponent. add. emit callback`);

            //TODO: figure default values out
            let newNode = createTreeNode(this.config.mode, this.node);
            this.children.push(newNode);

            this.toggle(this.node, false, true);
        });
    }

    protected onRemoveHandler(node: ITreeNode<ITreeNodeBase>) {
        if (node.parent && node.parent.children)
            this.removeChild(node.parent.children, node);
    }

    protected readonly ENTER_KEY_CODE = 13;
    protected save(node: ITreeNode<TNode>, text: string, keyCode = this.ENTER_KEY_CODE) {
        if (text && keyCode === this.ENTER_KEY_CODE) {
            node.text = text;
            this.state = NodeState.added;
            console.log(`save.`, node);
            this.onCreated.emit(node);
        }
        console.log(`save. text: ${text}; code: ${keyCode};`);
    }

    protected click() {
        this.onClick.emit(this);
    }

    protected get hasChildren() {
        const children = this.node.children;
        return (children !== undefined && children.length > 0);
    }

    protected get isCreating() {
        return this.state === NodeState.creating;
    }

    get node() {
        return this._node;
    }

    selected = false;

    protected get iconUrl() {
        let postfix = '';

        if (this.hasChildren && this.node.expanded) {
            postfix = '-minus';
        } else if (this.hasChildren && !this.node.expanded) {
            postfix = '-plus';
        }

        return `../../assets/icons/folder${postfix}.svg`;
    }

    //TODO according to latest changes make sure I realy need this prop.
    abstract get children(): ITreeNode<ITreeNodeBase>[]
    protected remove(node: ITreeNode<ITreeNodeBase>) {
        console.log('TreeViewComponent.remove: ', node);
        this.onRemove.emit(node);
    }

    @Output() protected onClick = new EventEmitter<TreeNodeComponent<ITreeNodeBase>>();
    protected onClickHandler(component: TreeNodeComponent<ITreeNodeBase>) {
        console.log('TreeViewComponent.onClickHandler: ', component);
        this.onClick.emit(component);
    }


    @Output() protected onCreating = new EventEmitter<AddNodeCallback>();
    protected onCreatingHandler(addCallback: AddNodeCallback) {
        console.log('TreeViewComponent.onCreatingHandler.');
        return this.onCreating.emit(addCallback);
    }


}
