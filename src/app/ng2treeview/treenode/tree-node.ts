export interface ITreeNode<TChild> {
    id: string,
    text: string,
    children?: TChild[],
    expanded: boolean
}

export class TreeNode implements ITreeNode<TreeNode> {
    constructor(public id: string,
        public text: string,
        public children?: TreeNode[],
        public expanded = false) {
    }
}

export class CheckTreeNode implements ITreeNode<CheckTreeNode> {
    constructor(public id: string,
        public text: string,
        public children?: CheckTreeNode[],
        public expanded: boolean = false,
        public checked: boolean = false) {
        // super(id, text, children, expanded);
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
        public mode: TreeViewMode) {

    }
}

export type TreeViewMode = 'simple' | 'check'

export type AddNodeCallback = () => void;

