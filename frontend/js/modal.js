// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
const closeModal = document.getElementById("close-modal");

// When the user clicks add product button, open empty modal
btn.onclick = function () {
  const btnAddUpdate = document.getElementById("addEditproduct");
  btnAddUpdate.innerHTML = "Add Product";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("cat").value = "";
  document.getElementById("delivery").value = "";
  $("#addEditproduct").prop("onclick", null).off("click");
  $("#addEditproduct").click(function () {
    addProduct();
  });
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks cancel button of the modal, close it
closeModal.onclick = function () {
  modal.style.display = "none";
};
