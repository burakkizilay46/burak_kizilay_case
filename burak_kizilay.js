const data = [
  {
    id: 1,
    brand: "HelloBaby",
    name: " Yenidoğan 6lı Ağız Mendili 24x24cm Unisex ",
    url: "https://www.e-bebek.com/hellobaby-yenidogan-6li-agiz-mendili-24x24cm-unisex-p-24ghlbumnd007001",
    img: "https://cdn05.e-bebek.com/mnresize/300/300/media/p/organik-6li-agiz-mendili-24x24-cm_8682766103779_01.jpg",
    price: 89.99,
    original_price: 89.99,
  },
  {
    id: 2,
    brand: "HelloBaby",
    name: " Unisex Beyaz Body Ribana Kumaş Çıtçıtlı Zıbın Zarf Yaka Kısa Kol",
    url: "https://www.e-bebek.com/hellobaby-unisex-beyaz-body-ribana-kumas-citcitli-zibin-zarf-yaka-kisa-kol-beyaz-p-24ghlbubdy010002",
    img: "https://cdn05.e-bebek.com/mnresize/300/300/media/p/a_8682766438970_01.jpg",
    price: 69.99,
    original_price: 69.99,
  },
  {
    id: 3,
    brand: "HelloBaby",
    name: "Unisex Beyaz Body Ribana Kumaş Çıtçıtlı Zıbın Bisiklet Yaka Atlet Kol",
    url: "https://www.e-bebek.com/hellobaby-unisex-beyaz-body-ribana-kumas-citcitli-zibin-bisiklet-yaka-atlet-kol-beyaz-p-24ghlbubdy002008",
    img: "https://cdn05.e-bebek.com/mnresize/300/300/media/p/abcdeefff_8682766439298_01.jpg",
    price: 69.99,
    original_price: 69.99,
  },
  {
    id: 4,
    brand: "HelloBaby",
    name: "Yenidoğan Müslin Ağız Mendili Unisex",
    url: "https://www.e-bebek.com/hellobaby-yenidogan-muslin-agiz-mendili-unisex-p-24ghlbumnd003003",
    img: "https://cdn05.e-bebek.com/mnresize/300/300/media/p/yenidogan-muslin-agiz-mendili-unisex_8682766728736_01.jpg",
    price: 89.99,
    original_price: 89.99,
  },
  {
    id: 5,
    brand: "Aziz Bebe",
    name: "Yenidoğan Süzene Nakışlı 5li Askı Hastane Çıkışı",
    url: "https://www.e-bebek.com/aziz-bebe-yenidogan-suzene-nakisli-5li-aski-hastane-cikisi-p-24yazzeset001001",
    img: "https://cdn05.e-bebek.com/mnresize/300/300/media/p/24y-little-life-yenidogan-suzene-nakisli-5li-aski-hastane-cikisi-erkek-bebek_8682766693195_01.jpg",
    price: 399.99,
    original_price: 479.99,
  },
  {
    id: 6,
    brand: "HelloBaby",
    name: "Kız Bebek Sweatshirt Şardonlu Çiçek Desenli Bisiklet Yaka Uzun Kol",
    url: "https://www.e-bebek.com/hellobaby-kiz-bebek-sweatshirt-sardonlu-cicek-desenli-bisiklet-yaka-uzun-kol-desenli-p-24khlbkswt008004",
    img: "https://cdn05.e-bebek.com/mnresize/300/300/media/p/basic-az-sardonlu-cicek-desenli-sweatshirt-kiz-bebek_8682766731644_01.jpg",
    price: 99.99,
    original_price: 199.99,
  },
  {
    id: 7,
    brand: "HelloBaby",
    name: "Unisex Beyaz Body Ribana Kumaş Çıtçıtlı Zıbın Bisiket Yaka İp Askılı",
    url: "https://www.e-bebek.com/hellobaby-unisex-beyaz-body-ribana-kumas-citcitli-zibin-bisiket-yaka-ip-askili-beyaz-p-24ghlbubdy009008",
    img: "https://cdn05.e-bebek.com/mnresize/300/300/media/p/a_8682766616361_01.jpg",
    price: 69.99,
    original_price: 69.99,
  },
  {
    id: 8,
    brand: "Little Dreams",
    name: "Kız Müslin Battaniye Bebek",
    url: "https://www.e-bebek.com/little-dreams-kiz-muslin-battaniye-kiz-bebek-p-24kltlkmsl002001",
    img: "https://cdn05.e-bebek.com/mnresize/300/300/media/p/kiz-muslin-battaniye-kiz-bebek_8682766812732_01.jpg",
    price: 269.99,
    original_price: 169.99,
  },
];

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
title.appendChild(document.createTextNode("Beğeneceğinizi Düşündüklerimiz"));
title.style.color = "#2c3e50";
title.style.textAlign = "start";
title.style.marginBottom = "30px";

// Karusel container
const carousel = document.createElement("div");
carousel.style.cssText = `
    position: relative;
    height: 350px;
    background: #e9ecef;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 20px;
  `;

data.forEach((item) => {
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

  // Resim

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

  //Fav İcon
  const favIcon = document.createElement("div");
  favIcon.style.cssText = `
    position: absolute;
    top: 4px;
    right: 4px;
    width: 30px;
    height: 30px;
    background: #f3940d;
    border: 1px solid #ced4da;
    border-radius: 50%;
    z-index: 1;
  `;

  // İsim
  const name = document.createElement("p");
  name.textContent = item.name.trim();
  name.style.cssText = `
      font-size: 12px;
      margin: 5px 0;
      color: #000000;
      overflow: ellipsis;
      text-align: start;
    `;

  const originalPrice = document.createElement("p");
  originalPrice.textContent = `${item.original_price} TL`;
  originalPrice.style.cssText = `
        text-align: start;
        text-decoration: line-through;
        color: #e74c3c;
        margin: 5px 0;
      `;

  // Fiyat
  const price = document.createElement("p");
  price.textContent = `${item.price} TL`;
  price.style.cssText = `
      text-align: start;
      font-weight: bold;
      color: #4bb788;
      margin: 5px 0;
    `;

  // Link
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

  // Öğeleri birleştirme
  imgContainer.appendChild(img);
  imgContainer.appendChild(favIcon);
  carouselItem.appendChild(imgContainer);
  carouselItem.appendChild(name);
  carouselItem.appendChild(originalPrice);
  carouselItem.appendChild(price);
  carouselItem.appendChild(link);
  carousel.appendChild(carouselItem);
});

app.appendChild(title);
app.appendChild(carousel);
document.body.appendChild(app);
