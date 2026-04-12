import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdData, DEFAULT_AD_DATA } from '../../models/ad.model';
import { FiveByOneTemplateComponent } from '../../templates/five-by-one-template/five-by-one-template.component';
import { TenByOneTemplateComponent } from '../../templates/ten-by-one-template/ten-by-one-template.component';
import { cmToPx } from '../../utils/unit-converter.util';

@Component({
  selector: 'app-ad-preview',
  standalone: true,
  imports: [
    CommonModule,
    FiveByOneTemplateComponent,
    TenByOneTemplateComponent
  ],
  template: `
    <div class="preview-container">
      <div class="preview-header">
        <h3>Live Preview</h3>
        <div class="header-actions">
          <div class="zoom-controls">
            <button (click)="changeZoom(-0.2)" title="Zoom Out">➖</button>
            <span class="zoom-level">{{ (zoomFactor * 100).toFixed(0) }}%</span>
            <button (click)="changeZoom(0.2)" title="Zoom In">➕</button>
            <button (click)="resetZoom()" title="Reset Zoom">🎯</button>
          </div>
          <span class="badge">{{ adData.template }} Template</span>
        </div>
      </div>
      
      <div class="poster-wrapper">
        <div class="poster-scaler" [style.transform]="'scale(' + zoomFactor + ')'">
          <div class="poster" #posterElement [ngSwitch]="adData.template" [ngStyle]="getDynamicDimensions()">
            <app-five-by-one-template *ngSwitchCase="'5x1'" [adData]="adData"></app-five-by-one-template>
            <app-ten-by-one-template *ngSwitchCase="'10x1'" [adData]="adData"></app-ten-by-one-template>
            <!-- Fallback just in case -->
            <app-five-by-one-template *ngSwitchDefault [adData]="adData"></app-five-by-one-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .preview-container {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      h3 {
        margin: 0;
        font-family: 'Outfit', sans-serif;
        font-size: 1rem;
        font-weight: 700;
        color: var(--text-main);
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 1.5rem;
      }

      .zoom-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: white;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-sm);

        button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          padding: 0.25rem;
          opacity: 0.7;
          &:hover { opacity: 1; transform: scale(1.1); }
        }

        .zoom-level {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          min-width: 45px;
          text-align: center;
        }
      }

      .badge {
        background: white;
        color: var(--primary);
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        font-size: 0.7rem;
        font-weight: 800;
        text-transform: uppercase;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-sm);
      }
    }

    .poster-wrapper {
      background: #f1f5f9;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      min-height: 700px;
      overflow: hidden;
    }

    .poster-scaler {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .poster {
      box-shadow: 
        0 10px 15px -3px rgba(0,0,0,0.1), 
        0 4px 6px -4px rgba(0,0,0,0.1),
        0 25px 50px -12px rgba(0,0,0,0.25);
      background: transparent;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
      container-type: size;
    }
  `]
})
export class AdPreviewComponent {
  @Input() adData: AdData = DEFAULT_AD_DATA;
  @ViewChild('posterElement') posterElementRef!: ElementRef<HTMLDivElement>;

  zoomFactor = 1.5;

  changeZoom(delta: number) {
    this.zoomFactor = Math.min(Math.max(this.zoomFactor + delta, 0.2), 3);
  }

  resetZoom() {
    this.zoomFactor = 1.0;
  }

  getDynamicDimensions() {
    const widthCm = this.adData.widthCm || 4;
    const heightCm = this.adData.heightCm || 5;

    return {
      'width': `${cmToPx(widthCm)}px`,
      'height': `${cmToPx(heightCm)}px`
    };
  }
}



