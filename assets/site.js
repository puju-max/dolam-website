
const navToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(navToggle){navToggle.addEventListener('click',()=>nav.classList.toggle('open'))}
document.querySelectorAll('.nav-wrap>button').forEach(btn=>{
  btn.addEventListener('click',e=>{
    e.stopPropagation();
    const w=btn.parentElement;
    document.querySelectorAll('.nav-wrap').forEach(x=>x!==w&&x.classList.remove('open'));
    w.classList.toggle('open');
  })
});
document.addEventListener('click',()=>document.querySelectorAll('.nav-wrap').forEach(x=>x.classList.remove('open')));

const explorerData={
 chem:{
  "Surface Care":["Surface Care","Daily and periodic chemistry for hard surfaces, selected around soil type, material compatibility and operational routine.","assets/surface-care.jpg","Cleaner wiping down a stone countertop"],
  "Floor Care":["Floor Care","A floor-care plan starts with surface type, traffic level, finish requirements and the cleaning method in use."],
  "Washroom Hygiene":["Washroom Hygiene","Build a routine around touchpoints, scale, odour control and user experience."],
  "Kitchen & Foodservice":["Kitchen & Foodservice","Match products to grease load, food-contact considerations and cleaning frequency."],
  "Specialist Applications":["Specialist Applications","Specialist tasks need a defined process, compatibility check and controlled use."]
 },
 supply:{
  "Paper & Tissue":["Paper & Tissue","Plan for consumption, storage, user volume and replenishment intervals."],
  "Dispensers":["Dispensers","Choose formats that support consistent dosing, simple maintenance and a coherent environment."],
  "Waste Management":["Waste Management","Consider stream separation, capacity, placement and collection workflow."],
  "Cleaning Accessories":["Cleaning Accessories","Build a practical system of tools around task, surface and hygiene zoning."],
  "Personal Protection":["Personal Protection","Select appropriate protective essentials based on workplace risk assessment and policy."]
 }
};
document.querySelectorAll('[data-explorer]').forEach(ex=>{
 const type=ex.dataset.explorer, title=ex.querySelector('[data-title]'), copy=ex.querySelector('[data-copy]'), media=ex.querySelector('[data-media]');
 ex.querySelectorAll('button[data-key]').forEach(btn=>btn.addEventListener('click',()=>{
   ex.querySelectorAll('button[data-key]').forEach(x=>x.classList.remove('active'));
   btn.classList.add('active');
   const d=explorerData[type][btn.dataset.key]; title.textContent=d[0]; copy.textContent=d[1];
   if(media){ media.hidden=!d[2]; if(d[2]){ const img=media.querySelector('img'); img.src=d[2]; img.alt=d[3]||''; } }
 }))
});

const hotspotCopy=[
 "Application fit — match the machine to floor type, area, access and cleaning objective.",
 "Operator experience — manoeuvrability, ergonomics and training shape everyday performance.",
 "Ownership — maintenance access, consumables and service planning matter across the lifecycle."
];
document.querySelectorAll('.hotspot').forEach(btn=>btn.addEventListener('click',()=>{
 const t=document.querySelector('[data-hotspot-copy]'); if(t)t.textContent=hotspotCopy[+btn.dataset.i];
}));

const products=[...document.querySelectorAll('.product-card')];
const search=document.querySelector('#catalogSearch'), filter=document.querySelector('#catalogFilter');
function applyCatalog(){
 const q=(search?.value||'').toLowerCase(), f=filter?.value||'all';
 products.forEach(p=>{
   const okQ=p.textContent.toLowerCase().includes(q);
   const okF=f==='all'||p.dataset.division===f;
   p.style.display=okQ&&okF?'block':'none';
 })
}
if(search)search.addEventListener('input',applyCatalog);
if(filter)filter.addEventListener('change',applyCatalog);

const industries={
 commercial:["Commercial & Offices","Create consistent, presentable workplaces with routines built around occupancy, shared touchpoints and daily use.","https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&w=1200"],
 healthcare:["Healthcare","Support controlled hygiene workflows around high-touch surfaces, zoning and clearly defined procedures.","https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&w=1200"],
 hospitality:["Hospitality","Balance guest experience, turnaround speed and detail across rooms and public areas.","https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&w=1200"],
 industrial:["Industrial","Plan around soil load, equipment, safety requirements and demanding working environments.","https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&w=1200"],
 education:["Education","Build practical routines around high occupancy, shared spaces and daily reset cycles.","https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&w=1200"],
 foodservice:["Foodservice","Coordinate cleaning around food preparation, grease control, surfaces and operational downtime.","https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&w=1200"]
};
document.querySelectorAll('[data-industry]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('[data-industry]').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
 const d=industries[btn.dataset.industry];
 document.querySelector('[data-industry-title]').textContent=d[0];
 document.querySelector('[data-industry-copy]').textContent=d[1];
 document.querySelector('[data-industry-image]').src=d[2];
}));

const slides=[...document.querySelectorAll('.slide')];
if(slides.length){let i=0; setInterval(()=>{slides[i].classList.remove('active'); i=(i+1)%slides.length; slides[i].classList.add('active')},3600)}

const finderA=document.querySelector('#finderA'), finderB=document.querySelector('#finderB'), finderOut=document.querySelector('#finderOut');
if(finderA&&finderB&&finderOut){
 const update=()=>finderOut.textContent=`Suggested direction: start with ${finderA.value.toLowerCase()} requirements and prioritise ${finderB.value.toLowerCase()}. A DOLAM specialist can then narrow the equipment family.`;
 finderA.addEventListener('change',update); finderB.addEventListener('change',update); update();
}
const demoForm=document.querySelector('#quoteForm');
if(demoForm)demoForm.addEventListener('submit',e=>{e.preventDefault(); document.querySelector('#formStatus').textContent='Preview only — this form is not connected to a live submission service yet.'});
