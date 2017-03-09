export interface ITreeNodeBase extends ICloneable {
    id: string;
    text: string;
    expanded: boolean;
    parent?: ITreeNodeBase;
}

export interface ITreeNode<TChild> extends ITreeNodeBase {
    children?: ITreeNode<TChild>[];
}

export interface ICloneable {
    clone(): any;
}

export class TextTreeNode implements ITreeNode<TextTreeNode>{
    parent?: TextTreeNode;

    constructor(public id: string,
        public text: string,
        public children?: TextTreeNode[],
        public expanded = false) {
    }

    clone(): TextTreeNode {
        let childrenClone = this.children ? this.children.map(n => n.clone()) : [];

        return new TextTreeNode(this.id, this.text, childrenClone, this.expanded);
    }
}

export class CheckTreeNode implements ITreeNode<CheckTreeNode> {
    parent?: TextTreeNode;

    constructor(public id: string,
        public text: string,
        public children?: CheckTreeNode[],
        public expanded = false,
        public checked = false) {
    }

    /**
    * Gets whether this node can be marked as checked or partially checked (if some children are not checked)
    */
    public get someChildrenChecked() {
        if (this.children) {
            let some = this.children.some(n => n.checked || n.someChildrenChecked);
            // console.log(`anyChildrenChecked. id: ${this.text}; checked: ${this.checked}; anyChildrenChecked: `, some);
            return some;
        }

        return false;
    }

    clone(): CheckTreeNode {
        let childrenClone = this.children ? this.children.map(n => n.clone()) : [];

        return new CheckTreeNode(this.id, this.text, childrenClone, this.expanded, this.checked);
    }
}

export enum NodeState {
    unchanged,
    added,
    creating
}

export class TreeViewConfig {
    constructor(public allowAdd: boolean,
        public allowRemove: boolean,
        public escalation: boolean,
        public mode: TreeViewMode,
        public color?: string) {
    }
}

export type TreeViewMode = 'simple' | 'check';

export type AddNodeCallback = () => void;

export function createTreeNode(mode: TreeViewMode) {
    let newId = Date.now().toString();
    switch (mode) {
        case 'simple':
            return new TextTreeNode(newId, '');
        case 'check':
            return new CheckTreeNode(newId, '');

        default:
            throw new Error(`Unknown mode: ${mode};`);
    }
}



