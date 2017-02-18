import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Ng2TreeViewComponent } from './ng2treeview/ng2treeview.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private compFactResolver: ComponentFactoryResolver,
    private viewCont: ViewContainerRef) { }

  private add() {
    const factory = this.compFactResolver.resolveComponentFactory(Ng2TreeViewComponent)
    const ref = this.viewCont.createComponent(factory)

    ref.changeDetectorRef.detectChanges()
  }
}
