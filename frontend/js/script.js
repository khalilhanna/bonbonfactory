"use strict";

const DOMAIN = "http://localhost:3000";

$(document).ready(function () {
  getAndDisplayAll();
  getItemCounts();
});

// Get All products
function getAndDisplayAll() {
  $.ajax({
    method: "GET",
    url: `${DOMAIN}/products`,
  }).done((resp) => {
    const storeItemsContainer = document.getElementById("store-items");
    storeItemsContainer.innerHTML = "";

    resp.forEach((item) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add(
        "col-10",
        "col-sm-6",
        "col-lg-4",
        "mx-auto",
        "my-3",
        "store-item",
        "sweets"
      );
      cardDiv.innerHTML = `
            <div class="card">
              <div class="img-container">
                <img src="img/cupcake-1.jpeg" class="card-img-top store-img"
                  alt="">
                  <span class="store-item-icon">
                <i id="item-${item.id}" class="fas fa-shopping-cart" onclick="addToCart('${item.product_name}', ${item.price})"></i>
                </span>
              </div>
              <div class="card-body">
                <div class="card-text d-flex justify-content-between
                  text-capitalize">
                  <h5 id="store-item-name">${item.product_name}</h5>
                  <h5 class="store-item-value">$ <strong id="store-item-price"
                      class="font-weight-bold">${item.price}</strong></h5>
                </div>
                <div class="card-control d-flex justify-content-end img-container
                  text-capitalize">
                  <i class="fas fa-edit mr-3" onclick="openEditForm(${item.id}, '${item.product_name}', ${item.price}, '${item.category}', ${item.delivery_in_days})"></i>
                  <i class="fas fa-trash-alt" onclick="deleteProduct(${item.id})"></i>

                </div>
              </div>

            </div>`;
      storeItemsContainer.appendChild(cardDiv);
    });
  });
}

// Get product by category by using query param I did filtteration for 5 category using 1 api instead of 5
function getByCategory(category) {
  $.ajax({
    method: "GET",
    url: `${DOMAIN}/products?category=${category}`,
    success: function (resp) {
      window.location.replace("#store");
    },
    failure: function (resp) {
      alert(resp);
    },
  }).done((resp) => {
    const storeItemsContainer = document.getElementById("store-items");
    storeItemsContainer.innerHTML = "";
    resp.forEach((item) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add(
        "col-10",
        "col-sm-6",
        "col-lg-4",
        "mx-auto",
        "my-3",
        "store-item",
        "sweets"
      );
      cardDiv.innerHTML = `
            <div class="card">
              <div class="img-container">
                <img src="img/cupcake-1.jpeg" class="card-img-top store-img"
                  alt="">
                <span class="store-item-icon">
                <i id="${item.id}" class="fas fa-shopping-cart" onclick="addToCart('${item.product_name}', ${item.price})"></i>  
                </span>
              </div>
              <div class="card-body">
                <div class="card-text d-flex justify-content-between
                  text-capitalize">
                  <h5 id="store-item-name">${item.product_name}</h5>
                  <h5 class="store-item-value">$ <strong id="store-item-price"
                      class="font-weight-bold">${item.price}</strong></h5>
                </div>
                <div class="card-control d-flex justify-content-end img-container
                  text-capitalize">
                  <i class="fas fa-edit mr-3" onclick="openEditForm(${item.id}, '${item.product_name}', ${item.price}, '${item.category}', ${item.delivery_in_days})"></i>
                  <i class="fas fa-trash-alt" onclick="deleteProduct(${item.id})"></i>
                </div>
              </div>
            </div>`;
      storeItemsContainer.appendChild(cardDiv);
    });
  });
}

// Add product, This option available for admin only
function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("cat").value;
  const delivery = document.getElementById("delivery").value;
  $.ajax({
    method: "POST",
    url: `${DOMAIN}/products`,
    data: {
      product_name: name,
      price: price,
      category: category,
      delivery_in_days: delivery,
    },
  })
    .done((resp) => {
      modal.style.display = "none";
      alert("New product has been added");
      getAndDisplayAll();
    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR, textStatus);
    });
}

// open the form with product details for editing, only for admin
function openEditForm(id, name, price, cat, delivery) {
  const btn = document.getElementById("addEditproduct");
  btn.innerHTML = "Update Product";
  document.getElementById("name").value = name;
  document.getElementById("price").value = price;
  document.getElementById("cat").value = cat;
  document.getElementById("delivery").value = delivery;
  $("#addEditproduct").prop("onclick", null).off("click");
  $("#addEditproduct").click(function () {
    editProduct(id);
  });
  modal.style.display = "block";
}

