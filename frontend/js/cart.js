"use strict";

const DOMAIN = "http://localhost:3000";

$(document).ready(function () {
  getAllCartItems();
  getItemCounts();
});

function getAllCartItems() {
  $.ajax({
    method: "GET",
    url: `${DOMAIN}/cartItems`,
  }).done((resp) => {
    const itemCounts = document.getElementById("itemCounts");
    //itemCounts.innerHTML = resp.itemCounts + " Items";
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    cartItemsContainer.innerHTML = "";

    resp.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("row", "border-top", "border-bottom");

      cartItemDiv.innerHTML = `
        <div class="row main align-items-center">
          <div class="col-2"><img class="img-fluid" src="img/cupcake-1.jpeg"></div>
          <div class="col">
              <div class="row text-muted">Item Name</div>
              <div class="row">${item.Item_name}</div>
          </div>
          <div class="col"> <a class="border" onclick="decreaseQuantity(${item.id}, ${item.quantity}, ${item.price})" href="#">-</a><span class="ml-2 mr-2"
                  
                  > ${item.quantity} </span><a class="border" onclick="increaseQuantity(${item.id}, ${item.quantity}, ${item.price})" href="#">+</a>
          </div>
          <div class="col">$ ${item.price} <span class="close" onclick="deleteFromCart(${item.id})">&#10005;</span></div>
        </div>`;
      cartItemsContainer.appendChild(cartItemDiv);
    });
  });
}

function getItemCounts() {
  $.ajax({
    method: "GET",
    url: `${DOMAIN}/cartItems/count`,
  }).done((resp) => {
    const itemCounts = document.getElementById("itemCounts");
    itemCounts.innerHTML = resp[0].counts + " Items";
    const itemNo = document.getElementById("itemNo");
    itemNo.innerHTML = resp[0].counts + " ITEMS";
    const cartItems = document.getElementById("item-count-1");
    cartItems.innerHTML = resp[0].counts + " Items - ";
    const totalItems = document.getElementById("itemTotal");
    totalItems.innerHTML = "$ " + resp[0].total;
    const totalSummary = document.getElementById("totalSummary");
    totalSummary.innerHTML = "$ " + resp[0].total;
    let shipping = $("#shipping").val();
    const total = document.getElementById("total");
    total.innerHTML =
      "$ " + (resp[0].total + Number(shipping.replace(/[^0-9.-]+/g, "")));
    $("select").on("change", function () {
      let shipping = $("#shipping").val();
      total.innerHTML =
        "$ " + (resp[0].total + Number(shipping.replace(/[^0-9.-]+/g, "")));
    });
  });
}

function deleteFromCart(id) {
  $.ajax({
    method: "DELETE",
    url: `${DOMAIN}/cartItems/${id}`,
  })
    .done((resp) => {
      alert("Item has been deleted from the cart");
      getAllCartItems();
      getItemCounts();
    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR, textStatus);
    });
}

function increaseQuantity(id, qty, itemPrice) {
  $.ajax({
    method: "PATCH",
    url: `${DOMAIN}/cartItems/${id}`,
    data: {
      price: itemPrice + itemPrice / qty,
      quantity: qty + 1,
    },
  })
    .done((resp) => {
      alert("Quantity has been increased");
      getAllCartItems();
      getItemCounts();
    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR, textStatus);
    });
}

function decreaseQuantity(id, qty, itemPrice) {
  $.ajax({
    method: "PATCH",
    url: `${DOMAIN}/cartItems/${id}`,
    data: {
      price: itemPrice - itemPrice / qty,
      quantity: qty - 1,
    },
  })
    .done((resp) => {
      alert("Quantity has been decreased");
      getAllCartItems();
      getItemCounts();
    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR, textStatus);
    });
}
