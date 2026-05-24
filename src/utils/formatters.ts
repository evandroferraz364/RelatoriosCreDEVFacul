/**
 * Utilitários de Formatação
 */

const BRL_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const NUMBER_FORMATTER = new Intl.NumberFormat('pt-BR');

const DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

/**
 * Formata um número como moeda brasileira
 * @example formatBRL(1234.56) => "R$ 1.234,56"
 */
export function formatBRL(value: number): string {
  if (typeof value !== 'number' || value <= 0) return '-';
  return BRL_FORMATTER.format(value);
}

/**
 * Formata um número com separador de milhar
 * @example formatNumber(1234567) => "1.234.567"
 */
export function formatNumber(value: number): string {
  if (typeof value !== 'number' || value <= 0) return '-';
  return NUMBER_FORMATTER.format(value);
}

/**
 * Formata uma data para o padrão brasileiro
 * @example formatDate(new Date()) => "24/05/2026"
 */
export function formatDate(date: Date | string | number): string {
  try {
    const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    if (isNaN(d.getTime())) return '-';
    return DATE_FORMATTER.format(d);
  } catch {
    return '-';
  }
}

/**
 * Converte uma string para Title Case
 * @example titleCase('hello world') => "Hello World"
 */
export function titleCase(str: string): string {
  if (!str) return str;
  return String(str)
    .toLowerCase()
    .replace(/(?:^|\s|-)(\S)/g, (_, c) => c.toUpperCase());
}

/**
 * Parse de moeda para número
 * Suporta formatos BR (1.234,56) e US (1,234.56)
 */
export function parseCurrency(value: unknown): number {
  if (typeof value === 'number') return value;
  if (!value) return 0;

  const str = String(value).trim();
  if (str === '' || str === '-' || str === '–' || str === '—') return 0;

  // Remove símbolo de moeda e espaços
  let normalized = str.replace(/[R$\s]/g, '');

  // Detecta formato BR (vírgula como decimal)
  if (normalized.includes(',') && !normalized.match(/,\d{3}/)) {
    normalized = normalized.replace(/\./g, '').replace(',', '.');
  }

  return parseFloat(normalized) || 0;
}

/**
 * Parse de número inteiro
 */
export function parseNumber(value: unknown): number {
  if (typeof value === 'number') return Math.round(value);
  if (!value) return 0;
  return parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;
}

/**
 * Parse de percentual
 */
export function parsePercent(value: unknown): number {
  const num = parseCurrency(value);
  return Math.min(Math.max(num, 0), 100);
}

/**
 * Sanitiza string contra XSS
 */
export function sanitizeInput(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Trunca texto com elipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Debounce de função
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle de função
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Deep clone de objeto
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
