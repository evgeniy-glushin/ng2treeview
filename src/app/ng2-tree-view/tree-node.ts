export interface ITreeNodeBase{
    id: string;
    text: string;
    expanded: boolean;
    parent?: ITreeNodeBase;
}

export interface ITreeNode<TChild> extends ITreeNodeBase {
    children?: ITreeNode<TChild>[];
}

export class TextTreeNode implements ITreeNode<TextTreeNode> {
    parent?: TextTreeNode;

    constructor(public id: string,
        public text: string,
        public children?: TextTreeNode[],
        public expanded = false) {
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

export type TreeViewMode = 'simple' | 'check';

export type AddNodeCallback = () => void;

export function createTreeNode(mode: TreeViewMode) {
    switch (mode) {
        case 'simple':
            return new TextTreeNode('', '');
        case 'check':
            return new CheckTreeNode('', '');

        default:
            throw new Error(`Unknown mode: ${mode};`);
    }
}

