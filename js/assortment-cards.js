// Presentation only: prices and product identifiers come from js/data.js.
const featuredCatalogCards={
 apples:{image:'apples-granat-new.png',description:'Яблоки для фруктовой тарелки, домашних пирогов и компотов.'},
 citrus:{image:'mandarins-granat-new.png',description:'Мандарины для фруктовой тарелки и небольшого перекуса.'},
 grapes:{image:'vinograd-bely-new.png',description:'Светлый виноград для фруктовой тарелки и подачи к столу.'},
 pink:{image:'vinograd-rozovy-new.png',description:'Розовый виноград для фруктовой тарелки и подачи к столу.'},
 melon:{image:'arbuz-new.png',description:'Арбуз для подачи ломтиками и приготовления фруктовых напитков.'}
};
window.renderFeaturedCatalogCard=(product,formatPrice)=>{
 const card=featuredCatalogCards[product.id];
 if(!card)return null;
 return `<article class="product product-featured"><img src="images/${card.image}" alt="${product.name}" loading="lazy"><div class="product-body"><span class="eyebrow">${product.category}</span><h2>${product.name}</h2><p class="product-description">${card.description}</p><div class="product-purchase"><div class="product-price"><strong>${formatPrice(product.price)}</strong><span> / ${product.unit}</span></div><button type="button" class="button add" data-add="${product.id}">В корзину</button></div></div><div class="product-benefits"><span>Покупка по ${product.unit}</span><span>Доставка по городу</span></div></article>`;
};
