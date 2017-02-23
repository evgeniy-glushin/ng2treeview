import { TreeNode, NodeState } from './tree-node';
import { TreeViewComponent } from './../tree-view-component'
import { Component, OnInit, Input, SkipSelf, Host, Optional, Output, EventEmitter } from '@angular/core';
// TODO: remove unused imports

@Component({
  selector: 'treenode',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.css']
})
export class TreeNodeComponent extends TreeViewComponent {
  @Input() private node: TreeNode
  @Input() parentComponent: TreeViewComponent

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

  private get hasChildren() {
    let children = this.node.children;
    return (children != undefined && children.length > 0);
  }

  private get isCreating() {
    return this.node.state == NodeState.creating;
  }
}
