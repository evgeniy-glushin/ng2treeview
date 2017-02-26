import { TreeNode, NodeState } from './tree-node';
import { TreeViewComponent } from './../tree-view-component'
import { Component, OnInit, Input, SkipSelf, Host, Optional, Output, EventEmitter } from '@angular/core';
// TODO: remove unused imports

@Component({
  selector: 'tree-node',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.css']
})
export class TreeNodeComponent extends TreeViewComponent {
  @Input() protected node: TreeNode
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

  get folderUrl() {
    let postfix = '';

    if (this.hasChildren && this.node.expanded) {
      postfix = '-minus';
    } else if (this.hasChildren && !this.node.expanded) {
      postfix = '-plus';
    }

    return `../../assets/icons/folder${postfix}.svg`;
  }

  toggle(escalation: boolean = false, value?: boolean) {
    console.log(`TreeNodeComponent.toggle. 
                  escalation: ${escalation}; 
                  node.expanded: ${this.node.expanded}; 
                  value: ${value};
                  children: `, this.node.children)

    this.node.expanded = value != undefined ?
      value : !this.node.expanded;

    if (escalation) {
      this.escalateToggle(this.node.children);
    }
  }

  private click(node: TreeNode) {
    this.onClick.emit(node);
  }

  private escalateToggle(children?: TreeNode[]) {
    console.log('TreeNodeComponent.escalateToggle: ', children)
    if (children)
      children.forEach(n => {
        n.expanded = this.node.expanded
        this.escalateToggle(n.children)
      })
  }

  private get hasChildren() {
    let children = this.node.children;
    return (children != undefined && children.length > 0);
  }

  private get isCreating() {
    return this.node.state == NodeState.creating;
  }
}
