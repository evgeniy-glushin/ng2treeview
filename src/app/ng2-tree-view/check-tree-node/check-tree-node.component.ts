import { CheckTreeNode, ITreeNode, TreeViewConfig, NodeState } from './../tree-node';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { TreeNodeComponent } from './../tree-node-component';

@Component({
  selector: 'check-tree-node',
  templateUrl: './check-tree-node.component.html',
  styleUrls: ['./check-tree-node.component.css']
})
export class CheckTreeNodeComponent extends TreeNodeComponent<CheckTreeNode>{
  protected save(node: CheckTreeNode, text: string, keyCode = this.ENTER_KEY_CODE) {
    if (text && keyCode === this.ENTER_KEY_CODE) {
      super.save(node, text, keyCode);
      node.checked = true;
      this.check(node);
    }
  }

  private check(node: CheckTreeNode) {
    console.log('CheckTreeNodeComponent.check. node: ', node);
    broadcastChildren(node.children);
    this.onChecked.emit(node);

    function broadcastChildren(children?: CheckTreeNode[]) {
      console.log('CheckTreeNodeComponent.escalateChildren: ', children);
      if (children)
        children.forEach(n => {
          n.checked = node.checked;
          broadcastChildren(n.children);
        });
    }
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


  @Output() onChecked = new EventEmitter<CheckTreeNode>();
  protected onCheckedHandler(node: CheckTreeNode) {
    console.log('CheckTreeNodeComponent.onCheckedHandler. before emit ', this.node);

    if (this.children.length)
      this.node.checked = this.children.every(n => n.checked);

    this.onChecked.emit(node);
    console.log('CheckTreeNodeComponent.onCheckedHandler: after emit', this.node);
  }


  get children() {
    if (!this.node.children)
      this.node.children = [];
    console.log('TreeNodeComponent.children', this.node.children);
    return this.node.children;
  }
}
