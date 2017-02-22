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
    console.log('TreeNodeComponent.children')
    return this.node.children;
  }

  get parent() {
    console.log('TreeNodeComponent.parent: ', this.parentComponent)
    return this.parentComponent;
  }

  //TODO: move Add and Aave methods to TreeViewComponent 
  //since this logic needed in Ng2TreeViewComponent as well 
  private add() {
    if (!this.node.children)
      this.node.children = [];

    let children = this.node.children
    //TODO: figure default values out
    let newNode = new TreeNode("", "", false, NodeState.creating)
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
