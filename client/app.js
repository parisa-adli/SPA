import Dashboard from "./pages/Dashboard.js";
import Posts from "./pages/Posts.js";
import Products from "./pages/Products.js";
import Notfound from "./pages/Notfound.js";

// 1. what view show to user based on route?
function router() {
  // dashboard, products, posts
  const routes = [
    {
      path: "/",
      view: Dashboard,
    },
    {
      path: "/products",
      view: Products,
    },
    {
      path: "/posts",
      view: Posts,
    },
  ];

  const potentialRoutes = routes.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    };
  });

  let match = potentialRoutes.find((route) => route.isMatch);

  if (!match) {
    match = {
      route: { path: "/not-found", view: Notfound },
      isMatch: true,
    };
  }
  // console.log(match.route.view());
  document.querySelector("#app").innerHTML = match.route.view();
}

// 2. push user to new url without refresh page:
function navigateTo(url) {
  // move the user between urls
  // pushState(state, unused, url)
  history.pushState(null, null, url);
  router();
}
// 3. moving history of browser : back and forward
window.addEventListener("popstate", router);

// SIDEBAR TOGGLER :
const sidebarToggler = document.querySelector(".sidebar-toggler");
const sidebar = document.querySelector(".nav");
const root = document.documentElement;
sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("mini-sidebar");
  if (sidebar.classList.contains("mini-sidebar")) {
    root.style.setProperty("--nav-width", 70 + "px");
  } else {
    root.style.setProperty("--nav-width", 250 + "px");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    // if (e.target.hasAttribute("data-link"))
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
