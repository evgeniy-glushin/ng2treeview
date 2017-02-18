import { Component, OnInit, SkipSelf, Host, Optional } from '@angular/core';

@Component({
  selector: 'ng2treeview',
  templateUrl: './ng2treeview.component.html',
  styleUrls: ['./ng2treeview.component.css'],
})
export class Ng2TreeViewComponent implements OnInit {

  // @SkipSelf() @Host() @Optional() parent: Ng2TreeViewComponent
  constructor() { }

  ngOnInit() {
  }

}
