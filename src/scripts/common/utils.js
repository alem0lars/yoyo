const f = (a, b) => [].concat(...a.map((d) => b.map((e) => [].concat(d, e))));

// Cartesian product
const cartesianProduct = (a, b, ...c) =>
  b ? cartesianProduct(f(a, b), ...c) : a;

// Cartesian product with joins
const cartesianProductWithJoins = (join1, join2, c, d, ...e) =>
  cartesianProduct(c, d, ...e)
    .map((x) => x.join(join1))
    .join(join2);

// Cartesian product for building CSS selectors
const cartesianProductForCSSSelectors = (a, b, ...c) =>
  cartesianProductWithJoins("", ",", a, b, ...c);

export {
  cartesianProduct,
  cartesianProductWithJoins,
  cartesianProductForCSSSelectors,
};
