import { useState, useCallback } from 'react';
import { API_REPORT_RECEIPT } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';
import { IReportReceiptResponse } from '../@types/report.interface';

export function useGetReportReceipt() {
  const [data, setData] = useState<IReportReceiptResponse['metadata'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchReport = useCallback(async (type: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get<unknown, IReportReceiptResponse>(
        `${API_REPORT_RECEIPT}/${type}`
      );
      setData(res?.metadata ?? null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchReport,
  };
}
