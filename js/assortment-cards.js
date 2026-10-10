// Presentation only: prices and product identifiers come from js/data.js.
const featuredCatalogCards={
 apples:{image:'apples-granat-new.png',description:'Яблоки для фруктовой тарелки, домашних пирогов и компотов.'},
 citrus:{image:'mandarins-granat-new.png',description:'Мандарины для фруктовой тарелки и небольшого перекуса.'},
 grapes:{image:'vinograd-bely-new.png',description:'Светлый виноград для фруктовой тарелки и подачи к столу.'},
 pink:{image:'vinograd-rozovy-new.png',description:'Розовый виноград для фруктовой тарелки и подачи к столу.'},
 melon:{image:'arbuz-new.png',description:'Арбуз для подачи ломтиками и приготовления фруктовых напитков.'}
};
window.renderFeaturedCatalogCard=(product,formatPrice)=>{
 const descriptions={potatoes:'Для гарниров и домашних блюд.',candy:'Сладости к чаю и кофе.',nuts:'Для перекуса и подачи к столу.',juice:'Напиток для подачи к столу.',tea:'Для чаепития дома.'};
 const card=featuredCatalogCards[product.id]||{image:product.image,description:descriptions[product.id]||product.category};
 return `<article class="product product-featured"><img src="images/${card.image}" alt="${product.name}" loading="lazy"><div class="product-body"><span class="eyebrow">${product.category}</span><h2>${product.name}</h2><p class="product-description">${card.description}</p>${['nuts','juice','tea'].includes(product.id)?'<small>Фото ассортимента магазина</small>':''}<div class="product-purchase"><div class="product-price"><strong>${formatPrice(product.price)}</strong><span> / ${product.unit}</span></div></div></div><div class="product-benefits"><span>Покупка по ${product.unit}</span><span>Доставка по городу</span></div></article>`;
};
