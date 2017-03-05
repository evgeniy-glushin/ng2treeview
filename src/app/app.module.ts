import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Ng2TreeViewComponent } from './ng2-tree-view/ng2-tree-view.component';
import { TextTreeNodeComponent } from './ng2-tree-view/text-tree-node/text-tree-node.component';
import { CheckTreeNodeComponent } from './ng2-tree-view/check-tree-node/check-tree-node.component';

@NgModule({
  declarations: [
    AppComponent,
    Ng2TreeViewComponent,
    TextTreeNodeComponent,
    CheckTreeNodeComponent
  ],
  entryComponents: [
    TextTreeNodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
