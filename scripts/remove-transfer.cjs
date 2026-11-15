const fs=require('fs'),path=require('path');const root=process.argv[2]||'dist',file=path.join(root,'main.bundle.js');let s=fs.readFileSync(file,'utf8');
if(s.includes('ptas-export')){
 const handlerStart=s.indexOf('    $("#ptas-export").onclick =');const handlerEnd=s.indexOf('    $$("[data-bind]")',handlerStart);if(handlerStart<0||handlerEnd<0)throw Error('Transfer handlers not found');s=s.slice(0,handlerStart)+s.slice(handlerEnd);
 const bridgeStart=s.indexOf('            (window.__PTAS.exportRecording =');const bridgeEnd=s.indexOf('            (window.__PTAS.reset =',bridgeStart);if(bridgeStart<0||bridgeEnd<0)throw Error('Transfer bridge not found');s=s.slice(0,bridgeStart)+s.slice(bridgeEnd);
 s=s.replace(/<div class="ptas-row"><button id="ptas-export">.*?<\/div>/,'').replace(/<input id="ptas-import-file"[^>]*>/,'').replace('Pause freezes the simulation. Export writes frame,input .tas text; import supports .tas and legacy .ptas recordings.','Pause freezes the simulation.');
 s=s.replace(/^\s*\$\("#ptas-(?:export|import)"\),\r?\n/gm,'');
}
for(const term of ['ptas-export','ptas-import','window.__PTAS.exportRecording','window.__PTAS.exportTASText','window.__PTAS.importRecording','window.__PTAS.applyRecording','window.__PTAS.tasTextToRecording'])if(s.includes(term))throw Error('Transfer reference remains: '+term);
new Function(s);fs.writeFileSync(file,s);
const htmlFile=path.join(root,'index.html');let h=fs.readFileSync(htmlFile,'utf8');h=h.replace('change simulation speed, import or export recordings, and customize key bindings.','change simulation speed and customize key bindings.').replace(' Export recordings as backups.','');h=h.replace(/src="main\.bundle\.js(?:\?[^"]*)?"/,'src="main.bundle.js?v=no-transfer-20261115"');fs.writeFileSync(htmlFile,h);
console.log('Removed TAS import/export UI, file picker, handlers and exposed transfer methods.');

