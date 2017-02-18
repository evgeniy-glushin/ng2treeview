import { TreeNode } from './tree-node';
export interface TreeNode {
    id: string,
    text: string,
    children?: TreeNode[]
}
