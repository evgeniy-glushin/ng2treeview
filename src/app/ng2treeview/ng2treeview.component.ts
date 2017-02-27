import { CheckTreeNodeComponent } from './check-tree-node/check-tree-node.component';
import { TreeNode, TreeViewMode, CheckTreeNode } from './treenode/tree-node';
import { TreeNodeComponent } from './treenode/treenode.component'
import { TreeViewComponent } from './tree-view-component'
import { Component, Input, Output, EventEmitter } from '@angular/core';

type Validator = (n: TreeNode) => [boolean, string];

@Component({
  selector: 'ng2treeview',
  styleUrls: ['./ng2treeview.component.css'],
  template: `
    <ul [ngSwitch]="config.mode">
      <li class="list-item" *ngIf="config.allowAdding">
        <button class="btn" (click)="add()">add</button>
      </li>
      <div *ngSwitchCase="'simple'">
        <tree-node *ngFor="let child of nodes" [node]="child" [parentComponent]="this"
                   (onCreated)="onCreatedHandler($event)"
                   (onRemoved)="onRemovedHandler($event)"
                   (onClick)="onClickHandler($event)"
                   [config]="config"></tree-node>
      </div>
      <div *ngSwitchCase="'check'">
        <check-tree-node *ngFor="let child of nodes" [node]="child" [parentComponent]="this"
                         (onCreated)="onCreatedHandler($event)"
                         (onClick)="onClickHandler($event)"
                         (onChecked)="onCheckHandler($event)"
                         [config]="config"></check-tree-node>
      </div>
    </ul>
  `
})
export class Ng2TreeViewComponent extends TreeViewComponent {
  private _nodes: TreeNode[];
  @Input() set nodes(value: TreeNode[]) {
    console.log('Ng2TreeViewComponent.setNodes: ', value)

    let emptyValidator: Validator = ({id, text}: TreeNode) => {
      if (id && text)
        return [true, ''];
      else
        return [false, `Invalid node found. Empty value. Id: ${id}; Text: ${text}`];
    }

    let uniqeIds = new Set<string>();
    let uniqueIdValidator: Validator = ({id, text}: TreeNode) => {
      if (uniqeIds.has(id))
        return [false, `Invalid node found. Duplicate Id. Id: ${id}; Text: ${text}`];
      else {
        uniqeIds.add(id)
        return [true, ''];
      }
    }

    let [success, errorMsg] = this.validate([emptyValidator, uniqueIdValidator], value);

    if (success)
      this._nodes = value;
    else
      console.error(errorMsg)
  }

  private validate(validators: Validator[], nodes?: TreeNode[]) {
    if (nodes)
      for (let node of nodes) {
        for (let validator of validators) {
          let [success, errorMsg] = validator(node);
          if (!success)
            return [success, errorMsg]
        }

        let [success, errorMsg] = this.validate(validators, node.children)
        if (!success)
          return [success, errorMsg];
      }

    return [true, ''];
  }

  get nodes() {
    return this._nodes;
  }

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
    let supportedModes: TreeViewMode[] = ['simple', 'check'];
    if (supportedModes.indexOf(value) === -1)
      console.error(`Unknown treeview mode: ${value}. Please try to use one of existing modes: ${supportedModes.join(' | ')}`);

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

  @Output() onChecked = new EventEmitter<CheckTreeNode>()

  protected onCheckHandler(node: CheckTreeNode) {
    console.log('Ng2TreeViewComponent.onCheckHandler: ', node)
    this.onChecked.emit(node);
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
