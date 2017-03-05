export interface ITreeNodeBase{
    id: string,
    text: string,
    expanded: boolean,
    parent?: ITreeNodeBase    
}

export interface ITreeNode<TChild> extends ITreeNodeBase {
    children?: ITreeNode<TChild>[],
}

export class TreeNode implements ITreeNode<TreeNode> {
    parent?: TreeNode
    
    constructor(public id: string,
        public text: string,
        public children?: TreeNode[],
        public expanded = false) {
    }     
}

export class CheckTreeNode implements ITreeNode<CheckTreeNode> {
    parent?: TreeNode 
    
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

export function createTreeNode(mode: TreeViewMode) {
    switch (mode) {
        case 'simple':
            return new TreeNode('', '')
        case 'check':
            return new CheckTreeNode('', '')

        default:
            throw `Unknown mode: ${mode};`;
    }
}

