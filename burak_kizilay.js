async function fetchProducts() {
  const response = await fetch("https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json");
  return response.json();
}

(async () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const ITEM_PER_VIEW = 3;
  let currentView = 0;

  let response;
  if (JSON.parse(localStorage.getItem("products")) === null) {
    response = await fetchData();
    localStorage.setItem("products", response);
  } else {
    response = localStorage.getItem("products");
  }
  const data = JSON.parse(response);

  const safeHTML = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  // Sayfayı temizle
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }

  // Ana container
  const app = document.createElement("div");
  app.style.cssText = `
    margin: 20px auto;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    
  `;

  // Başlık
  const title = document.createElement("h1");
  title.appendChild(
    document.createTextNode("Beğenebileceğinizi düşündüklerimiz")
  );
  title.style.cssText = `
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
    text-align: start;
    margin-bottom: 30px;
    uppercase: true;
  `;

  // Karuselവ

  // Karusel container
  const carousel = document.createElement("div");
  carousel.style.cssText = `
    position: relative;
    height: 350px;
    
    background: #e9ecef;
    border-radius: 8px;
    overflow-x: hidden;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 20px;
    padding: 0 50px;
  `;

  // Önceki düğme
  const prevButton = document.createElement("button");
  prevButton.textContent = "<";
  prevButton.style.cssText = `
    position: absolute;
    top: 50%;
    left: 0;
    width: 40px;
    height: 40px;
    background: #fef6eb;
    border: none;
    color: #f3940d;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
  `;
  carousel.appendChild(prevButton);

  // Sonraki düğme
  const nextButton = document.createElement("button");
  nextButton.textContent = ">";
  nextButton.style.cssText = `
    position: absolute;
    top: 50%;
    right: 0;
    width: 40px;
    height: 40px;
    background: #fef6eb;
    border: none;
    color: #f3940d;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
  `;
  carousel.appendChild(nextButton);

  // Karusel öğelerini render eden fonksiyon
  function renderItems() {
    // Mevcut öğeleri temizle (düğmeler hariç)
    Array.from(carousel.children).forEach((child) => {
      if (child !== prevButton && child !== nextButton) {
        carousel.removeChild(child);
      }
    });

    // Görünümdeki öğeleri al (splice yerine slice kullan)
    const carouselData = data.slice(currentView, currentView + ITEM_PER_VIEW);

    carouselData.forEach((item) => {
      const carouselItem = document.createElement("div");
      carouselItem.style.cssText = `
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

      const imgContainer = document.createElement("div");
      imgContainer.style.cssText = `
        position: relative;
        width: 100%;
        height: 150px;
        border: 1px solid #ced4da;
      `;

      const img = document.createElement("img");
      img.src = item.img;
      img.alt = item.name;
      img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      `;

      const favIcon = document.createElement("button");
      favIcon.style.cssText = `
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
      const isFavorite = favorites.includes(item.id);
      favIcon.innerHTML = `
        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="${
          isFavorite ? "#f3940d" : "none"
        }" viewBox="0 0 24 24">
          <path stroke="${
            isFavorite ? "#f3940d" : "#f3940d"
          }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
        </svg>
      `;

      favIcon.onclick = () => {
        const index = favorites.indexOf(item.id);
        if (index === -1) {
          favorites.push(item.id);
          favIcon.querySelector("svg").setAttribute("fill", "#f3940d");
          favIcon.querySelector("path").setAttribute("stroke", "#f3940d");
        } else {
          favorites.splice(index, 1);
          favIcon.querySelector("svg").setAttribute("fill", "none");
          favIcon.querySelector("path").setAttribute("stroke", "#f3940d");
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
      };

      const name = document.createElement("p");
      name.innerHTML = `<strong>${item.brand}</strong> - ${safeHTML(
        item.name.trim()
      )}`;
      name.style.cssText = `
        font-size: 12px;
        margin: 5px 0;
        color: #000000;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: start;
      `;

      const originalContainer = document.createElement("div");
      originalContainer.style.cssText = `
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: flex-start;
        align-items: center;
      `;

      const originalPrice = document.createElement("p");
      originalPrice.textContent = `${item.original_price} TL`;
      originalPrice.style.cssText = `
        text-align: start;
        text-decoration: line-through;
        color: #e74c3c;
        margin: 5px 0;
      `;

      if (item.original_price !== item.price) {
        const sale = document.createElement("p");
        sale.textContent = `%${(
          ((item.original_price - item.price) / item.original_price) *
          100
        ).toFixed(0)} İndirim`;
        sale.style.cssText = `
          text-align: start;
          color: #e74c3c;
          margin: 5px 0;
          font-weight: bold;
          font-size: 12px;
        `;
        originalContainer.appendChild(originalPrice);
        originalContainer.appendChild(sale);
      } else {
        originalContainer.appendChild(originalPrice);
      }

      const price = document.createElement("p");
      price.textContent = `${item.price} TL`;
      price.style.cssText = `
        text-align: start;
        font-weight: bold;
        color: #4bb788;
        margin: 5px 0;
      `;

      const link = document.createElement("a");
      link.href = item.url;
      link.textContent = "Ürüne Git";
      link.target = "_blank";
      link.style.cssText = `
        display: inline-block;
        padding: 5px 10px;
        background: #3498db;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-size: 12px;
      `;

      imgContainer.appendChild(img);
      imgContainer.appendChild(favIcon);
      carouselItem.appendChild(imgContainer);
      carouselItem.appendChild(name);
      carouselItem.appendChild(originalContainer);
      carouselItem.appendChild(price);
      carouselItem.appendChild(link);
      carousel.appendChild(carouselItem);
    });
  }

  // İlk render
  renderItems();

  // Düğme olayları
  prevButton.onclick = () => {
    if (currentView > 0) {
      currentView -= 1;
      renderItems();
    }
  };

  nextButton.onclick = () => {
    if (currentView + ITEM_PER_VIEW < data.length) {
      currentView += 1;
      renderItems();
    }
  };

  app.appendChild(title);
  app.appendChild(carousel);
  document.body.appendChild(app);
})();
