import { TreeNode } from './treenode/tree-node';
import { TreeNodeComponent } from './treenode/treenode.component'
import { BaseTreeViewComponent } from './base-tree-view-component'
import { Component, Input, ContentChildren, QueryList, ViewChildren, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'ng2treeview',
  templateUrl: './ng2treeview.component.html',
  styleUrls: ['./ng2treeview.component.css'],
})
export class Ng2TreeViewComponent extends BaseTreeViewComponent {
  @Input() nodes: TreeNode[]

  /* Just playing around with getting child components. It might be helpful in nearest future but I don't know for what now :) */
  // @ContentChildren(TreeNodeComponent) contentChildren: QueryList<TreeNodeComponent>;
  // @ViewChildren(TreeNodeComponent) viewChildren: QueryList<TreeNodeComponent>;

  // ngAfterContentInit() {
  //   console.log('ngAfterContentInit. contentChildren: ', this.contentChildren.toArray())
  // }

  // ngAfterViewInit() {
  //   console.log('ngAfterViewInit. contentChildren: ', this.viewChildren.toArray())
  //   // this.viewChildren.forEach(child => child.onCreated = this.onCreateHandler)

  // }
}
