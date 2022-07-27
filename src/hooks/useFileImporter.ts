import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
const jsonfile = require('jsonfile');

export const useFileImporter = <T>() => {
  const [importData, setImportData] = useState<T | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    ipcRenderer.on('file', (event, file: string) => {
      setIsImporting(true);

      if (file.endsWith('csv') || file.endsWith('.json')) {
        jsonfile.readFile(file).then((data: any) => {
          setIsImporting(false);
          setImportData(data);
        });
      }
    });
  }, []);

  const onImport = () => {
    ipcRenderer.send('file-request');
  };

  return { importData, onImport, isImporting };
};
