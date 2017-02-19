import { TreeNode } from './tree-node';
import { NodeState } from './node-state.enum';
import { Component, OnInit, Input, SkipSelf, Host, Optional } from '@angular/core';

@Component({
  selector: 'treenode',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.css']
})
export class TreeNodeComponent implements OnInit {
  @Input() private node: TreeNode

  constructor( @SkipSelf() @Host() @Optional() private parent: TreeNodeComponent) {
    console.log('parent node: ', parent)
  }

  ngOnInit() {
    console.log('node: ', this.node)
  }

  //TODO: refactor this
  private remove() {
    this.parent.removeChild(this.node);
  }

  removeChild(node: TreeNode) {
    if (node.state == NodeState.creating) {
      if (this.node.children) {
        let idx = this.node.children.indexOf(node);
        console.log('remove. target index: ', idx)
        this.node.children.splice(idx, 1);
      }
    } else {
      node.state = NodeState.removed;
    }
  }

  private add() {
    if (!this.node.children)
      this.node.children = [];

    let children = this.node.children
    let newNode = new TreeNode("id", "", false, true, true, NodeState.creating)
    children.push(newNode);

    if (!this.node.expanded)
      this.node.expanded = true;
  }

  private readonly ENTER_KEY_CODE = 13;
  private save(text: string, keyCode: number = this.ENTER_KEY_CODE, e) {
    if (text && keyCode == this.ENTER_KEY_CODE) {
      this.node.text = text;
      this.node.state = NodeState.added;
    }
    console.log(`save. text: ${text}; code: ${keyCode}; e: `, e);
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

  private get isRemoved() {
    return this.node.state == NodeState.removed;
  }

  private get canRemove() {
    return this.node.remove &&
      (this.node.state == NodeState.unchanged ||
        this.node.state == NodeState.added);
  }

  // private cancel() {
  //   this.parent.remove(this.node)
  // }
}
