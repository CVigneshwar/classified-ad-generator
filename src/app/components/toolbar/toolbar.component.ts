import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: `
    <header class="toolbar">
      <div class="logo">
        <h1>Classified Ad Generator</h1>
      </div>
    </header>
  `,
  styles: [`
    .toolbar {
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      height: 60px;
      background-color: var(--primary-bg, #1a1a1a);
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      
      .logo h1 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
        font-family: 'Inter', sans-serif;
        letter-spacing: 0.5px;
      }
    }
  `]
})
export class ToolbarComponent {}
