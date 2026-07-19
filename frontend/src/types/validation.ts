export interface ValidationResult {
  total_records: number;
  missing_columns: string[];
  duplicate_ppr: string[];
  invalid_emails: string[];
  data_quality_score: number;

  joined: number;
  offer_dropped: number;
  offer_accepted: number;
  yet_to_offer: number;
}