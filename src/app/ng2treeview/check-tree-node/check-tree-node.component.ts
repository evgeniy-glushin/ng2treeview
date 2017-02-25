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
    console.log('CheckTreeNodeComponent.onCheckedHandler: ', this.node)
    this.onChecked.emit(node);
  }

  check(node: CheckTreeNode) {
    console.log('CheckTreeNodeComponent.check. node: ', node)
    this.onChecked.emit(node);
  }

}
