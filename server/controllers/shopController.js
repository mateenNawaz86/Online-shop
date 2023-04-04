// 1. Controller for the landing page
exports.getIndex = (req, res, next) => {
  res.render("shop/index", {
    path: "/",
    pageTitle: "Shop",
  });
};
