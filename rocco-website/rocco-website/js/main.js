const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const root=document.documentElement,icon=$('#themeIcon');
function setTheme(t){root.classList.toggle('dark',t==='dark');icon.textContent=t==='dark'?'☾':'☀';try{localStorage.theme=t}catch(e){}}
let t='dark';try{t=localStorage.theme||'dark'}catch(e){}setTheme(t);
$('#theme').onclick=()=>setTheme(root.classList.contains('dark')?'light':'dark');
const menu=$('#mobileMenu');$('#burger').onclick=()=>menu.classList.toggle('hidden');
$$('[data-nav]').forEach(a=>{if(a.dataset.nav===document.body.dataset.page)a.classList.add('act')});
$('#yr').textContent=new Date().getFullYear();
// scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4)*80+'ms';io.observe(el)});
// cursor glow
const c=$('#cursor');addEventListener('pointermove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'});
// hero letters
const h=$('#letters');if(h){[...h.textContent].forEach((ch,i)=>{const s=document.createElement('span');s.className='letter';s.textContent=ch;s.style.setProperty('--i',i);s.style.animationDelay=(.2+i*.09)+'s';h.appendChild(s)});h.firstChild.remove?.()}
// video sound
//const v=$('#heroVideo'),m=$('#mute');if(m)m.onclick=()=>{v.muted=!v.muted;m.textContent=v.muted?'🔇':'🔊'};
// tabs
$$('.tab').forEach(b=>b.onclick=()=>{$$('.tab').forEach(x=>x.classList.toggle('tab-on',x===b));$$('.panel').forEach(p=>p.classList.toggle('hidden',p.id!=='panel-'+b.dataset.tab))});
// lightbox
const lb=$('#lb'),li=$('#lbImg');$$('.g').forEach(i=>i.onclick=()=>{li.src=i.src;li.alt=i.alt;lb.classList.remove('hidden')});
lb.onclick=e=>{if(e.target!==li)lb.classList.add('hidden')};addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.add('hidden')});
// booking form (opens email app; swap for Formspree/EmailJS to send directly)
const f=$('#booking');if(f)f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));
 const b=`Name: ${d.name}%0D%0AEmail: ${d.email}%0D%0ADate: ${d.date}%0D%0ANeed: ${d.service}%0D%0A%0D%0A${encodeURIComponent(d.message)}`;
 location.href=`mailto:booking@example.com?subject=${encodeURIComponent('Booking request from '+d.name)}&body=${b}`;$('#formNote').textContent='Opening your email app to send the request.'};


 // Video autoplay + sound toggle
window.addEventListener("load", async () => {
    const v = $('#heroVideo');
    const m = $('#mute');

    if (!v) return;

    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.src = "./video/v1.mp4";

    // Update mute button icon
    const updateMuteButton = () => {
        if (m) m.textContent = v.muted ? '🔇' : '🔊';
    };

    // Autoplay muted
    try {
        await v.play();
        console.log("Video autoplaying successfully");
    } catch (error) {
        console.error("Autoplay failed:", error);
    }

    updateMuteButton();

    // Toggle sound when clicking the video
    v.addEventListener("click", async () => {
        v.muted = !v.muted;
        updateMuteButton();

        try {
            await v.play();
        } catch (error) {
            console.error("Playback failed:", error);
        }
    });

    // Toggle sound when clicking the mute button
    if (m) {
        m.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();

            v.muted = !v.muted;
            updateMuteButton();

            try {
                await v.play();
            } catch (error) {
                console.error("Playback failed:", error);
            }
        });
    }
});
