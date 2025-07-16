const archivesBtn = document.getElementById('archives-btn');
const archivesList = document.getElementById('archives-list');
const logContent = document.getElementById('log-content');

const repoOwner = 'Pen-123'; 
const repoName = 'pen-site';                
const logsPath = 'data/logs';               

let currentOpenFile = null; // Track open log file
let archivesVisible = false; // Track archives list visibility

archivesBtn.addEventListener('click', async () => {
  if (archivesVisible) {
    // Hide archives list & any open log content
    archivesList.innerHTML = '';
    logContent.style.display = 'none';
    logContent.innerText = '';
    archivesVisible = false;
    currentOpenFile = null;
    return;
  }

  archivesVisible = true;
  archivesList.innerHTML = 'Loading archives...';
  logContent.style.display = 'none';
  logContent.innerText = '';

  const logFiles = ['raw-pen-logs-001.md', 'raw-pen-logs-002.md', 'raw-pen-logs-003.md', 'raw-pen-logs-004.md'];

  archivesList.innerHTML = '';
  logFiles.forEach(file => {
    const btn = document.createElement('button');
    btn.innerText = file;
    btn.className = 'log-file-btn';
    btn.addEventListener('click', () => loadLogFile(file));
    archivesList.appendChild(btn);
  });
});

async function loadLogFile(filename) {
  if (currentOpenFile === filename) {
    // Close log content if same file clicked
    logContent.style.display = 'none';
    logContent.innerText = '';
    currentOpenFile = null;
    return;
  }

  currentOpenFile = filename;
  logContent.style.display = 'block';
  logContent.innerText = 'Loading file content...';

  const url = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${logsPath}/${filename}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch file');
    const text = await res.text();
    logContent.innerText = text;
  } catch (e) {
    logContent.innerText = 'Error loading file: ' + e.message;
  }
}
