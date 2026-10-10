const page=document.body.dataset.page;
const links=[['index.html','Главная','home'],['assortment.html','Ассортимент и цены','catalog'],['contacts.html','Контакты','contacts'],['delivery.html','Доставка','delivery']];
const nav=()=>links.map(([url,text,key])=>`<a href="${url}" ${page===key?'aria-current="page"':''}>${text}</a>`).join('');
document.querySelector('header').innerHTML=`<div class="wrap header-row"><a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">✿</span> ГРАНАТ<span class="brand-note">ПРОДУКТЫ РЯДОМ С ДОМОМ</span></a><nav aria-label="Основная навигация">${nav()}</nav><a class="header-cart" href="delivery.html">Корзина <span id="cart-badge">0</span></a></div>`;
document.querySelector('footer').innerHTML=`<div class="wrap footer-grid"><div><a class="brand" href="index.html">ГРАНАТ</a><p>Свежие продукты рядом с домом.</p></div><div><strong>Заходите каждый день</strong><p>${shop.hours}</p><p>Барнаул, ул. Попова, 121А</p></div><nav aria-label="Навигация в подвале">${nav()}</nav></div><div class="wrap footer-bottom">Демонстрационный сайт торгового павильона. Заказы не отправляются.</div>`;
document.querySelectorAll('[data-info]').forEach(el=>el.textContent=shop[el.dataset.info]);
const money=n=>new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',maximumFractionDigits:0}).format(n);
let cart={};try {const saved=JSON.parse(localStorage.getItem('granat-cart')||'{}'); for(const p of products)if(Number.isSafeInteger(saved[p.id])&&saved[p.id]>0&&saved[p.id]<=999)cart[p.id]=saved[p.id];}catch{}
const notice='Цены на сайте представлены для демонстрации и могут отличаться. Актуальную стоимость уточняйте в магазине.';
const catalog=document.querySelector('#catalog');
if(catalog){
 const categories=['Все товары',...new Set(products.map(p=>p.category))];
 document.querySelector('#filters').innerHTML=categories.map((c,i)=>`<button type="button" class="filter ${i===0?'active':''}" aria-pressed="${i===0}" data-category="${c}">${c}</button>`).join('');
 const renderProducts=category=>{catalog.innerHTML=products.filter(p=>category==='Все товары'||p.category===category).map(p=>(page==='catalog'?window.renderFeaturedCatalogCard?.(p,money):null)||`<article class="product"><img src="images/${encodeURIComponent(p.image)}" alt="${['nuts','juice','tea'].includes(p.id)?'Общий вид ассортимента павильона':p.name}" loading="lazy"><div class="product-body"><span class="eyebrow">${p.category}</span><h2>${p.name}</h2>${['nuts','juice','tea'].includes(p.id)?'<small>Фото ассортимента магазина</small>':''}<div class="product-price"><strong>${money(p.price)}</strong><span> / ${p.unit}</span></div>${page==='delivery'?`<button class="button add" data-add="${p.id}">Добавить в корзину</button>`:''}</div></article>`).join('');};
 renderProducts('Все товары');
 document.querySelector('#filters').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;document.querySelectorAll('.filter').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});renderProducts(b.dataset.category)});
 catalog.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;const id=b.dataset.add;cart[id]=Math.min(999,(cart[id]||0)+1);updateCart();document.querySelector('#cart-status').textContent=`${products.find(p=>p.id===id).name}: добавлено в корзину.`});
}
function updateCart(){
 try{localStorage.setItem('granat-cart',JSON.stringify(cart))}catch{}
 const selected=products.filter(p=>cart[p.id]);let total=0;
 document.querySelector('#cart-badge').textContent=selected.length;
 const box=document.querySelector('#cart-items');if(!box)return;
 box.innerHTML=selected.length?selected.map(p=>{total+=p.price*cart[p.id];return `<div class="cart-item"><div><strong>${p.name}</strong><small>${money(p.price)} / ${p.unit}</small></div><div class="quantity"><button type="button" data-id="${p.id}" data-action="minus" aria-label="Уменьшить количество: ${p.name}">−</button><span>${cart[p.id]}</span><button type="button" data-id="${p.id}" data-action="plus" aria-label="Увеличить количество: ${p.name}">+</button></div><strong>${money(p.price*cart[p.id])}</strong><button type="button" class="remove" data-id="${p.id}" data-action="remove" aria-label="Удалить: ${p.name}">Удалить</button></div>`}).join(''):'<p class="empty-cart">В корзине пока пусто.<br>Выберите продукты в каталоге.</p>';
 document.querySelector('#positions').textContent=`Позиций: ${selected.length}`;
 document.querySelector('#total').textContent=money(total);
}
updateCart();
document.querySelector('#cart-items')?.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const id=b.dataset.id;if(b.dataset.action==='remove')delete cart[id];else if(b.dataset.action==='plus')cart[id]=Math.min(999,cart[id]+1);else if(--cart[id]<=0)delete cart[id];updateCart()});
const form=document.querySelector('#order-form');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const message=document.querySelector('#order-message');message.className='form-message';if(!Object.keys(cart).length){message.textContent='Добавьте хотя бы один товар в корзину.';return}if(!form.reportValidity())return;const digits=form.elements.phone.value.replace(/\D/g,'');if(digits.length<10||digits.length>15){message.textContent='Укажите корректный телефон: от 10 до 15 цифр.';form.elements.phone.focus();return}for(const name of ['name','address'])if(!form.elements[name].value.trim()){message.textContent='Заполните имя и адрес доставки.';form.elements[name].focus();return}message.classList.add('success');message.textContent='Спасибо! Заказ сформирован. Это демонстрационная версия сайта.'});form.addEventListener('input',()=>{document.querySelector('#order-message').textContent=''})}
