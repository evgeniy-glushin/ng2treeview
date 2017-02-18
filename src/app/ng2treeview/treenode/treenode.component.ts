import { TreeNode } from './tree-node';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'treenode',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.css']
})
export class TreeNodeComponent implements OnInit {
  @Input() node: TreeNode

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    console.log('node: ', this.node)
  }

  private add() {
    if (!this.node.children)
      this.node.children = []

    //adds new random node
    let newNode: TreeNode = { 
      id: "newid", 
      text: "newnode", 
      add: true, 
      remove: false,
      expanded: true
    };
    this.node.children.push(newNode);
  }

  private toggle() {
    this.node.expanded = !this.node.expanded
  }
}
