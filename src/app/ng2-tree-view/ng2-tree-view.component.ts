import { CheckTreeNodeComponent } from './check-tree-node/check-tree-node.component';
import { TextTreeNode, TreeViewMode, CheckTreeNode, AddNodeCallback, NodeState, ITreeNode, ITreeNodeBase, Validator, Processor } from './tree-node';
import { TreeNodeComponent } from './tree-node-component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as util from 'app/ng2-tree-view/utils';

@Component({
  selector: 'ng2treeview',
  styleUrls: ['./ng2-tree-view.component.css'],
  templateUrl: './ng2-tree-view.component.html'
})
export class Ng2TreeViewComponent extends TreeNodeComponent<ITreeNodeBase> {
  private _nodes: ITreeNode<ITreeNodeBase>[];
  @Input() set nodes(value: ITreeNode<ITreeNodeBase>[]) {
    console.log('Ng2TreeViewComponent.setNodes: ', value);

    let isExpanded = (nodes: ITreeNode<ITreeNodeBase>[]) =>
      nodes.every(n => n.expanded || !n.children || !n.children.length);

    this.expanded = isExpanded(value);

    console.log('Ng2TreeViewComponent.setNodes. expanded: ', this.expanded);

    let inputClone = value.map(x => x.clone());
    let [success, errorMsg] = util.depthFirstTraversal(inputClone, [util.emptyValidator, util.buildUniqueIdValidator()], [util.setParent]);

    console.log('after depthFirstTraversal ', inputClone);

    if (success)
      this._nodes = inputClone;
    else
      console.error(errorMsg);
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

  @Input() set color(value: string) {
    this.config.color = value;
  }


  @Output() onChecked = new EventEmitter<CheckTreeNode>();
  protected onCheckHandler(node: CheckTreeNode) {
    console.log('Ng2TreeViewComponent.onCheckHandler: ', node);
    this.onChecked.emit(node);
  }

  protected onRemoveHandler(node: ITreeNode<ITreeNodeBase>) {
    console.log(`onRemoveHandler. removeChild.`);
    if (this.state === NodeState.creating)
      this.state = NodeState.unchanged;

    util.removeChild(node, this.nodes);
    this.onRemoved.emit(node);
  }

  private expanded = false;
  protected toggleAll() {
    this.expanded = !this.expanded;

    this.nodes.forEach(n => {
      util.toggle(n, true, this.expanded);
    });
  }

  protected add() {
    console.log(`Ng2TreeViewComponent. add.`);

    if (this.state !== NodeState.creating) {
      let newNode = util.createTreeNode(this.config.mode);
      this.nodes.push(newNode);
      this.state = NodeState.creating;
    }
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
      console.log('Ng2TreeViewComponent.onCreatingHandler. creating');
      this.state = NodeState.creating;
      add();
    }
  }

  protected onToggleHandler() {
    // if all the nodes are expanded mark the treeview as 'Expanded' otherwise mark as 'Collapsed'.
    [this.expanded,] = util.depthFirstTraversal(this.nodes, [util.isNodeExpandedValidator], []);
    super.onToggleHandler();
  }

  private selectedComponent: {selected: boolean, node: ITreeNodeBase} | undefined;
  @Output() onSelected = new EventEmitter<ITreeNode<ITreeNodeBase>>();
  protected onSelectHandler(component: {selected: boolean, node: ITreeNodeBase}) {
    console.log('Ng2TreeViewComponent.onClickHandler: ', component);

    if (!this.selectedComponent) {
      component.selected = true;
      this.selectedComponent = component;
    } else if (this.selectedComponent === component) {
      component.selected = false;
      this.selectedComponent = undefined;
    } else {
      this.selectedComponent.selected = false;
      component.selected = true;
      this.selectedComponent = component;
    }

    this.onSelected.emit(component.node);
  }

  get nodes() {
    return this._nodes;
  }
}
