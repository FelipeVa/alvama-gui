const { spawn } = require('child_process');

export default function runAlvama() {
  const py = spawn('/Users/pipee/.pyenv/versions/3.10.4/bin/python3', [
    '/Users/pipee/Code/alvama/main.py',
  ]);

  py.stdout.on('data', (data: string) => {
    console.log(`stdout: ${data}`);
  });

  py.stderr.on('data', (data: string) => {
    console.error(`child stderr:\n${data}`);
  });
}

