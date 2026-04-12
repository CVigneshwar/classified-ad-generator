import { Injectable } from '@angular/core';
import * as htmlToImage from 'html-to-image';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  /**
   * Generates a high-quality PNG of the poster element using html-to-image.
   * Native pixelRatio support ensures sharp images and reliable font capture.
   */
  async exportPoster(element: HTMLElement, filename: string): Promise<void> {
    try {
      // Ensure all fonts are fully loaded
      await document.fonts.ready;
      
      const dataUrl = await htmlToImage.toPng(element, {
        pixelRatio: 4,
        cacheBust: true,
        backgroundColor: 'transparent'
      });
      
      // Build a secure off-screen anchor link to trigger download
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Failed to export poster:', error);
      throw new Error('Export generation failed.');
    }
  }
}
