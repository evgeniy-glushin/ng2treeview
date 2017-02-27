import { TreeNode, CheckTreeNode, NodeState } from './ng2treeview/treenode/tree-node';
import { Component } from '@angular/core';
import { Ng2TreeViewComponent } from './ng2treeview/ng2treeview.component'

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
          new CheckTreeNode('411', 'node411', [], false, true),
        ], true, true),
      ], true, true),
    ], true, true)
  ]


  //TODO: make this strongly typed
  private nodes =
  [
    { id: '1', text: 'node1', expanded: true },
    { id: '2', text: 'node2', children: [{ id: '3', text: 'node3' }] },
    { id: '4', text: 'node4', expanded: false, children: [{ id: '5', text: 'node5', children: [{ id: '6', text: 'node6' }] }] }
  ]

  nodesHistory: any[] = []
  private onNodeCreated(newNode: TreeNode) {
    console.log('AppComponent.onNodeCreated: ', newNode)
    this.nodesHistory.push({ name: newNode.text, event: 'created' })
  }

  private onNodeRemoved(node: TreeNode) {
    console.log('AppComponent.onNodeRemoved: ', node)
    this.nodesHistory.push({ name: node.text, event: 'removed' })
  }

  private onNodeClicked(node: TreeNode) {
    console.log('AppComponent.onNodeClicked: ', node)
    this.nodesHistory.push({ name: node.text, event: 'clicked' })
  }

  private onNodeChecked(node: CheckTreeNode) {
    console.log('AppComponent.onNodeChecked: ', node)
    this.nodesHistory.push({ name: node.text, event: 'checked' })
  }
}
