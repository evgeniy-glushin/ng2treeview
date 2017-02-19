import { NodeState } from './node-state.enum';
export class TreeNode {
    // id: string;
    // text: string;
    // add: boolean;
    // remove: boolean;
    // expanded: boolean;
    // state: NodeState = NodeState.unchanged;

    constructor(public id: string,
                public text:  string, 
                public expanded: boolean,
                public add: boolean,
                public remove: boolean,
                public state: NodeState = NodeState.unchanged,
                public children?: TreeNode[]) { 
    }
}
