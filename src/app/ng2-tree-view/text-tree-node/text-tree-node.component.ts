import { TextTreeNode, NodeState, TreeViewConfig } from './../tree-node';
import { TreeNodeComponent } from './../tree-node-component';
import { Component, OnInit, Input, SkipSelf, Host, Optional, Output, EventEmitter } from '@angular/core';
// TODO: remove unused imports

@Component({
  selector: 'text-tree-node',
  templateUrl: './text-tree-node.component.html',
  styleUrls: ['./text-tree-node.component.css']
})
export class TextTreeNodeComponent extends TreeNodeComponent<TextTreeNode> {

}
