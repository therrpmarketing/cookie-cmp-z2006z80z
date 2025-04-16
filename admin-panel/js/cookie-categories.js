document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-category-form");
  const categoryName = document.getElementById("category-name");
  const categoryDescription = document.getElementById("category-description");
  const categoryList = document.getElementById("category-list");

  // Load from localStorage
  let categories = JSON.parse(localStorage.getItem("cookieCategories")) || [];

  function renderCategories() {
    categoryList.innerHTML = "";
    categories.forEach((cat, index) => {
      const div = document.createElement("div");
      div.className = "category-item";
      div.innerHTML = `<h3>${cat.name}</h3><p>${cat.description}</p>`;
      categoryList.appendChild(div);
    });
  }

  renderCategories();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newCategory = {
      name: categoryName.value.trim(),
      description: categoryDescription.value.trim()
    };

    if (newCategory.name && newCategory.description) {
      categories.push(newCategory);
      localStorage.setItem("cookieCategories", JSON.stringify(categories));
      categoryName.value = "";
      categoryDescription.value = "";
      renderCategories();
    }
  });
});

