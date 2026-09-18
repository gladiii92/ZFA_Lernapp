const fs = require('fs');
const file = 'src/app/gallery/page.tsx';
if (!fs.existsSync(file)) process.exit(0);
let code = fs.readFileSync(file, 'utf8');
const anatomySvg = `<svg viewBox="0 0 400 600" className="w-full h-full drop-shadow-2xl">
  <defs>
    <linearGradient id="enamelGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="100%" stopColor="#e2e8f0" />
    </linearGradient>
  </defs>
  <rect x="20" y="300" width="360" height="280" fill={selectedAnatomyLayer === 'bone' ? '#fde047' : '#e2e8f0'} onClick={() => setSelectedAnatomyLayer('bone')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" rx="8" />
  <rect x="20" y="250" width="100" height="50" fill={selectedAnatomyLayer === 'gingiva' ? '#fb7185' : '#fca5a5'} onClick={() => setSelectedAnatomyLayer('gingiva')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" />
  <rect x="280" y="250" width="100" height="50" fill={selectedAnatomyLayer === 'gingiva' ? '#fb7185' : '#fca5a5'} onClick={() => setSelectedAnatomyLayer('gingiva')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" />
  <rect x="110" y="290" width="180" height="280" fill={selectedAnatomyLayer === 'desmodont' ? '#a3e635' : '#bef264'} onClick={() => setSelectedAnatomyLayer('desmodont')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" />
  <rect x="120" y="290" width="160" height="270" fill={selectedAnatomyLayer === 'cementum' ? '#f59e0b' : '#fcd34d'} onClick={() => setSelectedAnatomyLayer('cementum')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" />
  <rect x="130" y="100" width="140" height="450" fill="#fef08a" stroke={selectedAnatomyLayer === 'dentin' ? '#ca8a04' : 'transparent'} strokeWidth="4" onClick={() => setSelectedAnatomyLayer('dentin')} className="cursor-pointer transition-all duration-300 hover:brightness-95" />
  <rect x="170" y="130" width="60" height="400" fill={selectedAnatomyLayer === 'pulp' ? '#ef4444' : '#f87171'} onClick={() => setSelectedAnatomyLayer('pulp')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" rx="20" />
  <rect x="130" y="20" width="140" height="80" fill="url(#enamelGrad)" stroke={selectedAnatomyLayer === 'enamel' ? '#38bdf8' : '#cbd5e1'} strokeWidth="4" onClick={() => setSelectedAnatomyLayer('enamel')} className="cursor-pointer transition-all duration-300 hover:brightness-95" rx="8" />
</svg>`;
const paroSvg = `<svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
  <rect x="40" y="200" width="320" height="180" fill={selectedParoPart === 'bone' ? '#fde047' : '#e2e8f0'} onClick={() => setSelectedParoPart('bone')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" rx="8" />
  <rect x="40" y="150" width="100" height="50" fill={selectedParoPart === 'gingiva' ? '#fb7185' : '#fca5a5'} onClick={() => setSelectedParoPart('gingiva')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" />
  <rect x="260" y="150" width="100" height="50" fill={selectedParoPart === 'gingiva' ? '#fb7185' : '#fca5a5'} onClick={() => setSelectedParoPart('gingiva')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" />
  <rect x="130" y="190" width="140" height="180" fill={selectedParoPart === 'desmodont' ? '#a3e635' : '#bef264'} onClick={() => setSelectedParoPart('desmodont')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" />
  <path d="M130,220 L150,230 M130,260 L150,270 M130,300 L150,310 M270,220 L250,230 M270,260 L250,270 M270,300 L250,310" stroke="#4d7c0f" strokeWidth="4" className="pointer-events-none" />
  <rect x="150" y="190" width="100" height="170" fill={selectedParoPart === 'cementum' ? '#d97706' : '#fcd34d'} onClick={() => setSelectedParoPart('cementum')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" />
  <rect x="160" y="40" width="80" height="300" fill="#fef08a" className="pointer-events-none" />
</svg>`;
let idxAna = code.indexOf('Anatomie');
if (idxAna !== -1) {
  let start = code.indexOf('<svg', idxAna);
  let end = code.indexOf('</svg>', start);
  if (start !== -1 && end !== -1) {
    code = code.substring(0, start) + anatomySvg + code.substring(end + 6);
  }
}
let idxParo = code.indexOf('Haltegewebe');
if (idxParo !== -1) {
  let start = code.indexOf('<svg', idxParo);
  let end = code.indexOf('</svg>', start);
  if (start !== -1 && end !== -1) {
    code = code.substring(0, start) + paroSvg + code.substring(end + 6);
  }
}
fs.writeFileSync(file, code);
console.log('Block-Design SVGs successfully injected.');
