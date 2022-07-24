import { DatasetType } from '@/types/dataset.type';
import { ResultType } from '@/types/result.type';

export type ExecutionType = {
  id: string;
  name: string;
  dataset: DatasetType;
  result: ResultType;
  created_at: string;
};

export interface CreateExecutionFormValues {
  name: string;
  dataset_id: string;
}
