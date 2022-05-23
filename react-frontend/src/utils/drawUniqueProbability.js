const minusOne = (cards, i) => {
  return Object(cards).map((c, idx) => {
    if (i != idx) {
      return c;
    } else {
      return Math.max(0, c - 1);
    }
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
  if (tree['children'].length == 0) {
    return [tree];
  } else {
    const res = [];

    tree['children'].forEach((child) => {
      const l = leafNodes(child);
      l.forEach((item) => {
        res.push(item);
      });
    });
    return res;
  }
};

const probability = (children, m, p) => {
  if (children.length == 0) {
    return p;
  }
  return (
    p * probability(children[m[0]]['children'], m.slice(1), children[m[0]]['p'])
  );
};

const evaluateItem = (cards) => {
  const tot = cards.reduce((a, b) => a + b);
  const children = Object(cards).map((c, idx) => {
    return {
      children: [],
      p: c / tot,
      cards: minusOne(cards, idx),
    };
  });

  return children;
};

const evaluate = (cards, draw) => {
  // cards - array with unique cards quantity
  // draw - how many cards drawed
  if (!cards.length) return [0];

  const tree = { p: 1, children: [], cards: cards };

  for (let i = 0; i < draw; i++) {
    leafNodes(tree).forEach((item) => {
      item['children'] = evaluateItem(item['cards']);
    });
  }

  const res = [];
  const maxUniques = Math.min(cards.length, draw);
  for (let i = 0; i <= maxUniques; i++) res.push(0);

  product(cards, draw).forEach((item) => {
    const u = [...new Set(item)];
    res[u.length] += probability(tree['children'], item, tree['p']);
  });

  return res;
};

export default evaluate;
