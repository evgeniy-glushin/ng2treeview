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
    let createComponent = (n: TreeNode) => {
      const factory = this.componentFactoryResolver.resolveComponentFactory(TreeNodeComponent)
      const ref = this.viewContainerRef.createComponent(factory)

      ref.instance.node = n

      ref.changeDetectorRef.detectChanges()
    }

    if (this.node.children) {
      this.node.children.forEach(createComponent)
    }
  }

}
