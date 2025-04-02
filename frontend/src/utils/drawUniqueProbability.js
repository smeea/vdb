const CHILDREN = "children";
const CARDS = "cards";
const P = "p";

const minusOne = (cards, i) => {
  return Object(cards).map((c, idx) => {
    if (i !== idx) {
      return c;
    }
    return Math.max(0, c - 1);
  });
};

const product = (cards, draw) => {
  const arr = [];
  for (let i = 0; i < draw; i++) {
    arr.push(cards.map((i, idx) => idx));
  }

  return arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
};

const leafNodes = (tree) => {
  if (tree[CHILDREN].length === 0) {
    return [tree];
  }
  const res = [];

  tree[CHILDREN].forEach((child) => {
    const l = leafNodes(child);
    l.forEach((item) => {
      res.push(item);
    });
  });
  return res;
};

const probability = (children, m, p) => {
  if (children.length === 0) {
    return p;
  }
  return p * probability(children[m[0]][CHILDREN], m.slice(1), children[m[0]][P]);
};

const evaluateItem = (cards) => {
  const tot = cards.reduce((a, b) => a + b);
  const children = Object(cards).map((c, idx) => {
    return {
      [CHILDREN]: [],
      [P]: c / tot,
      [CARDS]: minusOne(cards, idx),
    };
  });

  return children;
};

const evaluate = (cards, draw) => {
  // cards - array with unique cards quantity
  // draw - how many cards drawed
  if (!cards.length) return [0];

  const tree = { [P]: 1, [CHILDREN]: [], [CARDS]: cards };

  for (let i = 0; i < draw; i++) {
    leafNodes(tree).forEach((item) => {
      item[CHILDREN] = evaluateItem(item[CARDS]);
    });
  }

  const res = [];
  const maxUniques = Math.min(cards.length, draw);
  for (let i = 0; i <= maxUniques; i++) res.push(0);

  product(cards, draw).forEach((item) => {
    const u = [...new Set(item)];
    res[u.length] += probability(tree[CHILDREN], item, tree[P]);
  });

  return res;
};

export default evaluate;
