const APP = {
  url: "https://fakestoreapi.com/products?limit=30",
  fav: [],
  init: () => {
    APP.fetchData(APP.url);
  },

  fetchData: (url) => {
    APP.spin();

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} oops...`);
        }
        return res.json();
      })
      .then((data) => {
        APP.spin(false);
        const tempData = data.map((i) => ({
          id: i.id,
          title: i.title,
          price: i.price,
          image: i.image,
        })); // => ({}) return an object

        tempData.sort((a, b) => a.price - b.price);
        APP.buildContent(tempData);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  buildContent: (data) => {
    document.querySelector(".list").innerHTML = data
      .map((item) => {
        return `
        <li>
        <div class="item__img">
          <img src=${item.image} />
        </div>
        <div class="item__wrapper">
          <div class="item__text-wrapper">
            <h2 class="item__title">${item.title}</h2>
            <p class="item__desc">CA$${item.price}</p>
          </div>
          <button class="item__btn">
            <span class="material-symbols-outlined">favorite</span>
          </button>
        </div>
      </li>
       `;
      })
      .join("");
  },

  spin: (isVisible = true) => {
    if (isVisible) {
      document.querySelector(".loader").classList.add("active");
    } else {
      document.querySelector(".loader").classList.remove("active");
    }
  },

  // errorHandler: (err) => {},
};

document.addEventListener("DOMContentLoaded", APP.init);
