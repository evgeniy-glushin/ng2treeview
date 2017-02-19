import { TreeNode } from './tree-node';
import { NodeState } from './node-state.enum';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'treenode',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.css']
})
export class TreeNodeComponent implements OnInit {
  @Input() private node: TreeNode

  // constructor(private componentFactoryResolver: ComponentFactoryResolver,
  //   private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    console.log('node: ', this.node)
  }

  private add() {
    if (!this.node.children)
      this.node.children = [];

    let children = this.node.children
    let newNode = new TreeNode("id", "", false, true, false, NodeState.creating)
    children.push(newNode);

    if (!this.node.expanded)
      this.node.expanded = true;
  }

  readonly ENTER_KEY_CODE = 13;
  private save(text: string, keyCode: number = this.ENTER_KEY_CODE) {
    if (text && keyCode == this.ENTER_KEY_CODE) {
      this.node.text = text;
      this.node.state = NodeState.added;
    }
    console.log(`text: ${text}; code: ${keyCode}`);
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

  private cancel() {

  }
}
