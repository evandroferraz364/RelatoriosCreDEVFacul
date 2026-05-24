/**
 * Utilitários de Data
 */

const MESES_MAP: Record<string, number> = {
  jan: 1,
  janeiro: 1,
  fev: 2,
  fevereiro: 2,
  mar: 3,
  marco: 3,
  março: 3,
  abr: 4,
  abril: 4,
  mai: 5,
  maio: 5,
  jun: 6,
  junho: 6,
  jul: 7,
  julho: 7,
  ago: 8,
  agosto: 8,
  set: 9,
  setembro: 9,
  out: 10,
  outubro: 10,
  nov: 11,
  novembro: 11,
  dez: 12,
  dezembro: 12,
};

/**
 * Parse de data em texto em português
 * @example parseTextDate('24 de maio de 2026') => Date
 */
export function parseTextDate(txt: string): Date | null {
  if (!txt) return null;

  const s = String(txt)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Match: "24 de maio de 2026"
  const match = s.match(/^(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})$/);
  if (match) {
    const mes = MESES_MAP[match[2]];
    if (mes) return new Date(+match[3], mes - 1, +match[1]);
  }

  return null;
}

/**
 * Extrai data de um nome de arquivo
 * @example extractDateFromName('relatorio_24-05-2026.xlsx') => Date
 */
export function extractDateFromName(name: string): Date | null {
  if (!name) return null;

  // Match: DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY
  const match = name.match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
  if (!match) return null;

  let year = +match[3];
  if (year < 100) year += 2000;

  const date = new Date(year, +match[2] - 1, +match[1]);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Parse de data do Excel (número serial)
 */
export function parseExcelDate(value: unknown): Date | null {
  if (value instanceof Date && !isNaN(value.getTime())) return value;

  if (typeof value === 'number') {
    // Converte número serial do Excel para data
    const excelEpoch = new Date(1900, 0, 1);
    const date = new Date(excelEpoch.getTime() + (value - 1) * 24 * 60 * 60 * 1000);
    return isNaN(date.getTime()) ? null : date;
  }

  if (!value) return null;

  const s = String(value).trim();

  // Match ISO: YYYY-MM-DD ou YYYY/MM/DD
  const isoMatch = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (isoMatch) {
    const date = new Date(+isoMatch[1], +isoMatch[2] - 1, +isoMatch[3]);
    return isNaN(date.getTime()) ? null : date;
  }

  // Match BR: DD/MM/YYYY ou DD-MM-YYYY
  const brMatch = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (brMatch) {
    let year = +brMatch[3];
    if (year < 100) year += 2000;
    const date = new Date(year, +brMatch[2] - 1, +brMatch[1]);
    return isNaN(date.getTime()) ? null : date;
  }

  return null;
}

/**
 * Retorna o mês e ano de uma data
 */
export function getMonthYear(date: Date): { month: number; year: number } {
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

/**
 * Retorna nome do mês em português
 */
export function getMonthName(month: number): string {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  return months[month - 1] || '';
}

/**
 * Retorna se uma data está entre dois períodos
 */
export function isBetween(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate;
}

/**
 * Retorna diferença em dias entre duas datas
 */
export function daysDifference(date1: Date, date2: Date): number {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
