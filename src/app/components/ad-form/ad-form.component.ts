import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TemplateType } from '../../models/ad.model';
import { TemplateSelectorComponent } from '../template-selector/template-selector.component';

@Component({
  selector: 'app-ad-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TemplateSelectorComponent],
  template: `
    <div class="form-container" *ngIf="formGroup" (click)="closePickers()">
      <header>
        <h2>Design Your Ad</h2>
      </header>
      <form [formGroup]="formGroup">
        
        <app-template-selector 
          [selectedTemplate]="formGroup.get('template')?.value"
          (templateChange)="onTemplateChange($event)">
        </app-template-selector>

        <div class="form-row">
          <div class="form-group half" [class.has-error]="isInvalid('widthCm')">
            <label for="widthCm">Width (cm) <span class="req">*</span></label>
            <input id="widthCm" type="number" step="0.5" min="1" max="50" formControlName="widthCm" placeholder="4">
            <div class="field-meta" *ngIf="isInvalid('widthCm')">
              <span class="error-msg">Min 1, Max 50</span>
            </div>
          </div>
          <div class="form-group half" [class.has-error]="isInvalid('heightCm')">
            <label for="heightCm">Height (cm) <span class="req">*</span></label>
            <input id="heightCm" type="number" step="0.5" min="1" max="50" formControlName="heightCm" placeholder="10">
            <div class="field-meta" *ngIf="isInvalid('heightCm')">
              <span class="error-msg">Min 1, Max 50</span>
            </div>
          </div>
        </div>

        <div class="form-group" [class.has-error]="isInvalid('header')">
          <label for="header">Headline / Title <span class="req">*</span></label>
          <div class="input-with-color">
            <input id="header" type="text" formControlName="header" class="main-input" placeholder="e.g. VINTAGE BICYCLE FOR SALE">
            <div class="color-controls">
              <ng-container *ngTemplateOutlet="smartPicker; context: { control: 'headerColor', label: 'BG', pickerId: 'h_bg', colors: quickColors }"></ng-container>
              <ng-container *ngTemplateOutlet="smartPicker; context: { control: 'headerTextColor', label: 'Txt', pickerId: 'h_txt', colors: quickColors }"></ng-container>
            </div>
            <input type="number" formControlName="headerFontSize" class="inline-font-size" title="Header Font Size" min="1">
          </div>
          <div class="field-meta">
            <span class="error-msg" *ngIf="isInvalid('header')">Header is required and must be under 50 chars</span>
            <span class="char-count">{{ formGroup.get('header')?.value?.length || 0 }}/50</span>
          </div>
        </div>

        <div class="form-group">
          <label for="subheader">Subheading / Location</label>
          <div class="input-with-color">
            <input id="subheader" type="text" formControlName="subheader" class="main-input" placeholder="e.g. Excellent condition | Downtown">
            <div class="color-controls">
              <ng-container *ngTemplateOutlet="smartPicker; context: { control: 'subHeaderColor', label: 'BG', pickerId: 'sh_bg', colors: quickColors }"></ng-container>
              <ng-container *ngTemplateOutlet="smartPicker; context: { control: 'subHeaderTextColor', label: 'Txt', pickerId: 'sh_txt', colors: quickColors }"></ng-container>
            </div>
            <input type="number" formControlName="subHeaderFontSize" class="inline-font-size" title="Subheading Font Size" min="1">
          </div>
          <div class="field-meta">
            <span></span>
            <span class="char-count">{{ formGroup.get('subheader')?.value?.length || 0 }}/100</span>
          </div>
        </div>

        <div class="form-group">
          <label for="body">Main Description</label>
          <div class="input-with-color">
            <textarea id="body" formControlName="body" class="main-input" rows="5" placeholder="Describe your item or properties..."></textarea>
            <div class="color-controls">
              <ng-container *ngTemplateOutlet="smartPicker; context: { control: 'bodyColor', label: 'BG', pickerId: 'b_bg', colors: quickColors }"></ng-container>
              <ng-container *ngTemplateOutlet="smartPicker; context: { control: 'bodyTextColor', label: 'Txt', pickerId: 'b_txt', colors: quickColors }"></ng-container>
            </div>
            <input type="number" formControlName="bodyFontSize" class="inline-font-size" title="Body Font Size" min="1">
          </div>
          <div class="field-meta">
            <span></span>
            <span class="char-count">{{ formGroup.get('body')?.value?.length || 0 }}/500</span>
          </div>
        </div>

        <div class="form-group">
          <label for="footerNote">Footer Note (Small Print)</label>
          <div class="input-with-color">
            <input id="footerNote" type="text" formControlName="footerNote" class="main-input" placeholder="e.g. Available starting next month">
            <div class="color-controls">
              <ng-container *ngTemplateOutlet="smartPicker; context: { control: 'subFooterColor', label: 'BG', pickerId: 'sf_bg', colors: quickColors }"></ng-container>
              <ng-container *ngTemplateOutlet="smartPicker; context: { control: 'subFooterTextColor', label: 'Txt', pickerId: 'sf_txt', colors: quickColors }"></ng-container>
            </div>
            <input type="number" formControlName="subFooterFontSize" class="inline-font-size" title="Sub-Footer Font Size" min="1">
          </div>
        </div>

        <div class="form-group" [class.has-error]="isInvalid('contactNumber')">
          <label for="contactNumber">Contact Number <span class="req">*</span></label>
          <div class="input-with-color">
            <input id="contactNumber" type="text" formControlName="contactNumber" class="main-input" placeholder="e.g. 555-0199">
            <div class="color-controls">
              <ng-container *ngTemplateOutlet="smartPicker; context: { control: 'footerColor', label: 'BG', pickerId: 'f_bg', colors: quickColors }"></ng-container>
              <ng-container *ngTemplateOutlet="smartPicker; context: { control: 'footerTextColor', label: 'Txt', pickerId: 'f_txt', colors: quickColors }"></ng-container>
            </div>
            <input type="number" formControlName="footerFontSize" class="inline-font-size" title="Footer Font Size" min="1">
          </div>
          <div class="field-meta" *ngIf="isInvalid('contactNumber')">
            <span class="error-msg">Contact number is required</span>
          </div>
        </div>

        <div class="actions">
          <button type="button" class="btn-reset" (click)="resetClicked.emit()">Reset Form</button>
          <button type="button" class="btn-download" (click)="downloadClicked.emit()" [disabled]="formGroup.invalid">Download Poster</button>
        </div>
      </form>
    </div>

    <!-- Reusable Smart Picker Template -->
    <ng-template #smartPicker let-control="control" let-label="label" let-pickerId="pickerId" let-colors="colors">
      <div class="smart-picker-container">
        <div 
          class="color-trigger" 
          [style.backgroundColor]="formGroup.get(control)?.value"
          [title]="label + ' Color'"
          (click)="togglePicker(pickerId, $event)">
          <span class="label-hint">{{ label }}</span>
        </div>
        
        <div class="picker-popover" *ngIf="activePicker === pickerId" (click)="$event.stopPropagation()">
          <div class="swatch-grid">
            <button type="button" *ngFor="let c of colors" 
              class="quick-swatch" 
              [ngStyle]="{'background-color': c.hex}" 
              [title]="c.label" (click)="setColor(control, c.hex)"></button>
          </div>
          <div class="custom-divider"></div>
          <div class="custom-trigger">
            <input type="color" [formControl]="$any(formGroup.get(control))" id="actualPicker_{{pickerId}}">
            <label for="actualPicker_{{pickerId}}">Custom...</label>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .form-container {
      background: white;
      padding: 2rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);

      header {
        margin-bottom: 2rem;
        
        h2 {
          font-size: 1.5rem;
          margin: 0 0 0.5rem 0;
          font-weight: 700;
          color: var(--text-main);
        }
        p {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin: 0;
        }
      }

      .form-group {
        margin-bottom: 1.75rem;
        display: flex;
        flex-direction: column;

        label {
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.6rem;
          color: var(--text-muted);
          display: flex;
          justify-content: space-between;
          
          .req { color: #ef4444; }
        }

        .input-with-color {
          display: flex;
          align-items: stretch;
          gap: 0.75rem;
          
          .main-input {
            flex: 1;
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1.5px solid var(--border-color);
            border-radius: var(--radius-md);
            font-family: inherit;
            font-size: 1rem;
            color: var(--text-main);
            transition: all 0.2s;
            
            &::placeholder { color: #94a3b8; }
            
            &:focus {
              outline: none;
              border-color: var(--primary);
              box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
            }
          }
          
          textarea.main-input {
            resize: vertical;
            min-height: 100px;
          }
          
          .inline-font-size {
            flex-shrink: 0;
            width: 70px;
            padding: 0 0.5rem;
            border: 1.5px solid var(--border-color);
            border-radius: var(--radius-md);
            text-align: center;
            font-family: inherit;
            font-size: 0.875rem;
            font-weight: 600;
            background: #f8fafc;
            color: var(--text-main);
            
            &:focus {
              outline: none;
              border-color: var(--primary);
            }
          }
          
          .color-controls {
            display: flex;
            flex-direction: column;
            gap: 4px;
            flex-shrink: 0;
            width: 44px;
            
            .smart-picker-container {
              position: relative;
              flex: 1;
              display: flex;

              .color-trigger {
                width: 100%;
                height: 24px;
                border: 1px solid var(--border-color);
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                background: none;

                &:hover { 
                  transform: scale(1.08);
                  z-index: 10;
                  box-shadow: var(--shadow-md);
                }

                .label-hint {
                  font-size: 8px;
                  font-weight: 800;
                  color: white;
                  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
                  pointer-events: none;
                }
              }

              .picker-popover {
                position: absolute;
                bottom: calc(100% + 12px);
                right: -10px;
                background: white;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-lg);
                padding: 12px;
                z-index: 100;
                width: 140px;
                animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                
                &::after {
                  content: '';
                  position: absolute;
                  top: 100%;
                  right: 22px;
                  border: 8px solid transparent;
                  border-top-color: white;
                }

                .swatch-grid {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 8px;
                  margin-bottom: 12px;

                  .quick-swatch {
                    width: 34px;
                    height: 34px;
                    border-radius: 6px;
                    border: 1px solid rgba(0,0,0,0.05);
                    cursor: pointer;
                    padding: 0;
                    transition: transform 0.2s;
                    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);

                    &:hover { transform: scale(1.15); z-index: 2; }
                  }
                }

                .custom-divider {
                  height: 1px;
                  background: #f1f5f9;
                  margin: 10px 0;
                }

                .custom-trigger {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  cursor: pointer;
                  padding: 4px;
                  border-radius: 4px;
                  transition: background 0.2s;

                  &:hover { background: #f8fafc; }

                  input[type="color"] {
                    width: 20px;
                    height: 20px;
                    border: none;
                    background: none;
                    cursor: pointer;
                    &::-webkit-color-swatch-wrapper { padding: 0; }
                    &::-webkit-color-swatch { border: 1.5px solid #fff; border-radius: 50%; box-shadow: 0 0 0 1px #cbd5e1; }
                  }
                  
                  label { margin: 0; cursor: pointer; color: var(--primary); font-size: 0.75rem; font-weight: 600; }
                }
              }
            }
          }
        }

        &.has-error .main-input {
          border-color: #fca5a5;
          background: #fef2f2;
        }

        .field-meta {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-size: 0.75rem;

          .char-count { color: var(--text-muted); font-weight: 500; }
          .error-msg { color: #ef4444; font-weight: 600; }
        }
      }

      .form-row {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px dashed var(--border-color);
        
        .half { flex: 1; }
      }

      .actions {
        display: flex;
        gap: 1rem;
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 2px solid var(--border-color);

        button {
          flex: 1;
          padding: 0.875rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          border: none;
        }

        .btn-reset {
          background: #f1f5f9;
          color: var(--text-muted);
          &:hover:not(:disabled) { background: #e2e8f0; color: var(--text-main); }
        }

        .btn-download {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.39);
          &:hover:not(:disabled) { background: var(--primary-hover); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45); }
          &:active { transform: translateY(0); }
          &:disabled { opacity: 0.4; box-shadow: none; cursor: not-allowed; }
        }
      }
    }

    @keyframes popIn {
      from { opacity: 0; transform: scale(0.9) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
  `]
})
export class AdFormComponent {
  @Input() formGroup!: FormGroup;
  @Output() resetClicked = new EventEmitter<void>();
  @Output() downloadClicked = new EventEmitter<void>();

