/**
 * Tipos principais da aplicação
 */

export interface Campaign {
  id: string;
  name: string;
  format: string;
  objective: string;
  value: number;
  spent: number;
  reach: number;
  engagement: number;
  linkClicks: number;
  views: number;
  conversations: number;
  startDate: Date;
  endDate?: Date;
  sortDate?: Date;
}

export interface CampaignRow {
  name: string;
  format: string;
  objective: string;
  value?: number | string;
  spent?: number | string;
  reach?: number | string;
  engagement?: number | string;
  linkClicks?: number | string;
  views?: number | string;
  conversations?: number | string;
  startDate?: Date | string;
  endDate?: Date | string;
  sortDate?: Date;
}

export interface ParsedExcelData {
  campaigns: Campaign[];
  clientName: string;
  period: {
    month: number;
    year: number;
    startDate: Date;
    endDate: Date;
  };
  summary: {
    totalCampaigns: number;
    totalSpent: number;
    totalReach: number;
  };
}

export interface CapaData {
  fb: FacebookMetrics;
  ig: InstagramMetrics;
}

export interface FacebookMetrics {
  seguidores: number;
  seguidoresAnterior: number;
  homens: number;
  mulheres: number;
  faixaEtaria: string;
  alcancadas: number;
  visitas: number;
}

export interface InstagramMetrics {
  seguidores: number;
  seguidoresAnterior: number;
  homens: number;
  mulheres: number;
  faixaEtaria: string;
  alcancadas: number;
  visitas: number;
}

export interface ClassifierConfig {
  normalizationAliases: Record<string, string[]>;
  formatKeywords: FormatKeyword[];
  objectivePriority: Record<string, number>;
  objectiveRules: ObjectiveRule[];
}

export interface FormatKeyword {
  keyword: string;
  label: string;
  aliases?: string[];
}

export interface ObjectiveRule {
  name: string;
  objective: string;
  aliases?: string[];
  tolerance?: number | null;
  when: RuleCondition;
}

export interface RuleCondition {
  allWords?: string[][];
  anyWords?: string[][];
  noneWords?: string[][];
  textRegex?: string;
  textIncludes?: string[][];
  formatIn?: string[];
  tolerance?: number;
}

export interface AppState {
  campaignsData: Campaign[];
  originalFileName: string;
  capaData: CapaData;
  currentView: 'upload' | 'review' | 'capa' | 'report';
  previewVisible: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ExportOptions {
  format: 'excel' | 'google-sheets' | 'pdf';
  includeCapaData: boolean;
  fileName?: string;
}
