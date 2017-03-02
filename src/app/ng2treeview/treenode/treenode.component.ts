import { TreeNode, NodeState } from './tree-node';
import { TreeViewComponent } from './../tree-view-component'
import { Component, OnInit, Input, SkipSelf, Host, Optional, Output, EventEmitter } from '@angular/core';
// TODO: remove unused imports

@Component({
  selector: 'tree-node',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.css']
})
export class TreeNodeComponent extends TreeViewComponent<TreeNode> {
  @Input() parentComponent: TreeViewComponent<TreeNode>
  
  get children() {
    if (!this.node.children)
      this.node.children = []
    console.log('TreeNodeComponent.children', this.node.children)
    return this.node.children;
  }

  get parent() {
    console.log('TreeNodeComponent.parent: ', this.parentComponent)
    return this.parentComponent;
  }
}
