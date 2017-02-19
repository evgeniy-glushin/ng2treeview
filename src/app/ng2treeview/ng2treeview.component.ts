import { TreeNode } from './treenode/tree-node';
import { TreeNodeComponent } from './treenode/treenode.component'
import { Component, OnInit, SkipSelf, Host, Optional, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'ng2treeview',
  templateUrl: './ng2treeview.component.html',
  styleUrls: ['./ng2treeview.component.css'],
})
export class Ng2TreeViewComponent implements AfterViewInit {
  @Input() nodes: TreeNode[]

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) { }
    
  ngAfterViewInit() {
    // let createComponent = (n: TreeNode) => {
    //   const factory = this.componentFactoryResolver.resolveComponentFactory(TreeNodeComponent)
    //   const ref = this.viewContainerRef.createComponent(factory)

    //   ref.instance.node = n

    //   ref.changeDetectorRef.detectChanges()
    // }

    // this.nodes.forEach(createComponent)
  }
}
