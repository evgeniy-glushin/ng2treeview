import { ITreeNodeBase, ITreeNode, TreeViewMode, TextTreeNode, CheckTreeNode, Validator, Processor } from './tree-node';

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

export function check(node: CheckTreeNode) {
    broadcastChildren(node.children);
    return node;

    function broadcastChildren(children?: CheckTreeNode[]) {
        console.log('CheckTreeNodeComponent.escalateChildren: ', children);
        if (children)
            children.forEach(n => {
                n.checked = node.checked;
                broadcastChildren(n.children);
            });
    }
}


/**
* Goes through the nodes and applies validators for each node.
* @returns the validation result.
*/
export function depthFirstTraversal(nodes: ITreeNode<ITreeNodeBase>[], validators: Validator[], processors: Processor[]): [boolean, string] {
    let stack = [...nodes];

    while (stack.length) {
        let node = stack.pop() as TextTreeNode; //condition in while loop guarantees that it can't be undefined

        for (let validator of validators) {
            let [success, errorMsg] = validator(node);
            if (!success)
                return [success, errorMsg];
        }

        processors.forEach(p => p(node));

        if (node.children)
            stack.push(...node.children);
    }

    return [true, ''];
}

export function emptyValidator({ id, text }: ITreeNodeBase): [boolean, string] {
    if (id && text)
        return [true, ''];
    else
        return [false, `Invalid node found. Empty value. Id: ${id}; Text: ${text}`];
}

export function isNodeExpandedValidator(node: ITreeNode<ITreeNodeBase>): [boolean, string] {
    return [!hasChildren(node) || node.expanded, ''];
}

export function buildUniqueIdValidator(): Validator {
    let uniqeIds = new Set<string>();
    return ({ id, text }: ITreeNodeBase) => {
        if (uniqeIds.has(id))
            return [false, `Invalid node found. Duplicate Id. Id: ${id}; Text: ${text}`];
        else {
            uniqeIds.add(id);
            return [true, ''];
        }
    };
}

export function setParent(node: ITreeNode<ITreeNodeBase>) {
    if (node.children)
        node.children.forEach(child => child.parent = node);
};




