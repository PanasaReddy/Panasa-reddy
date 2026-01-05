
export interface ClassificationResult {
  code: string;
  description: string;
  category: 'Goods' | 'Service';
  gstRate: number;
  reason: string;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  query: string;
  category: ClassificationCategory;
}

export type ClassificationCategory = 'Goods' | 'Services' | 'Auto Detect';