  activePicker: string | null = null;

  quickColors = [
    { label: 'White', hex: '#ffffff' },
    { label: 'Black', hex: '#000000' },
    { label: 'Grey', hex: '#b2b2b2' },
    { label: 'Red', hex: '#e74c3c' },
    { label: 'Blue', hex: '#3498db' },
    { label: 'Green', hex: '#2ecc71' }
  ];

  constructor(private cdr: ChangeDetectorRef) { }

  onTemplateChange(type: TemplateType) {
    let dimensions = { widthCm: 4, heightCm: 5 };
    if (type === '10x1') {
      dimensions = { widthCm: 4, heightCm: 10 };
    }

    this.formGroup.patchValue({
      template: type,
      ...dimensions
    });
    this.cdr.detectChanges();
  }

  togglePicker(pickerId: string, event: Event) {
    event.stopPropagation();
    this.activePicker = this.activePicker === pickerId ? null : pickerId;
    // Force UI refresh immediately
    this.cdr.detectChanges();
  }

  closePickers() {
    this.activePicker = null;
    this.cdr.detectChanges();
  }

  setColor(controlName: string, hex: string) {
    this.formGroup.get(controlName)?.setValue(hex);
    this.activePicker = null;
    this.cdr.detectChanges();
  }

  isInvalid(controlName: string): boolean {
    const control = this.formGroup.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
