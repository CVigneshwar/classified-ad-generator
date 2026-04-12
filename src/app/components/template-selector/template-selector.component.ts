import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateType } from '../../models/ad.model';

@Component({
  selector: 'app-template-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="template-selector">
      <label>Template Type</label>
      <div class="options">
        @for (type of templateTypes; track type) {
          <button 
            type="button"
            class="template-btn"
            [class.active]="selectedTemplate === type"
            (click)="selectTemplate(type)">
            {{ type | titlecase }}
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .template-selector {
      margin-bottom: 2rem;
      
      label {
        display: block;
        font-weight: 600;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.75rem;
        color: var(--text-muted);
      }

      .options {
        display: flex;
        gap: 0.75rem;
        background: #f1f5f9;
        padding: 0.4rem;
        border-radius: var(--radius-md);
      }

      .template-btn {
        flex: 1;
        padding: 0.6rem 1rem;
        border: none;
        background: transparent;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.875rem;
        color: var(--text-muted);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          color: var(--text-main);
        }

        &.active {
          background: white;
          color: var(--primary);
          box-shadow: var(--shadow-sm);
        }
      }
    }
  `]
})
export class TemplateSelectorComponent {
  @Input() selectedTemplate: TemplateType = '5x1';
  @Output() templateChange = new EventEmitter<TemplateType>();

  templateTypes: TemplateType[] = ['5x1', '10x1'];

  selectTemplate(type: TemplateType) {
    this.templateChange.emit(type);
  }
}
