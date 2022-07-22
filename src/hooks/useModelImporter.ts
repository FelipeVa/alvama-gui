import { ipcRenderer } from 'electron';
const jsonfile = require('jsonfile');
const notifier = require('node-notifier');
import { useEffect, useState } from 'react';

export const useModelImporter = <T>() => {
  const [importData, setImportData] = useState<T | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    ipcRenderer.on('file', (event, file: string) => {
      setIsImporting(true);

      if (file.endsWith('csv') || file.endsWith('.json')) {
        jsonfile.readFile(file).then((data: any) => {
          if (
            !['buses', 'routes'].every(key => Object.keys(data).includes(key))
          ) {
            setIsImporting(false);
            notifier.notify({
              title: 'Invalid File',
              message: 'The file is not a valid model file.',
            });
          }

          setIsImporting(false);
          setImportData(data);

          notifier.notify({
            title: 'Model data imported',
            message: 'The model data has been imported successfully.',
          });
        });
      }
    });
  }, []);

  const onImport = () => {
    ipcRenderer.send('file-request');
  };

  return { importData, onImport, isImporting };
};
