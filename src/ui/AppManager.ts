/**
 * Gerenciador de aplicação - orquestra todas as páginas
 */

import { stateManager } from '@modules/state/store';
import { UploadPage } from '@ui/pages/UploadPage';
import { ReviewPage } from '@ui/pages/ReviewPage';
import { CapaPage } from '@ui/pages/CapaPage';

export class AppManager {
  private uploadPage: UploadPage;
  private reviewPage: ReviewPage;
  private capaPage: CapaPage;
  private container: HTMLElement;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container com ID "${containerId}" não encontrado`);
    }

    this.container = container;
    this.createLayout();

    this.uploadPage = new UploadPage(this.getArea('upload'));
    this.reviewPage = new ReviewPage(this.getArea('review'));
    this.capaPage = new CapaPage(this.getArea('capa'));

    this.setupStateListener();
    this.showCurrentView();
  }

  private createLayout(): void {
    this.container.innerHTML = `
      <div class="app-layout">
        <header class="app-header">
          <div class="app-header__logo">
            <h1>Relatório de <span>Impulsionamento</span></h1>
          </div>
        </header>
        <main class="app-main">
          <div id="upload-area" class="app-area"></div>
          <div id="review-area" class="app-area" style="display: none;"></div>
          <div id="capa-area" class="app-area" style="display: none;"></div>
          <div id="report-area" class="app-area" style="display: none;"></div>
        </main>
        <footer class="app-footer">
          <p>Relatório de Impulsionamento © 2026</p>
        </footer>
      </div>
    `;
  }

  private getArea(name: string): HTMLElement {
    const id = `${name}-area`;
    const area = document.getElementById(id);
    if (!area) {
      throw new Error(`Área "${id}" não encontrada`);
    }
    return area;
  }

  private setupStateListener(): void {
    stateManager.subscribe((newState) => {
      console.log('📊 Atualizando view:', newState.currentView);
      this.showCurrentView();
    });
  }

  private showCurrentView(): void {
    const state = stateManager.getState();
    const views = ['upload', 'review', 'capa', 'report'];

    // Esconder todas as áreas
    views.forEach((view) => {
      const area = document.getElementById(`${view}-area`);
      if (area) {
        area.style.display = 'none';
      }
    });

    // Mostrar view atual
    const currentArea = document.getElementById(`${state.currentView}-area`);
    if (currentArea) {
      currentArea.style.display = 'block';

      // Renderizar página apropriada
      switch (state.currentView) {
        case 'upload':
          this.uploadPage.show();
          break;
        case 'review':
          this.reviewPage.show();
          break;
        case 'capa':
          this.capaPage.show();
          break;
        case 'report':
          this.showReportPlaceholder();
          break;
      }
    }
  }

  private showReportPlaceholder(): void {
    const area = this.getArea('report');
    area.innerHTML = `
      <div class="report-placeholder">
        <h2>📊 Relatório Gerado</h2>
        <p>Funcionalidade de relatório em desenvolvimento...</p>
        <button onclick="location.reload()">Voltar ao início</button>
      </div>
    `;
  }
}
