"use strict";

// ---------- default SPA Web App setup ---------- //

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  setActiveTab(pageId);
}

// set default page
function setDefaultPage(defaultPageName) {
  if (location.hash) {
    defaultPageName = location.hash.slice(1);
  }
  showPage(defaultPageName);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

// ---------- Fetch data from data sources -------- //

/*
Fetches pages json data from my headless cms */
fetch("http://localhost:8888/wordpress/wp-json/wp/v2/pages?_embed")
  .then(function(response) {
    return response.json();
  })
  .then(function(pages) {
    appendPages(pages);
  });

/*
Appends and generate pages
*/
function appendPages(pages) {
  var menuTemplate = "";
  for (let page of pages) {
    addMenuItem(page);
    addPage(page);
  }
  setDefaultPage(pages[0].slug); // selecting the first page in the array of pages
  getPersons();
  getTeachers();
}

// appends menu item to the nav menu
function addMenuItem(page) {
  document.querySelector("#menu").innerHTML += `
  <a href="#${page.slug}" onclick="showPage('${page.slug}')">${page.title.rendered}</a>
  `;

}

// appends page section to the DOM
function addPage(page) {
  document.querySelector("#pages").innerHTML += `
  <section id="${page.slug}" class="page">
    <header class="topbar">
<a href="/index.html"><img class="logo" src="${page.acf.logo}"></a>

    </header>
    ${page.content.rendered}

<div id="headerbox">
<h1>${page.acf.header_text}</h1>
<h2>${page.acf.header_subtext}</h2>
<p>${page.acf.description_text}</p>
<img src="${page.acf.header_image}">

</div>

<header>



</header>

<div class="row2">
<div id="udvalgte">
<h2>${page.acf.functions}</h2>
<div class="column2">
<img src="${page.acf.function_1_img}">
<p>${page.acf.description_text_functions1}</p>
</div>
<div class="column2">
<img src="${page.acf.function_2_img}">
<p>${page.acf.description_text_functions2}</p></div>
<div class="column2">
<img src="${page.acf.function_3_img}">
<p>${page.acf.description_text_functions3}</p></div>
<div class="column2">
<img src="${page.acf.function_4_img}">
<p>${page.acf.description_text_functions4}</p></div>
<div class="column2">
<img src="${page.acf.function_5_img}">
<p>${page.acf.description_text_functions5}</p></div>
<div class="column2">
<img src="${page.acf.function_6_img}">
<p>${page.acf.description_text_functions6}</p></div>
</div>
</div>

<div class="row">
<h4>${page.acf.navn}</h4>
<h5>${page.acf.pris}</h5>
<p>${page.acf.ingredienser}</p>
</div>

<div class="row2">
	<div class="column">
<h4>${page.acf.footer1}</h4>
<p>${page.acf.footer1_content}</p>
</div>
</div>

</section>

  `;
}
