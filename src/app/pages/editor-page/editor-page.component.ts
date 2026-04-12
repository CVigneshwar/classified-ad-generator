import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdFormComponent } from '../../components/ad-form/ad-form.component';
import { AdPreviewComponent } from '../../components/ad-preview/ad-preview.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { ExportService } from '../../services/export.service';
import { AdData, DEFAULT_AD_DATA } from '../../models/ad.model';

@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [CommonModule, AdFormComponent, AdPreviewComponent],
  template: `
    <div class="editor-shell">
      <header class="app-header">
        <div class="logo">
          <span class="icon">📰</span>
          <h1>Classified<span>Gen</span></h1>
        </div>
        <div class="header-actions">
        </div>
      </header>

      <main class="editor-main">
        <section class="form-pane">
          <div class="pane-inner">
            <app-ad-form 
              *ngIf="editorForm"
              [formGroup]="editorForm"
              (resetClicked)="onReset()"
              (downloadClicked)="onDownload()">
            </app-ad-form>
          </div>
        </section>

        <section class="preview-pane">
          <div class="preview-stage">
            <app-ad-preview #preview *ngIf="editorForm" [adData]="editorForm.getRawValue()"></app-ad-preview>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .editor-shell {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
      background: #f8fafc;
    }

    .app-header {
      height: 70px;
      padding: 0 2.5rem;
      background: white;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
      z-index: 50;

      .logo {
        display: flex;
        align-items: center;
        gap: 1rem;
        .icon { font-size: 1.5rem; }
        h1 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          span { color: var(--primary); }
        }
      }
    }

    .editor-main {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    .form-pane {
      flex: 1;
      overflow-y: auto;
      background: white;
      border-right: 1px solid var(--border-color);
      
      .pane-inner {
        padding: 3rem 2.5rem;
        max-width: 900px;
        margin: 0 auto;
      }
    }

    .preview-pane {
      flex: 1;
      overflow-y: auto;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 3rem 4rem;
      background: #f1f5f9;
      
      .preview-stage {
        width: 100%;
        max-width: 900px;
        display: flex;
        justify-content: center;
      }
    }



    @media (max-width: 1100px) {
      .editor-shell { overflow-y: auto; }
      .editor-main { flex-direction: column-reverse; overflow: visible; height: auto; }
      .form-pane { flex: none; width: 100%; border-right: none; }
      .preview-pane { flex: none; width: 100%; height: auto; padding: 2rem; }
    }
  `]
})
export class EditorPageComponent implements OnInit {
  @ViewChild('preview') previewComponent!: AdPreviewComponent;
  editorForm!: FormGroup;
  isExporting = false;

  constructor(
    private fb: FormBuilder,
    private storage: LocalStorageService,
    private exportService: ExportService
  ) {}

  ngOnInit() {
    const savedData = this.storage.loadDraft();
    
    this.editorForm = this.fb.group({
      template: [savedData.template || DEFAULT_AD_DATA.template],
      header: [savedData.header, [Validators.required, Validators.maxLength(50)]],
      subheader: [savedData.subheader, [Validators.maxLength(100)]],
      body: [savedData.body, [Validators.maxLength(500)]],
      bullets: [savedData.bullets],
      features: [savedData.features],
      footerNote: [savedData.footerNote],
      contactNumber: [savedData.contactNumber, Validators.required],
      headerColor: [savedData.headerColor || DEFAULT_AD_DATA.headerColor],
      headerTextColor: [savedData.headerTextColor || DEFAULT_AD_DATA.headerTextColor],
      subHeaderColor: [savedData.subHeaderColor || DEFAULT_AD_DATA.subHeaderColor],
      subHeaderTextColor: [savedData.subHeaderTextColor || DEFAULT_AD_DATA.subHeaderTextColor],
      bodyColor: [savedData.bodyColor || DEFAULT_AD_DATA.bodyColor],
      bodyTextColor: [savedData.bodyTextColor || DEFAULT_AD_DATA.bodyTextColor],
      subFooterColor: [savedData.subFooterColor || DEFAULT_AD_DATA.subFooterColor],
      subFooterTextColor: [savedData.subFooterTextColor || DEFAULT_AD_DATA.subFooterTextColor],
      footerColor: [savedData.footerColor || DEFAULT_AD_DATA.footerColor],
      footerTextColor: [savedData.footerTextColor || DEFAULT_AD_DATA.footerTextColor],
      headerFontSize: [savedData.headerFontSize || DEFAULT_AD_DATA.headerFontSize, [Validators.required, Validators.min(1)]],
      subHeaderFontSize: [savedData.subHeaderFontSize || DEFAULT_AD_DATA.subHeaderFontSize, [Validators.required, Validators.min(1)]],
      bodyFontSize: [savedData.bodyFontSize || DEFAULT_AD_DATA.bodyFontSize, [Validators.required, Validators.min(1)]],
      subFooterFontSize: [savedData.subFooterFontSize || DEFAULT_AD_DATA.subFooterFontSize, [Validators.required, Validators.min(1)]],
      footerFontSize: [savedData.footerFontSize || DEFAULT_AD_DATA.footerFontSize, [Validators.required, Validators.min(1)]],
      widthCm: [savedData.widthCm || DEFAULT_AD_DATA.widthCm, [Validators.required, Validators.min(1), Validators.max(50)]],
      heightCm: [savedData.heightCm || DEFAULT_AD_DATA.heightCm, [Validators.required, Validators.min(1), Validators.max(50)]]
    });

    // Real-time autosave
    this.editorForm.valueChanges.subscribe(val => {
      this.storage.saveDraft(val as AdData);
    });
  }

  onReset() {
    this.editorForm.patchValue(DEFAULT_AD_DATA);
  }

  async onDownload() {
    if (this.editorForm.invalid || !this.previewComponent || !this.previewComponent.posterElementRef) {
      return;
    }

    const value = this.editorForm.value as AdData;
    const filename = `classified-${value.template}-${value.widthCm}x${value.heightCm}cm.png`;

    try {
      this.isExporting = true;
      await this.exportService.exportPoster(
        this.previewComponent.posterElementRef.nativeElement, 
        filename
      );
    } catch (err) {
      console.error('Failed to export image', err);
      alert('There was an issue capturing the poster. Please check console for details.');
    } finally {
      this.isExporting = false;
    }
  }
}


