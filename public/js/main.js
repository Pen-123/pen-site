const archivesBtn = document.getElementById('archives-btn');
const archivesList = document.getElementById('archives-list');
const logContent = document.getElementById('log-content');


const repoOwner = 'Pen-123'; 
const repoName = 'pen-site';                
const logsPath = 'data/logs';               

archivesBtn.addEventListener('click', async () => {
  archivesList.innerHTML = 'Loading archives...';
  logContent.style.display = 'none';
  logContent.innerText = '';

  // For now, hardcoding file list — update with API later for dynamic
  const logFiles = ['raw-pen-logs-001.md'];

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
  logContent.style.display = 'block';
  logContent.innerText = 'Loading file content...';

  const url = `https://raw.githubusercontent.com/Pen-123/pen-site/main/data/logs/raw-pen-logs-001.md`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch file');
    const text = await res.text();
    logContent.innerText = text;
  } catch (e) {
    logContent.innerText = 'Error loading file: ' + e.message;
  }
}
