import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Ng2TreeViewComponent } from './ng2treeview/ng2treeview.component';

@NgModule({
  declarations: [
    AppComponent,
    Ng2TreeViewComponent
  ],
  entryComponents: [
    Ng2TreeViewComponent
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
