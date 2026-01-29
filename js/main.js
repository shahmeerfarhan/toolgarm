const tools=[{id:'uuid',title:'UUID Generator',desc:'Generate unique IDs',icon:'fa-fingerprint'},{id:'json-minifier',title:'JSON Minifier',desc:'Remove whitespace from JSON',icon:'fa-compress-alt'},{id:'base64',title:'Base64 Encoder/Decoder',desc:'Encode/decode Base64 strings',icon:'fa-lock'},{id:'url-encoder',title:'URL Encoder/Decoder',desc:'Encode/decode URL strings',icon:'fa-link'},{id:'sha256',title:'SHA-256 Hasher',desc:'Generate SHA-256 hash',icon:'fa-hashtag'},{id:'epoch',title:'Unix Epoch Converter',desc:'Convert timestamps to dates',icon:'fa-clock'},{id:'html-entity',title:'HTML Entity Encoder',desc:'Encode/decode HTML entities',icon:'fa-code'},{id:'utf8',title:'UTF-8 Validator',desc:'Validate UTF-8 encoding',icon:'fa-language'},{id:'crc32',title:'CRC32 Checksum',desc:'Calculate CRC32 checksums',icon:'fa-file-contract'},{id:'case-normalizer',title:'Case Normalizer',desc:'Convert text case formats',icon:'fa-text-height'}];function searchTools(e,t){const o=e.toLowerCase().trim();if(!o){document.getElementById(t).style.display='none';return;}const n=document.getElementById(t);const r=tools.filter(e=>e.title.toLowerCase().includes(o)||e.desc.toLowerCase().includes(o));n.innerHTML='';if(r.length===0){n.innerHTML='<div class="result-item">No tools found</div>';}else{r.forEach(e=>{const o=document.createElement('div');o.className='result-item';o.innerHTML=`<div style="font-weight:600;">${e.title}</div><div style="font-size:0.9em;color:rgba(255,255,255,0.6);margin-top:4px;">${e.desc}</div>`;o.onclick=()=>{window.location.href=`tools/${e.id}.html`;};n.appendChild(o);});}n.style.display='block';}function copyToClipboard(e,t){navigator.clipboard.writeText(e).then(()=>{const o=t.innerHTML;t.innerHTML='<i class="fas fa-check"></i> Copied!';t.classList.add('copied');setTimeout(()=>{t.innerHTML=o;t.classList.remove('copied');},2000);});}document.addEventListener('DOMContentLoaded',()=>{const e=document.getElementById('nav-search');if(e){e.addEventListener('input',function(){searchTools(this.value,'search-results');});}document.addEventListener('click',function(e){if(!e.target.closest('.search')){const t=document.getElementById('search-results');if(t)t.style.display='none';}})document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.querySelector('.back-btn');
    const logoLink = document.querySelector('.logo a');
    const currentPath = window.location.pathname;
    
    // LOGO LINK: Always goes to homepage from tool pages
    if(logoLink && currentPath.includes('/tools/')) {
        logoLink.href = '../index.html';
    }
    
    // BACK BUTTON: Different behavior based on page
    if(backBtn) {
        if(currentPath.includes('/tools/')) {
            // On tool pages: Back to Tools list
            backBtn.href = '../tools.html';
            // Optional: Update text if needed
            backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Tools';
        } else if(currentPath.endsWith('tools.html')) {
            // On tools.html page: Back to Home
            backBtn.href = './index.html';
            // Optional: Update text if needed
            backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Home';
        }
    }
});
