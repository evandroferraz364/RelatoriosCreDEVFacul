/**
 * Utilitários de Validação
 */

import * as yup from 'yup';
import { ValidationError } from '@errors/AppError';

/**
 * Validação de arquivo Excel
 */
export function validateExcelFile(file: File): void {
  const validTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
  ];

  if (!validTypes.includes(file.type)) {
    throw new ValidationError('Arquivo deve ser um Excel válido (.xlsx ou .xls)');
  }

  const maxSizeMB = 50;
  if (file.size > maxSizeMB * 1024 * 1024) {
    throw new ValidationError(`Arquivo não pode exceder ${maxSizeMB}MB`);
  }
}

/**
 * Validação de nome de arquivo
 */
export function validateFileName(fileName: string): void {
  if (!fileName || fileName.trim().length === 0) {
    throw new ValidationError('Nome do arquivo não pode estar vazio');
  }

  if (fileName.length > 255) {
    throw new ValidationError('Nome do arquivo muito longo (máximo 255 caracteres)');
  }
}

/**
 * Validação de dados de campanha
 */
export const campaignSchema = yup.object().shape({
  name: yup.string().required('Nome da campanha é obrigatório'),
  format: yup.string().required('Formato é obrigatório'),
  objective: yup.string().required('Objetivo é obrigatório'),
  value: yup.number().min(0, 'Valor não pode ser negativo'),
  spent: yup.number().min(0, 'Gasto não pode ser negativo'),
  reach: yup.number().min(0, 'Alcance não pode ser negativo'),
  engagement: yup.number().min(0, 'Engajamento não pode ser negativo'),
});

/**
 * Validação de dados da capa
 */
export const capaSchema = yup.object().shape({
  fb: yup.object().shape({
    seguidores: yup.number().min(0),
    homens: yup.number().min(0).max(100),
    mulheres: yup.number().min(0).max(100),
  }),
  ig: yup.object().shape({
    seguidores: yup.number().min(0),
    homens: yup.number().min(0).max(100),
    mulheres: yup.number().min(0).max(100),
  }),
});

/**
 * Valida um objeto contra um schema yup
 */
export async function validateSchema<T>(
  data: unknown,
  schema: yup.Schema<T>
): Promise<{ isValid: boolean; errors: string[] }> {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        isValid: false,
        errors: error.inner.map((e) => e.message),
      };
    }
    return {
      isValid: false,
      errors: ['Erro desconhecido na validação'],
    };
  }
}

/**
 * Validação de e-mail
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validação de URL
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
