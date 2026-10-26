import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const isWindows = process.platform === 'win32';
const venvPythonWin = path.join(rootDir, 'backend-python', 'venv', 'Scripts', 'python.exe');
const venvPythonUnix = path.join(rootDir, 'backend-python', 'venv', 'bin', 'python');

const pythonExe = isWindows ? venvPythonWin : venvPythonUnix;
const pythonBin = fs.existsSync(pythonExe) ? pythonExe : (isWindows ? 'python' : 'python3');
const appDir = path.join(rootDir, 'backend-python');

const child = spawn(
  pythonBin,
  ['-m', 'uvicorn', 'app.main:app', '--app-dir', appDir, '--reload', '--host', '0.0.0.0', '--port', '8000'],
  { stdio: 'inherit', shell: false }
);

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (err) => {
  console.error('[dev:python] Failed to launch Python uvicorn service:', err.message);
  process.exit(1);
});

process.on('SIGINT', () => {
  child.kill('SIGINT');
});

process.on('SIGTERM', () => {
  child.kill('SIGTERM');
});
