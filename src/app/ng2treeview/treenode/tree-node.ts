export class TreeNode {
    constructor(public id: string,
        public text: string,
        public children?: TreeNode[],
        public expanded = true) {
    }
}

export class CheckTreeNode extends TreeNode {
    constructor(public id: string,
        public text: string,
        public children?: CheckTreeNode[],
        public expanded: boolean = true,
        public checked: boolean = false) {
        super(id, text, children, expanded);
    }
}

export enum NodeState {
    unchanged,
    added,
    creating
}

export class TreeViewConfig {
    constructor(public allowAdding: boolean,
        public allowRemoving: boolean,
        public escalation: boolean,
        public mode: TreeViewMode) {

    }
}

export type TreeViewMode = 'simple' | 'check'

export type AddNodeCallback = () => void;

