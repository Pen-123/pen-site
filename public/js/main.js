const archivesBtn = document.getElementById('archives-btn');
const archivesList = document.getElementById('archives-list');
const logContent = document.getElementById('log-content');

const repoOwner = 'Pen-123'; 
const repoName = 'pen-site';                
const logsPath = 'data/logs';               

let currentOpenFile = null; // Track which file is open

archivesBtn.addEventListener('click', async () => {
  archivesList.innerHTML = 'Loading archives...';
  logContent.style.display = 'none';
  logContent.innerText = '';

  // Now listing TWO log files
  const logFiles = ['raw-pen-logs-001.md', 'raw-pen-logs-002.md'];

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
    // Close if same file clicked
    logContent.style.display = 'none';
    logContent.innerText = '';
    currentOpenFile = null;
    return;
  }

  currentOpenFile = filename;
  logContent.style.display = 'block';
  logContent.innerText = 'Loading file content...';

  // Dynamic URL based on clicked filename
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
