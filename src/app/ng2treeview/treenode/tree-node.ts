import { NodeState } from './node-state.enum';
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
