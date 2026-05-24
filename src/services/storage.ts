/**
 * Serviço de Armazenamento Local
 */

import { AppState } from '@types/index';
import { logger } from './logger';

const STORAGE_KEY = 'relatorios_ads_state_v2';
const CLASSIFIER_KEY = 'relatorios_ads_classifier_config_v4';

class StorageService {
  saveAppState(state: AppState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      logger.debug('App state saved', { stateKeys: Object.keys(state) });
    } catch (error) {
      logger.error('Failed to save app state', error);
    }
  }

  loadAppState(): AppState | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as AppState;
    } catch (error) {
      logger.error('Failed to load app state', error);
      return null;
    }
  }

  clearAppState(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      logger.info('App state cleared');
    } catch (error) {
      logger.error('Failed to clear app state', error);
    }
  }

  saveClassifierConfig(config: unknown): void {
    try {
      localStorage.setItem(CLASSIFIER_KEY, JSON.stringify(config));
      logger.debug('Classifier config saved');
    } catch (error) {
      logger.error('Failed to save classifier config', error);
    }
  }

  loadClassifierConfig<T>(): T | null {
    try {
      const raw = localStorage.getItem(CLASSIFIER_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (error) {
      logger.error('Failed to load classifier config', error);
      return null;
    }
  }

  clearClassifierConfig(): void {
    try {
      localStorage.removeItem(CLASSIFIER_KEY);
      logger.info('Classifier config cleared');
    } catch (error) {
      logger.error('Failed to clear classifier config', error);
    }
  }

  getAllKeys(): string[] {
    return Object.keys(localStorage);
  }

  clearAll(): void {
    try {
      localStorage.clear();
      logger.info('All storage cleared');
    } catch (error) {
      logger.error('Failed to clear all storage', error);
    }
  }
}

export const storageService = new StorageService();
