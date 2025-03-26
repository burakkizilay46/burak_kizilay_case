const safeHTML = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

async function fetchProducts() {
  const response = await fetch(
    "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
  );
  return response.json();
}

function createProductCard(product, favorites) {
  const card = document.createElement("div");
  card.style.cssText = `
      width: 160px;
      height: 90%;
      border: 1px solid #ced4da;
      border-radius: 8px;
      text-align: center;
      padding: 10px;
      flex-shrink: 0;
      background: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;

  const img = document.createElement("img");
  img.src = product.img;
  img.style.height = "150px";
  img.style.objectFit = "cover";

  const favBtn = document.createElement("button");
  favBtn.style.cssText = `
          position: absolute;
          top: 4px;
          right: 4px;
          width: 30px;
          height: 30px;
          background: white;
          color: #f3940d;
          border: 1px solid #ced4da;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          z-index: 1;
        `;
  favBtn.innerHTML = `
      <svg width="24" height="24" fill="${
        favorites.includes(product.id) ? "red" : "none"
      }" viewBox="0 0 24 24">
        <path stroke="${
          favorites.includes(product.id) ? "red" : "orange"
        }" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
      </svg>
    `;
  favBtn.onclick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const index = favorites.indexOf(product.id);

    if (index === -1) {
      favorites.push(product.id);
      favBtn.querySelector("svg").setAttribute("fill", "red");
      favBtn.querySelector("path").setAttribute("stroke", "red");
    } else {
      favorites.splice(index, 1);
      favBtn.querySelector("svg").setAttribute("fill", "none");
      favBtn.querySelector("path").setAttribute("stroke", "orange");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const imgContainer = document.createElement("div");
  imgContainer.style.cssText = `
      position: relative;
      width: 100%;
      height: 150px;
      border: 1px solid #ced4da;
      margin-bottom: 10px;
    `;
  imgContainer.appendChild(img);
  imgContainer.appendChild(favBtn);

  const productName = document.createElement("p");
  productName.style.cssText = `
    font-size: 14px;
    color: black;
    margin: 0;
    text-align: start;
  `;

  const brandSpan = document.createElement("span");
  brandSpan.textContent = product.brand + " ";
  brandSpan.style.fontWeight = "bold";

  const nameSpan = document.createElement("span");
  nameSpan.textContent = product.name;
  nameSpan.style.fontWeight = "normal";

  productName.appendChild(brandSpan);
  productName.appendChild(nameSpan);

  const originalPrice = document.createElement("p");
  originalPrice.style.cssText = `
    text-decoration: line-through;
    color: #6c757d;
    font-weight: bold;
    margin: 0;
  `;
  originalPrice.textContent = `${product.original_price} TL`;

  const discountPercentage = Math.round(
    ((product.original_price - product.price) / product.original_price) * 100
  );

  const sale = document.createElement("span");
  sale.textContent = `%${discountPercentage}`;
  sale.style.cssText = `
    color: white;
    background-color: #00a365;
    border-radius: 4px;
    padding: 2px 4px;
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
  `;

  const saleContainer = document.createElement("div");
  saleContainer.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 4px;
  `;
  saleContainer.appendChild(originalPrice);
  saleContainer.appendChild(sale);

  const price = document.createElement("p");
  price.textContent = `${product.price} TL`;

  if (product.original_price <= product.price) {
    saleContainer.style.display = "none";
  }

  const info = document.createElement("div");
  info.style.cssText = `
      text-align: start;
      color:black;
      display: flex;
      flex-direction: column;
      gap: 5px;
    `;
  info.append(saleContainer, price);

  card.append(imgContainer, productName, info);
  return card;
}

(async function () {
  document.body.innerHTML = "";

  const container = document.createElement("div");
  container.style.cssText = `
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 10px;
      font-family: Arial;
    `;

  const title = document.createElement("h1");
  title.textContent = "Beğenebileceğinizi Düşündüklerimiz";
  title.style.cssText = `
      font-size: 24px;
      text-align: start;
      font-weight: bold;
    `;
  title.style.marginBottom = "20px";
  title.style.color = "black";

  const carouselContainer = document.createElement("div");
  carouselContainer.style.cssText = `
      position: relative;
      display: flex;
      gap: 15px;
      overflow-x: auto;
      padding: 10px;
      justify-content: center;
    `;

  const carousel = document.createElement("div");
  carousel.style.cssText = `
      display: flex;
      gap: 15px;
      padding: 10px;
      width: 100%;
      justify-content: center;
    `;

  const buttonStyles = `
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 40px;
      height: 40px;
      background: #fef6eb;
      border: none;
      color: #f3940d;
      border-radius: 50%;
      display: flex;
      font-weight: bold;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 10;
  `;

  const nextButton = document.createElement("button");
  nextButton.textContent = ">";
  nextButton.style.cssText = buttonStyles + " right: 0;";

  const prevButton = document.createElement("button");
  prevButton.textContent = "<";
  prevButton.style.cssText = buttonStyles + " left: 0;";

  let products = [];
  let currentView = 0;
  const PRODUCT_PER_PAGE = 3;

  function updateCarouselView() {
    carousel.innerHTML = "";
    const startIndex = currentView * PRODUCT_PER_PAGE;
    const endIndex = startIndex + PRODUCT_PER_PAGE;
    const visibleProducts = products.slice(startIndex, endIndex);

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    visibleProducts.forEach((product) => {
      carousel.appendChild(createProductCard(product, favorites));
    });

    prevButton.disabled = currentView === 0;
    nextButton.disabled = endIndex >= products.length;
  }

  try {
    const storedProducts = localStorage.getItem("products");
    if (JSON.parse(localStorage.getItem("products")) === null) {
      products = JSON.parse(storedProducts);
    } else {
      products = await fetchProducts();
      localStorage.setItem("products", JSON.stringify(products));
    }
    updateCarouselView();

    nextButton.onclick = () => {
      currentView++;
      updateCarouselView();
    };

    prevButton.onclick = () => {
      currentView--;
      updateCarouselView();
    };
  } catch (error) {
    console.error("Ürünler yüklenemedi:", error);
    carousel.innerHTML = "<p>Ürünler yüklenirken hata oluştu</p>";
  }

  carouselContainer.appendChild(carousel);
  carouselContainer.appendChild(prevButton);
  carouselContainer.appendChild(nextButton);
  container.append(title, carouselContainer);
  document.body.appendChild(container);
})();
