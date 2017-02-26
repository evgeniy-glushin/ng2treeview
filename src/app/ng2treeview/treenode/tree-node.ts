export class TreeNode {
    constructor(public id: string,
        public text: string,
        public state: NodeState = NodeState.unchanged, //TODO: encapsulate this field for consumer
        public children?: TreeNode[],
        public expanded = true) {
    }
}

export class CheckTreeNode extends TreeNode {
    constructor(public id: string,
        public text: string,
        public state: NodeState = NodeState.unchanged, //TODO: encapsulate this field for consumer
        public children?: TreeNode[],
        public expanded: boolean = true,
        public checked: boolean = false) {
        super(id, text, state, children, expanded);
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

