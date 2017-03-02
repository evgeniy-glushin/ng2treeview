import { TreeNodeComponent } from './treenode/treenode.component';
import { Output, EventEmitter, Input } from '@angular/core'
import { TreeNode, TreeViewConfig, NodeState, AddNodeCallback, ITreeNode, createTreeNode } from './treenode/tree-node';

//Represents abstraction and basic implementation for tree-like components.  
export abstract class TreeViewComponent<TNode extends ITreeNode<TNode>> {
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

    private _node: TNode;
    @Input() protected set node(value: TNode) {
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
    abstract get children(): ITreeNode<TNode>[]
    removeChild(node: TNode) {
        if (this.children) {
            let idx = this.children.indexOf(node);
            console.log('TreeViewComponent.removeChild. target index: ', idx)
            this.children.splice(idx, 1);
            this.onRemoved.emit(node);
        }
    }

    //If it looks wierd or unfamiliar for you look into Template Method design pattern.
    abstract get parent(): TreeViewComponent<TNode>
    protected remove(node: TNode) {
        console.log('TreeViewComponent.remove: ', node)
        this.parent.removeChild(node);
    }

    // abstract toggle(escalation: boolean, value?: boolean): void;
    protected toggle(escalation: boolean = false, value?: boolean) {
        console.log(`TreeNodeComponent.toggle. 
                  escalation: ${escalation}; 
                  node.expanded: ${this.node.expanded}; 
                  value: ${value};
                  children: `, this.node.children)

        this.node.expanded = value != undefined ?
            value : !this.node.expanded;

        if (escalation) {
            this.escalateToggle(this.node.children);
        }
    }

    private escalateToggle(children?: ITreeNode<TNode>[]) {
        console.log('TreeNodeComponent.escalateToggle: ', children)
        if (children) {
            let stack = [...children]
            while (stack.length) {
                let node = stack.pop() as ITreeNode<TNode>; //condition in while loop guarantees that it can't be undefined 
                node.expanded = this.node.expanded

                if (node.children)
                    stack.push(...node.children)
            }
        }
    }


    protected add() {
        console.log(`TreeViewComponent. add was called.`);
        let validationResult = this.onCreating.emit(() => {
            console.log(`TreeViewComponent. add. emit callback`);

            //TODO: figure default values out
            let newNode = createTreeNode(this.config.mode)
            this.children.push(newNode);

            this.toggle(false, true)
        });
    }

    private readonly ENTER_KEY_CODE = 13;
    private save(node: ITreeNode<TNode>, text: string, keyCode = this.ENTER_KEY_CODE) {
        if (text && keyCode == this.ENTER_KEY_CODE) {
            node.text = text;
            this.state = NodeState.added;
            this.onCreated.emit(node);
        }
        console.log(`save. text: ${text}; code: ${keyCode};`);
    }


    protected get folderUrl() {
        let postfix = '';

        if (this.hasChildren && this.node.expanded) {
            postfix = '-minus';
        } else if (this.hasChildren && !this.node.expanded) {
            postfix = '-plus';
        }

        return `../../assets/icons/folder${postfix}.svg`;
    }

    protected click(node: ITreeNode<TNode>) {
        this.onClick.emit(node);
    }

    @Output() onClick = new EventEmitter<ITreeNode<TNode>>()
    protected onClickHandler(node: ITreeNode<TNode>) {
        console.log('TreeViewComponent.onClickHandler: ', node)
        this.onClick.emit(node);
    }

    @Output() onCreated = new EventEmitter<ITreeNode<TNode>>()
    protected onCreatedHandler(newNode: ITreeNode<TNode>) {
        console.log('TreeViewComponent.onCreatedHandler: ', newNode)
        this.onCreated.emit(newNode);
    }

    @Output() onRemoved = new EventEmitter<ITreeNode<TNode>>()
    protected onRemovedHandler(node: ITreeNode<TNode>) {
        console.log('TreeViewComponent.onRemovedHandler: ', node)
        this.onRemoved.emit(node);
    }

    @Output() protected onCreating = new EventEmitter<AddNodeCallback>()
    protected onCreatingHandler(addCallback: AddNodeCallback) {
        console.log('TreeViewComponent.onCreatingHandler.')
        return this.onCreating.emit(addCallback);
    }
}
