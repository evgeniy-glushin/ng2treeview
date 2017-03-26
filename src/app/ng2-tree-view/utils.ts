import { ITreeNodeBase, ITreeNode, TreeViewMode, TextTreeNode, CheckTreeNode } from './tree-node';

export function removeChild(nodeToRemove: ITreeNodeBase, source?: ITreeNodeBase[]) {
    console.log(`removeChild. node: ${nodeToRemove.text}; children: `, source)
    if (source) {
        let idx = source.indexOf(nodeToRemove);
        console.log('TreeViewComponent.removeChild. target index: ', idx);
        source.splice(idx, 1);
        return source;
    }
}

export function addChild(target: ITreeNode<ITreeNodeBase>, newNode: ITreeNodeBase) {
    if (!hasChildren(target))
        target.children = [];

    //the ts compiler doesn't get that there is no way children is undefined
    //the statement above prevents that.
    (target.children as ITreeNode<ITreeNodeBase>[]).push(newNode);
    return target;
}

export function toggle(node: ITreeNode<ITreeNodeBase>, escalation = false, value?: boolean) {
    //TODO: make sure that value? param is realy needed
    node.expanded = value !== undefined ?
        value : !node.expanded;

    console.log('TreeViewComponent.toggle: ', node);
    if (escalation) {
        escalateToggle(node, node.children);
    }

    console.log('TreeViewComponent.toggle. Before ontoggle emit');

    function escalateToggle(parentNode: ITreeNode<ITreeNodeBase>, children?: ITreeNode<ITreeNodeBase>[]) {
        if (children) {
            let stack = [...children];
            while (stack.length) {
                let node = stack.pop() as ITreeNode<ITreeNodeBase>; //condition in while loop guarantees that it can't be undefined
                node.expanded = parentNode.expanded;

                if (node.children)
                    stack.push(...node.children);
            }
        }
    }
}

export function hasChildren(node: ITreeNode<ITreeNodeBase>) {
    return notEmpty(node.children);
}

function notEmpty(source?: ITreeNode<ITreeNodeBase>[]) {
    return (source !== undefined && source.length);
}

export function createTreeNode(mode: TreeViewMode, parent?: ITreeNodeBase) {
    let newId = Date.now().toString();
    let newNode: ITreeNodeBase;

    switch (mode) {
        case 'simple':
            newNode = new TextTreeNode(newId, '');
            break;
        case 'check':
            newNode = new CheckTreeNode(newId, '');
            break;
        default:
            throw new Error(`Unknown mode: ${mode};`);
    }

    newNode.parent = parent;
    return newNode;
}

export function allChecked(nodes: CheckTreeNode[]) {
    return nodes.every(n => n.checked);
}