import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { CsvError } from 'csv-parse';
const jsonfile = require('jsonfile');
const fs = require('fs');
const { parse } = require('csv-parse');

interface FileImporterPropsI {
  csv_delimiter?: string;
  columns?: string[];
  formats?: string[];
}

export const useFileImporter = <T>(props?: FileImporterPropsI) => {
  const [importData, setImportData] = useState<T | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isError, setIsError] = useState(false);
  const formats = props?.formats || ['json', 'csv'];

  useEffect(() => {
    ipcRenderer.on('file', (event, file: string) => {
      setIsError(false);
      setIsImporting(true);

      if (file.endsWith('.json')) {
        jsonfile
          .readFile(file)
          .then((data: any) => {
            setIsImporting(false);
            setImportData(data);
          })
          .catch(() => {
            setIsImporting(false);
            setIsError(true);
          });
      }

      if (file.endsWith('.csv')) {
        fs.createReadStream(file).pipe(
          parse(
            {
              from_line: 2,
              delimiter: props?.csv_delimiter || ';',
              columns: props?.columns || ['name', 'value'],
              quote: false,
              skip_records_with_empty_values: true,
            },
            (error: CsvError | undefined, records: T) => {
              if (error?.message) {
                setIsError(false);
                return;
              }

              setIsImporting(false);
              setImportData(records);
            },
          ),
        );
      }
    });
  }, []);

  const onImport = () => {
    ipcRenderer.send('file-request', formats);
  };

  return { importData, onImport, isImporting, isError };
};
