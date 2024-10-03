let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let paragraphs = [
  {
    id: "paragraph1",
    content: "VEGETABLES",
   
  },
  {
    id: "paragraph2",
    content: "FRUITS",
   
  },
  {
    id: "paragraph3",
    content: "Dairy&Poultry",
   
  },

  {
    id: "paragraph4",
    content: "Drinks & Snacks",
    
  },
  {
    id: "paragraph5",
    content: "Spices&Lentils&Flour",
   
  },
  
  // Add more paragraphs with their respective IDs, content, and links
];

let generateShop = () => {
  let shopHTML = '';
  let paragraphIndex = 0;

  for (let i = 0; i < shopItemsData.length; i++) {
    let { id, name, price, desc, img } = shopItemsData[i];
    let search = basket.find((x) => x.id === id) || [];

    if (i % 15 === 0) {
      let paragraph = paragraphs[paragraphIndex];
      shopHTML += `<p id="${paragraph.id}">${paragraph.content}</p>`;
      paragraphIndex = (paragraphIndex + 1) % paragraphs.length;
    }

    shopHTML += `
      <div id="product-id-${id}" class="item">
        <img width="220" src="${img}" alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id="${id}" class="quantity">
                ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  shop.innerHTML = shopHTML;
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
