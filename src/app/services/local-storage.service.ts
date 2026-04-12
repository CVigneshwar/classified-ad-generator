import { Injectable } from '@angular/core';
import { AdData, DEFAULT_AD_DATA } from '../models/ad.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly STORAGE_KEY = 'classified_ad_draft';

  saveDraft(data: AdData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to local storage', e);
    }
  }

  loadDraft(): AdData {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as AdData;
      }
    } catch (e) {
      console.error('Error loading from local storage', e);
    }
    return { ...DEFAULT_AD_DATA };
  }

  clearDraft(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
