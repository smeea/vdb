const drawProbability = (x, N, n, k) => {
  // x - target cards in draw (e.g. i=2 to draw 2 copy of the card)
  // N - total cards (e.g. N=12 for total crypt size of 12)
  // n - drawed cards (e.g. n=4 for initial crypt draw of 4 card)
  // k - target cards in pool (e.g. k=5 for 5 copies of Arika in the deck)

  const factorial = (n) => {
    return n ? n * factorial(n - 1) : 1;
  };

  const combinations = (n, r) => {
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  const exactProbability = (i, N, n, k) => {
    return (combinations(k, i) * combinations(N - k, n - i)) / combinations(N, n);
  };

  let prob = 0;
  for (let i = x; i <= n && i <= k; i++) {
    if (k - (N - n) > i) {
      prob = 1;
      break;
    }
    prob += exactProbability(i, N, n, k);
  }
  if (0.99 < prob && prob < 1) {
    prob = 0.99;
  }
  if (0 < prob && prob < 0.01) {
    prob = 0.01;
  }
  return prob;
};

export default drawProbability;
