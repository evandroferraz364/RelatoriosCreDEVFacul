/**
 * Entry point da aplicação
 */

import './styles/main.scss';
import { Button } from '@ui/components/Button';
import { stateManager } from '@modules/state/store';

// Inicializa a aplicação
function initApp(): void {
  console.log('🚀 Aplicação iniciada');

  // Carrega estado
  const state = stateManager.getState();
  console.log('📊 Estado carregado:', state);

  // Exemplo: criar um botão
  const uploadButton = new Button({
    text: 'Selecionar arquivo',
    variant: 'primary',
    size: 'lg',
    icon: '📁',
    onClick: () => {
      console.log('Upload clicado');
    }
  });

  // Monta na página
  const app = document.getElementById('app');
  if (app) {
    app.appendChild(uploadButton.render());
  }

  // Subscreve a mudanças de estado
  stateManager.subscribe((newState) => {
    console.log('📌 Estado atualizado:', newState);
  });
}

// Executa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Hot Module Replacement para desenvolvimento
if (module.hot) {
  module.hot.accept();
}
