import { Component } from '@angular/core';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EditorPageComponent],
  template: `<app-editor-page></app-editor-page>`
})
export class AppComponent {
  title = 'classified-ad-generator';
}
