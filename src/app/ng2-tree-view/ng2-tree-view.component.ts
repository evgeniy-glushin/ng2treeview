import { CheckTreeNodeComponent } from './check-tree-node/check-tree-node.component';
import { TextTreeNode, TreeViewMode, CheckTreeNode, AddNodeCallback, NodeState, ITreeNode, ITreeNodeBase } from './tree-node';
import { TreeViewComponent } from './tree-node-component';
import { Component, Input, Output, EventEmitter } from '@angular/core';

type Validator = (node: ITreeNodeBase) => [boolean, string];
type Processor = (node: ITreeNodeBase) => void;

@Component({
  selector: 'ng2treeview',
  styleUrls: ['./ng2-tree-view.component.css'],
  template: `
    <ul [ngSwitch]="config.mode">
      <li class="list-item" *ngIf="config.allowAdd">
        <button class="btn" (click)="add()">add</button>
      </li>
      <div *ngSwitchCase="'simple'">
        <text-tree-node *ngFor="let child of nodes" [node]="child" [parentComponent]="this"
                   (onCreated)="onCreatedHandler($event)"
                   (onCreating)="onCreatingHandler($event)"
                   (onRemoved)="onRemovedHandler($event)"
                   (onClick)="onClickHandler($event)"
                   [config]="config"></text-tree-node>
      </div>
      <div *ngSwitchCase="'check'">
        <check-tree-node *ngFor="let child of nodes" [node]="child" [parentComponent]="this"
                         (onCreated)="onCreatedHandler($event)"
                         (onCreating)="onCreatingHandler($event)"
                         (onRemoved)="onRemovedHandler($event)"
                         (onClick)="onClickHandler($event)"
                         (onChecked)="onCheckHandler($event)"
                         [config]="config"></check-tree-node>
      </div>
    </ul>
  `
})
export class Ng2TreeViewComponent extends TreeViewComponent<ITreeNodeBase> {
  private _nodes: ITreeNode<ITreeNodeBase>[];
  @Input() set nodes(value: ITreeNode<ITreeNodeBase>[]) {
    console.log('Ng2TreeViewComponent.setNodes: ', value)

    let emptyValidator: Validator = ({id, text}: ITreeNodeBase) => {
      if (id && text)
        return [true, ''];
      else
        return [false, `Invalid node found. Empty value. Id: ${id}; Text: ${text}`];
    }

    let uniqeIds = new Set<string>();
    let uniqueIdValidator: Validator = ({id, text}: ITreeNodeBase) => {
      if (uniqeIds.has(id))
        return [false, `Invalid node found. Duplicate Id. Id: ${id}; Text: ${text}`];
      else {
        uniqeIds.add(id);
        return [true, ''];
      }
    }

    let setParent: Processor = (node: ITreeNode<ITreeNodeBase>) => {
      if (node.children)
        node.children.forEach(child => child.parent = node);
    }

    let inputClone = value.map(x => x.clone());

    let [success, errorMsg] = this.depthFirstTraversal(inputClone, [emptyValidator, uniqueIdValidator], [setParent]);

    console.log('after depthFirstTraversal ', inputClone)

    if (success)
      this._nodes = inputClone;
    else
      console.error(errorMsg);
  }

  /**
   * Goes through the nodes and applies validators for each node.
   * @returns the validation result.
   */
  private depthFirstTraversal(nodes: ITreeNode<ITreeNodeBase>[], validators: Validator[], processors: Processor[]) {
    let stack = [...nodes];

    while (stack.length) {
      let node = stack.pop() as TextTreeNode; //condition in while loop guarantees that it can't be undefined 

      for (let validator of validators) {
        let [success, errorMsg] = validator(node);
        if (!success)
          return [success, errorMsg]
      }

      processors.forEach(p => p(node));

      if (node.children)
        stack.push(...node.children);
    }

    return [true, ''];
  }

  get nodes() {
    return this._nodes;
  }

  @Input() set allowAdd(value: boolean) {
    this.config.allowAdd = value;
    console.log('Ng2TreeViewComponent.allowAdd: ', value);
  }

  @Input() set allowRemove(value: boolean) {
    this.config.allowRemove = value;
    console.log('Ng2TreeViewComponent.allowRemove: ', value);
  }

  @Input() set escalation(value: boolean) {
    this.config.escalation = value;
    console.log('Ng2TreeViewComponent.escalation: ', value);
  }

  @Input() set mode(value: TreeViewMode) {
    let supportedModes: TreeViewMode[] = ['simple', 'check'];
    if (supportedModes.indexOf(value) === -1)
      console.error(`Unknown treeview mode: ${value}. Please try to use one of existing modes: ${supportedModes.join(' | ')}`);

    this.config.mode = value;
    console.log('Ng2TreeViewComponent.escalation: ', value);
  }

  get children() {
    console.log('Ng2TreeViewComponent.children');
    return this.nodes;
  }

  get parent() {
    console.log('Ng2TreeViewComponent.parent');
    return this;
  }

  removeChild(node: ITreeNode<ITreeNodeBase>) {
    console.log(`Ng2TreeViewComponent. removeChild.`);
    if (this.state === NodeState.creating)
      this.state = NodeState.unchanged;
    super.removeChild(node);;
  }

  protected add() {
    console.log(`Ng2TreeViewComponent. add.`);

    if (this.state !== NodeState.creating) {
      //TODO: figure default values out
      let newNode = new TextTreeNode('', '');
      this.children.push(newNode);
      this.state = NodeState.creating;
    }
  }

  @Output() onChecked = new EventEmitter<CheckTreeNode>();
  protected onCheckHandler(node: CheckTreeNode) {
    console.log('Ng2TreeViewComponent.onCheckHandler: ', node);
    this.onChecked.emit(node);
  }

  protected onCreatedHandler(newNode: ITreeNode<ITreeNodeBase>) {
    console.log('Ng2TreeViewComponent.onCreatedHandler: ', newNode);

    this.state = NodeState.unchanged;

    super.onCreatedHandler(newNode);
  }

  protected onRemovedHandler(node: ITreeNode<ITreeNodeBase>) {
    console.log('Ng2TreeViewComponent.onRemovedHandler: ', node);

    if (this.state === NodeState.creating)
      this.state = NodeState.unchanged;

    super.onRemovedHandler(node);
  }

  protected onCreatingHandler(add: AddNodeCallback) {
    console.log('Ng2TreeViewComponent.onCreatingHandler.', add);
    // make sure that we can't create two and more nodes simultaneously.
    if (this.state !== NodeState.creating) {
      this.state = NodeState.creating;
      add();
    }
  }
}
