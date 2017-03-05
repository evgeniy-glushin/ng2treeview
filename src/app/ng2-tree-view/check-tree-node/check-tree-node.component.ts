import { CheckTreeNode, ITreeNode } from './../tree-node';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { TreeViewComponent } from './../tree-node-component'

@Component({
  selector: 'check-tree-node',
  templateUrl: './check-tree-node.component.html',
  styleUrls: ['./check-tree-node.component.css']
})
export class CheckTreeNodeComponent extends TreeViewComponent<CheckTreeNode> {

  @Input() parentComponent: TreeViewComponent<CheckTreeNode>

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


  @Output() onChecked = new EventEmitter<CheckTreeNode>()
  protected onCheckedHandler(node: CheckTreeNode) {
    console.log('CheckTreeNodeComponent.onCheckedHandler. before emit ', this.node)

    //emit to parents 
    let children = this.node.children;
    if (children && children.length) {
      let allChecked = children.every(n => n.checked);
      this.node.checked = allChecked;
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
        n.checked = this.node.checked
        this.broadcastChildren(n.children)
      })
  }
}
