export class TreeNode {
    constructor(public id: string,
        public text: string,
        public expanded: boolean,
        public add: boolean,
        public remove: boolean,
        public state: NodeState = NodeState.unchanged,
        public children?: TreeNode[]) {
    }
}

export enum NodeState {
    unchanged,
    added,
    creating
}