// Edit product, This option available for admin only
function editProduct(id) {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("cat").value;
  const delivery = document.getElementById("delivery").value;
  $.ajax({
    method: "PUT",
    url: `${DOMAIN}/products/${id}`,
    data: {
      product_name: name,
      price: price,
      category: category,
      delivery_in_days: delivery,
    },
  })
    .done((resp) => {
      modal.style.display = "none";
      alert("New product has been updated");
      getAndDisplayAll();
    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR, textStatus);
    });
}

// Get the product by name search
function getProductByNameSearch() {
  const search = document.getElementById("search-item").value;
  $.ajax({
    method: "GET",
    url: `${DOMAIN}/products/product/${search}`,
  }).done((resp) => {
    const storeItemsContainer = document.getElementById("store-items");
    storeItemsContainer.innerHTML = "";
    resp.forEach((item) => {
      const cardDiv = document.createElement("div");
      cardDiv.id = `item-${item.id}`;
      cardDiv.classList.add(
        "col-10",
        "col-sm-6",
        "col-lg-4",
        "mx-auto",
        "my-3",
        "store-item",
        "sweets"
      );
      cardDiv.innerHTML = `
              <div class="card">
              <div class="img-container">
                <img src="img/cupcake-1.jpeg" class="card-img-top store-img"
                  alt="">
                <span class="store-item-icon">
                <i id="${item.id}" class="fas fa-shopping-cart" onclick="addToCart('${item.product_name}', ${item.price})"></i>  
                </span>
              </div>
              <div class="card-body">
                <div class="card-text d-flex justify-content-between
                  text-capitalize">
                  <h5 id="store-item-name">${item.product_name}</h5>
                  <h5 class="store-item-value">$ <strong id="store-item-price"
                      class="font-weight-bold">${item.price}</strong></h5>
                </div>
                <div class="card-control d-flex justify-content-end img-container
                  text-capitalize">
                  <i class="fas fa-edit mr-3" onclick="openEditForm(${item.id}, '${item.product_name}', ${item.price}, '${item.category}', ${item.delivery_in_days})"></i>
                  <i class="fas fa-trash-alt" onclick="deleteProduct(${item.id})"></i>
                </div>
              </div>
            </div>`;
      storeItemsContainer.appendChild(cardDiv);
    });
  });
}

// Add product, This option available for admin only
function addToCart(name, price) {
  $.ajax({
    method: "POST",
    url: `${DOMAIN}/cartItems`,
    data: {
      Item_name: name,
      price: price,
    },
  })
    .done((resp) => {
      alert("New Item has been added to the cart");
      getItemCounts();
    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR, textStatus);
    });
}

// Delete product, This option available for admin only
function deleteProduct(id) {
  $.ajax({
    method: "DELETE",
    url: `${DOMAIN}/products/${id}`,
  })
    .done((resp) => {
      alert("product has been deleted");
    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR, textStatus);
    });
  getAndDisplayAll();
}

function getItemCounts() {
  $.ajax({
    method: "GET",
    url: `${DOMAIN}/cartItems/count`,
  }).done((resp) => {
    const cartItems = document.getElementById("item-count");
    cartItems.innerHTML = resp[0].counts + " Items - ";
    const totalItems = document.getElementById("itemTotal");
    totalItems.innerHTML = "$ " + resp[0].total;
  });
}

// I can Add the card in pure jQuery
//===================================

// const card = document.createElement("div");
// card.className = "card";

// const imgContainer = document.createElement("div");
// imgContainer.className = "img-container";

// const img = document.createElement("img");
// img.setAttribute("src", "img/sweets-1.jpeg");
// img.classList.add("card-img-top", "store-img");

// const span = document.createElement("span");
// span.className = "store-item-icon";

// const icon = document.createElement("i");
// icon.classList.add("fas", "fa-shopping-cart");

// const cardBody = document.createElement("div");
// cardBody.className = "card-body";

// const cardText = document.createElement("div");
// cardText.classList.add(
//   "card-text",
//   "d-flex",
//   "justify-content-between",
//   "text-capitalize"
// );

// const name = document.createElement("h5");
// name.id = "store-item-name";
// name.innerHTML = item.product_name;

// const price = document.createElement("h5");
// price.className = "store-item-value";
// price.innerHTML = "$ ";

// const strong = document.createElement("strong");
// strong.id = "store-item-price";
// strong.className = "font-weight-bold";
// strong.innerHTML = item.price;

// storeItemsContainer.appendChild(cardDiv);
// cardDiv.appendChild(card);
// card.appendChild(imgContainer);
// imgContainer.appendChild(img);
// imgContainer.appendChild(span);
// span.appendChild(icon);
// card.appendChild(cardBody);
// cardBody.appendChild(cardText);
// cardText.appendChild(name);
// cardText.appendChild(price);
// price.appendChild(strong);
