import { TreeNode, NodeState } from './tree-node';
import { BaseTreeViewComponent } from './../base-tree-view-component'
import { Component, OnInit, Input, SkipSelf, Host, Optional, Output, EventEmitter } from '@angular/core';
// TODO: remove unused imports

@Component({
  selector: 'treenode',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.css']
})
export class TreeNodeComponent extends BaseTreeViewComponent {
  @Input() private node: TreeNode

  constructor(@SkipSelf() @Host() @Optional() private parent: TreeNodeComponent) {
    super();
  }

  private remove() {
    this.parent.removeChild(this.node);
  }

  removeChild(node: TreeNode) {
    if (this.node.children) {
      let idx = this.node.children.indexOf(node);
      console.log('remove. target index: ', idx)
      this.node.children.splice(idx, 1);
      this.onRemoved.emit(node);
    }
  }

  private add() {
    if (!this.node.children)
      this.node.children = [];

    let children = this.node.children
    //TODO: figure default values out
    let newNode = new TreeNode("", "", false, true, true, NodeState.creating)
    children.push(newNode);

    if (!this.node.expanded)
      this.node.expanded = true;
  }

  private readonly ENTER_KEY_CODE = 13;
  private save(text: string, keyCode = this.ENTER_KEY_CODE) {
    if (text && keyCode == this.ENTER_KEY_CODE) {
      this.node.text = text;
      this.node.state = NodeState.added;
      this.onCreated.emit(this.node);
    }
    console.log(`save. text: ${text}; code: ${keyCode};`);
  }

  private toggle() {
    this.node.expanded = !this.node.expanded;
  }

  private get hasChildren() {
    let children = this.node.children;
    return (children != undefined && children.length > 0);
  }

  private get isCreating() {
    return this.node.state == NodeState.creating;
  }
}
