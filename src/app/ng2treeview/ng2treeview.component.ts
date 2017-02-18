import { TreeNode } from './treenode/tree-node';
import { TreeNodeComponent } from './treenode/treenode.component'
import { Component, OnInit, SkipSelf, Host, Optional, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'ng2treeview',
  templateUrl: './ng2treeview.component.html',
  styleUrls: ['./ng2treeview.component.css'],
})
export class Ng2TreeViewComponent implements OnInit {

  // @SkipSelf() @Host() @Optional() parent: Ng2TreeViewComponent
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) { }

  private nodes = 
  [
    {
      id: '1', text: 'node1',
      children: [{ id: '3', text: 'node3' }]
    },
    { id: '2', text: 'node2' }]
  ngOnInit() {
    let createComponent = (n: TreeNode) => {
      const factory = this.componentFactoryResolver.resolveComponentFactory(TreeNodeComponent)
      const ref = this.viewContainerRef.createComponent(factory)

      ref.instance.node = n

      ref.changeDetectorRef.detectChanges()  
    }

    this.nodes.forEach(createComponent)
  }


  //  constructor(private compFactResolver: ComponentFactoryResolver,
  //   private viewCont: ViewContainerRef) { }

  // private add() {
  //   const factory = this.compFactResolver.resolveComponentFactory(Ng2TreeViewComponent)
  //   const ref = this.viewCont.createComponent(factory)

  //   ref.changeDetectorRef.detectChanges()
  // }

}
