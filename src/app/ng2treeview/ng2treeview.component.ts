import { CheckTreeNodeComponent } from './check-tree-node/check-tree-node.component';
import { TreeNode, TreeViewMode } from './treenode/tree-node';
import { TreeNodeComponent } from './treenode/treenode.component'
import { TreeViewComponent } from './tree-view-component'
import { Component, Input, ContentChildren, QueryList, ViewChildren, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'ng2treeview',
  styleUrls: ['./ng2treeview.component.css'],
  template: `<ul>
               <li *ngIf="config.allowAdding"><a href="#" style="font-size: x-small;" (click)="add()">add</a></li>               
               <tree-node *ngFor="let child of nodes" [node]="child" [parentComponent]="this"
                         (onCreated)="onCreatedHandler($event)" 
                         (onRemoved)="onRemovedHandler($event)"
                         (onClick)="onClickHandler($event)"
                         [config]="config"></tree-node>
            </ul>`
})
export class Ng2TreeViewComponent extends TreeViewComponent {
  @Input() nodes: TreeNode[]

  @Input() set allowAdding(value: boolean) {
    this.config.allowAdding = value;
    console.log('Ng2TreeViewComponent.allowAdding: ', value)
  }

  @Input() set allowRemoving(value: boolean) {
    this.config.allowRemoving = value;
    console.log('Ng2TreeViewComponent.allowRemoving: ', value)
  }

  @Input() set escalation(value: boolean) {
    this.config.escalation = value;
    console.log('Ng2TreeViewComponent.escalation: ', value)
  }

  @Input() set mode(value: TreeViewMode) {
    //TODO: validate the input value since TS compiler doesn't do that when it comes from markup
    this.config.mode = value;
    console.log('Ng2TreeViewComponent.escalation: ', value)
  }

  get children() {
    console.log('Ng2TreeViewComponent.children')
    return this.nodes;
  }

  get parent() {
    console.log('TreeNodeComponent.parent')
    return this;
  }

  toggle(escalation: boolean) {

  }

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
