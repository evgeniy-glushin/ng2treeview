import { TreeNode } from './ng2treeview/treenode/tree-node';
import { Component } from '@angular/core';
import { Ng2TreeViewComponent } from './ng2treeview/ng2treeview.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app works!';

  private nodes =
  [
    { id: '1', text: 'node1', add: true, remove: false },
    { id: '2', text: 'node2', children: [{ id: '3', text: 'node3', remove: true }] },
    { id: '4', text: 'node4', children: [{ id: '5', text: 'node5', children: [{ id: '6', text: 'node6' }] }] }
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
}
