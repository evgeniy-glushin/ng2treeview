export class TreeNode {
    constructor(public id: string,
        public text: string,
        public state: NodeState = NodeState.unchanged,
        public children?: TreeNode[],
        public expanded: boolean = true) {
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
        public escalation: boolean) {

    }
}

