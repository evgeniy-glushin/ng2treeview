import { CheckTreeNode, ITreeNode, TreeViewConfig, NodeState } from './../tree-node';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { TreeViewComponent } from './../tree-node-component';

@Component({
  selector: 'check-tree-node',
  templateUrl: './check-tree-node.component.html',
  styleUrls: ['./check-tree-node.component.css']
})
export class CheckTreeNodeComponent extends TreeViewComponent<CheckTreeNode>{

  @Input() parentComponent: TreeViewComponent<CheckTreeNode>;
  @Input() config: TreeViewConfig;

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

  protected save(node: CheckTreeNode, text: string, keyCode = this.ENTER_KEY_CODE) {
    if (text && keyCode === this.ENTER_KEY_CODE) {
      super.save(node, text, keyCode);
      node.checked = true;
    }
  }

  @Output() onChecked = new EventEmitter<CheckTreeNode>();
  protected onCheckedHandler(node: CheckTreeNode) {
    console.log('CheckTreeNodeComponent.onCheckedHandler. before emit ', this.node);

    if (this.children.length)
      this.node.checked = this.children.every(n => n.checked);

    this.onChecked.emit(node);
    console.log('CheckTreeNodeComponent.onCheckedHandler: after emit', this.node);
  }

  check(node: CheckTreeNode) {
    console.log('CheckTreeNodeComponent.check. node: ', node);
    this.broadcastChildren(node.children);
    this.onChecked.emit(node);
  }

  private broadcastChildren(children?: CheckTreeNode[]) {
    console.log('CheckTreeNodeComponent.escalateChildren: ', children);
    if (children)
      children.forEach(n => {
        n.checked = this.node.checked;
        this.broadcastChildren(n.children);
      });
  }

  protected get iconUrl() {
    let postfix = 'no-children-checked';

    if (this.node.checked) {
      postfix = 'all-checked';
    } else if (this.node.someChildrenChecked) {
      postfix = 'some-children-checked';
    }

    return `../../assets/icons/checkbox-${postfix}.svg`;
  }
}
