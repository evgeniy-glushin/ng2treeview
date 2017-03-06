import { TextTreeNode, CheckTreeNode, NodeState } from './ng2-tree-view/tree-node';
import { Component } from '@angular/core';
import { Ng2TreeViewComponent } from './ng2-tree-view/ng2-tree-view.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app works!';

  private checkNodes: CheckTreeNode[] =
  [
    new CheckTreeNode('1', 'node1', [], false, false),
    new CheckTreeNode('2', 'node2', [
      new CheckTreeNode('2.1', 'node21', [], true, true),
      new CheckTreeNode('2.2', 'node22', [
        new CheckTreeNode('2.2.1', 'node221', [], false, true),
      ], true, true)
    ], true, true),
    new CheckTreeNode('3', 'node3', [], false, true),
    new CheckTreeNode('4', 'node4', [
      new CheckTreeNode('41', 'node41', [
        new CheckTreeNode('411', 'node411', [
          new CheckTreeNode('4111', 'node4111', [], false, true),
        ], true, true),
      ], true, true),
    ], true, true)
  ]

  createTree() {
    console.log('createTree')

    let size = 300;
    let newNodes = [new TextTreeNode('-1', 'node-1')];
    for (let i = 0; i < size; i++) {
      let node = new TextTreeNode(Math.random().toString(), 'node' + Math.random())
      newNodes.push(node)

      for (let j = 0; j < size; j++) {
        let nestedNode = new TextTreeNode(`${Math.random()}`, `node${Math.random()}`)
        node.children = [nestedNode]
        node = nestedNode;
      }
    }

    this.nodes = newNodes;
  }

  private nodes: TextTreeNode[] =
  [
    new TextTreeNode('1', 'node1'),
    new TextTreeNode('2', 'node2', [new TextTreeNode('3', 'node3')]),
    new TextTreeNode('4', 'node4', [new TextTreeNode('5', 'node5', [new TextTreeNode('6', 'node6')])])
  ];

  nodesHistory: any[] = []
  private onNodeCreated(newNode: TextTreeNode) {
    console.log('AppComponent.onNodeCreated: ', newNode)
    this.nodesHistory.push({ name: newNode.text, event: 'created' })
  }

  private onNodeRemoved(node: TextTreeNode) {
    // node.parent
    console.log('AppComponent.onNodeRemoved: ', node)
    this.nodesHistory.push({ name: node.text, event: 'removed' })
  }

  private onNodeClicked(node: TextTreeNode) {
    console.log('AppComponent.onNodeClicked: ', node)
    this.nodesHistory.push({ name: node.text, event: 'clicked' })
  }

  private onNodeChecked(node: CheckTreeNode) {
    console.log('AppComponent.onNodeChecked: ', node)
    this.nodesHistory.push({ name: node.text, event: 'checked' })
  }
}
