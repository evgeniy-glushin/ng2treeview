import { TreeNode } from './treenode/tree-node';
import { TreeNodeComponent } from './treenode/treenode.component'
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng2treeview',
  templateUrl: './ng2treeview.component.html',
  styleUrls: ['./ng2treeview.component.css'],
})
export class Ng2TreeViewComponent {
  @Input() nodes: TreeNode[]
}
