import { TextTreeNode, NodeState } from './../tree-node';
import { TreeViewComponent } from './../tree-node-component';
import { Component, OnInit, Input, SkipSelf, Host, Optional, Output, EventEmitter } from '@angular/core';
// TODO: remove unused imports

@Component({
  selector: 'text-tree-node',
  templateUrl: './text-tree-node.component.html',
  styleUrls: ['./text-tree-node.component.css']
})
export class TextTreeNodeComponent extends TreeViewComponent<TextTreeNode> {
  @Input() parentComponent: TreeViewComponent<TextTreeNode>;

  get children() {
    if (!this.node.children)
      this.node.children = [];
    console.log('TreeNodeComponent.children', this.node.children);
    return this.node.children;
  }

  get parent() {
    console.log('TreeNodeComponent.parent: ', this.parentComponent);
    return this.parentComponent;
  }
}