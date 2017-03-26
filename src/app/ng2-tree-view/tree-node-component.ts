import { Output, EventEmitter, Input } from '@angular/core';
import { TextTreeNode, TreeViewConfig, NodeState, AddNodeCallback, ITreeNode, ITreeNodeBase } from './tree-node';
import * as util from './utils';

//Represents abstraction and basic implementation for tree-like components.
export abstract class TreeNodeComponent<TNode extends ITreeNode<TNode>> {
    //The dafault settings
    @Input() protected config: TreeViewConfig = new TreeViewConfig(true, true, true, 'simple');

    protected state: NodeState;

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


    @Output() onCreated = new EventEmitter<ITreeNode<ITreeNodeBase>>();
    protected onCreatedHandler(newNode: ITreeNode<ITreeNodeBase>) {
        console.log('TreeViewComponent.onCreatedHandler: ', newNode);
        this.onCreated.emit(newNode);
    }




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
            let newNode = util.createTreeNode(this.config.mode, this.node);
            util.addChild(this.node, newNode);

            this.toggle(this.node, false, true);
        });
    }

    protected toggle(node: ITreeNode<ITreeNodeBase>, escalation = false, value?: boolean) {
        util.toggle(node, escalation, value);
        this.onToggle.emit();
    }

    @Output() onRemove = new EventEmitter<ITreeNode<ITreeNodeBase>>();
    protected onRemoveHandler(node: ITreeNode<ITreeNodeBase>) {
        if (node.parent) {
            util.removeChild(node, node.parent.children);
            this.onRemoved.emit(node);
        }
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
        return util.hasChildren(this.node)
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
