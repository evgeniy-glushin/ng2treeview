import { CheckTreeNode } from './../treenode/tree-node';
import { TreeNodeComponent } from './../treenode/treenode.component';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'check-tree-node',
  templateUrl: './check-tree-node.component.html',
  styleUrls: ['./check-tree-node.component.css']
})
export class CheckTreeNodeComponent extends TreeNodeComponent {

  @Output() onChecked = new EventEmitter<CheckTreeNode>()
  protected onCheckedHandler(node: CheckTreeNode) {
    console.log('CheckTreeNodeComponent.onCheckedHandler. before emit ', this.node)

    //emit to parents 
    let children = this.node.children;
    if (children && children.length) {
      let allChecked = children.every(n => (n as CheckTreeNode).checked);
      (this.node as CheckTreeNode).checked = allChecked;
    }

    this.onChecked.emit(node);
    console.log('CheckTreeNodeComponent.onCheckedHandler: after emit', this.node)
  }

  check(node: CheckTreeNode) {
    console.log('CheckTreeNodeComponent.check. node: ', node)
    this.broadcastChildren(node.children);
    this.onChecked.emit(node);
  }

  private broadcastChildren(children?: CheckTreeNode[]) {
    console.log('CheckTreeNodeComponent.escalateChildren: ', children)
    if (children)
      children.forEach(n => {
        n.checked = (this.node as CheckTreeNode).checked
        this.broadcastChildren(n.children)
      })
  }
}
