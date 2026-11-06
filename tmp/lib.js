window.__sleep=ms=>new Promise(r=>setTimeout(r,ms));
window.__fire=(el)=>{const r=el.getBoundingClientRect();const o={bubbles:true,cancelable:true,clientX:r.x+r.width/2,clientY:r.y+r.height/2,view:window};['pointerover','mouseover','pointerdown','mousedown','pointerup','mouseup','click'].forEach(t=>el.dispatchEvent(new (t.startsWith('pointer')?PointerEvent:MouseEvent)(t,o)));};
window.__tops=()=>[...document.querySelectorAll('.module-wrapper.js-draggable-module')].filter(w=>!w.parentElement.closest('.module-wrapper'));
window.__pg=()=>Object.values(window.vuexStore.state.pages).find(x=>x&&x.modules&&x.modules.order&&x.modules.order.length>30);
window.__ord=()=>__pg().modules.order;
window.__k=()=>innerWidth/800;
window.__frame=(el)=>{const r=el.getBoundingClientRect();const k=__k();return [Math.round((r.x+r.width/2)/k),Math.round((r.y+r.height/2)/k)];};
if(!window.__origClick){window.__origClick=HTMLInputElement.prototype.click; HTMLInputElement.prototype.click=function(){ if(this.type==='file'&&window.__files&&window.__files.length){const dt=new DataTransfer(); window.__files.forEach(f=>dt.items.add(f)); this.files=dt.files; window.__files=null; this.dispatchEvent(new Event('change',{bubbles:true})); return;} return window.__origClick.call(this);};}
window.__getFiles=async(paths)=>Promise.all(paths.map(async p=>{const b=await fetch('https://live.staticflickr.com/'+p).then(r=>r.blob()); return new File([b],'visite_'+p.split('/').pop(),{type:'image/jpeg'});}));
window.__V2=Object.fromEntries((window.__V||[]).map(v=>[v.k,v]));
// prepare insertion before module with id `id`: scroll its separator button to viewport center
window.__prep=async(id,paths)=>{document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));const i=__ord().indexOf(id);const w=__tops()[i];const b=w.querySelector('.js-insert-content-popout-button');b.scrollIntoView({block:'center'});await __sleep(400);if(paths)window.__files=await __getFiles(paths);return __frame(b);};
window.__pick=async(label,wait=2500)=>{const n0=__ord().length;const it=[...document.querySelectorAll('li')].find(e=>e.offsetParent&&e.innerText.trim()===label);if(!it)return 'nomenu';it.click();for(let j=0;j<30&&__ord().length===n0;j++)await __sleep(200);await __sleep(wait);return [n0,__ord().length,window.__files===null];};
window.__ck=(w)=>Object.values(CKEDITOR.instances).find(e=>w.contains(e.element.$));
// set html in text module just before module id, scroll it to center; returns frame coords
window.__setTextBefore=async(id,html)=>{let ed;for(let j=0;j<15;j++){const i=__ord().indexOf(id);ed=__ck(__tops()[i-1]);if(ed)break;await __sleep(400);}if(!ed)return 'noed';ed.setData(html);await __sleep(500);const i=__ord().indexOf(id);const w=__tops()[i-1];w.scrollIntoView({block:'center'});await __sleep(400);return __frame(w);};
window.__setTextAt=async(idx,html)=>{const w=__tops()[idx];const ed=__ck(w);if(!ed)return 'noed';ed.setData(html);await __sleep(500);w.scrollIntoView({block:'center'});await __sleep(400);return __frame(w);};
