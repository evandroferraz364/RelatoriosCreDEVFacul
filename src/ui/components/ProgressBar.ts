/**
 * Componente ProgressBar para indicar etapas
 */

export interface ProgressStep {
  number: number;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

export interface ProgressBarOptions {
  steps: ProgressStep[];
  className?: string;
}

export class ProgressBar {
  private element: HTMLDivElement;

  constructor(options: ProgressBarOptions) {
    this.element = this.create(options);
  }

  private create(options: ProgressBarOptions): HTMLDivElement {
    const container = document.createElement('div');
    container.className = ['progress-bar', options.className || '']
      .filter(Boolean)
      .join(' ');

    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'progress-bar__steps';

    options.steps.forEach((step) => {
      const stepEl = document.createElement('div');
      stepEl.className = [
        'progress-step',
        step.active && 'progress-step--active',
        step.completed && 'progress-step--done'
      ]
        .filter(Boolean)
        .join(' ');

      const num = document.createElement('div');
      num.className = 'progress-step__num';
      num.textContent = String(step.number);

      const title = document.createElement('div');
      title.className = 'progress-step__title';
      title.textContent = step.title;

      const desc = document.createElement('div');
      desc.className = 'progress-step__desc';
      desc.textContent = step.description;

      stepEl.appendChild(num);
      stepEl.appendChild(title);
      stepEl.appendChild(desc);

      stepsContainer.appendChild(stepEl);
    });

    container.appendChild(stepsContainer);
    return container;
  }

  render(): HTMLDivElement {
    return this.element;
  }

  updateStep(stepNumber: number, active: boolean, completed: boolean): void {
    const steps = this.element.querySelectorAll('.progress-step');
    const step = steps[stepNumber - 1];

    if (step) {
      step.classList.toggle('progress-step--active', active);
      step.classList.toggle('progress-step--done', completed);
    }
  }
}
