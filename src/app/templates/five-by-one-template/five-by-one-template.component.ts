import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdData } from '../../models/ad.model';

@Component({
  selector: 'app-five-by-one-template',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="template-wrapper" 
      [style.--header-color]="adData.headerColor"
      [style.--sub-header-color]="adData.subHeaderColor"
      [style.--body-color]="adData.bodyColor"
      [style.--sub-footer-color]="adData.subFooterColor"
      [style.--footer-color]="adData.footerColor"
      [style.--header-font-size]="getFontSizePx(adData.headerFontSize) + 'px'"
      [style.--sub-header-font-size]="getFontSizePx(adData.subHeaderFontSize) + 'px'"
      [style.--body-font-size]="getFontSizePx(adData.bodyFontSize) + 'px'"
      [style.--sub-footer-font-size]="getFontSizePx(adData.subFooterFontSize) + 'px'"
      [style.--footer-font-size]="getFontSizePx(adData.footerFontSize) + 'px'"
      [style.--letter-spacing]="getLetterSpacingPx(0.5) + 'px'"
      [style.--header-text-color]="adData.headerTextColor"
      [style.--sub-header-text-color]="adData.subHeaderTextColor"
      [style.--body-text-color]="adData.bodyTextColor"
      [style.--sub-footer-text-color]="adData.subFooterTextColor"
      [style.--footer-text-color]="adData.footerTextColor">
      <div class="poster-layout">
        
        <div class="header-section" *ngIf="adData.header">
          <h1>{{ adData.header }}</h1>
        </div>
        
        <div class="sub-header-section" *ngIf="adData.subheader">
          <h2>{{ adData.subheader }}</h2>
        </div>
        
        <div class="body-section" *ngIf="adData.body">
          <p class="body-text">{{ adData.body }}</p>
        </div>

        <div class="sub-footer-section" *ngIf="adData.footerNote">
          <p>{{ adData.footerNote }}</p>
        </div>
        
        <div class="footer-section" *ngIf="adData.contactNumber">
          <h1>{{ adData.contactNumber }}</h1>
        </div>
        
      </div>
    </div>
  `,
  styles: [`
    .template-wrapper {
      width: 100%;
      height: 100%;
      background: transparent;
      font-family: 'Inter', Arial, sans-serif;
      box-sizing: border-box;
      overflow: hidden;
    }
    
    .poster-layout {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .header-section {
      background: var(--header-color, #000);
      color: var(--header-text-color, white);
      text-align: center;
      padding: 6cqw 2cqw;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      
      h1 {
        margin: 0;
        font-size: var(--header-font-size);
        font-family: 'Outfit', 'Inter', Arial, sans-serif;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: var(--letter-spacing);
        line-height: 1.1;
        color: inherit !important;
      }
    }
    
    .sub-header-section {
      background: var(--sub-header-color, #b2b2b2);
      color: var(--sub-header-text-color, #111);
      text-align: center;
      padding: 3cqw;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      
      h2 {
        margin: 0;
        font-size: var(--sub-header-font-size);
        font-family: 'Outfit', 'Inter', Arial, sans-serif;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: var(--letter-spacing);
        line-height: 1.1;
        color: inherit !important;
        text-align: center;
      }
    }
    
    .body-section {
      background: var(--body-color, #ffffff);
      color: var(--body-text-color, #111);
      flex: 1; 
      padding: 6cqw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      
      .body-text {
        font-size: var(--body-font-size);
        font-family: 'Inter', Arial, sans-serif;
        line-height: 1.4;
        margin: 0;
        text-align: center;
        font-weight: 400;
        color: inherit !important;
      }
    }

    .sub-footer-section {
      background: var(--sub-footer-color, #b2b2b2);
      color: var(--sub-footer-text-color, #111);
      text-align: center;
      padding: 3cqw;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      
      p {
        margin: 0;
        font-size: var(--sub-footer-font-size);
        font-family: 'Outfit', 'Inter', Arial, sans-serif;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: var(--letter-spacing);
        line-height: 1.1;
        color: inherit !important;
        text-align: center;
      }
    }

    .footer-section {
      background: var(--footer-color, #000);
      color: var(--footer-text-color, white);
      text-align: center;
      padding: 6cqw 2cqw;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      
      h1 {
        margin: 0;
        font-size: var(--footer-font-size);
        font-family: 'Outfit', 'Inter', Arial, sans-serif;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing);
        line-height: 1.1;
        color: inherit !important;
      }
    }
  `]
})
export class FiveByOneTemplateComponent {
  @Input() adData!: AdData;

  getFontSizePx(cqw: number): number {
    const containerWidthPx = (this.adData.widthCm || 4) * 37.795;
    return (cqw / 100) * containerWidthPx;
  }

  getLetterSpacingPx(cqw: number): number {
    const containerWidthPx = (this.adData.widthCm || 4) * 37.795;
    return (cqw / 100) * containerWidthPx;
  }
}
