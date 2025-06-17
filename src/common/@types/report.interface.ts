export interface IReportReceiptResponse {
  message: string;
  status: number;
  metadata: Array<{ status: string; count: number }>;
}
