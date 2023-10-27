type Reserve = {
  tokenA: number;
  tokenB: number;
};

function addLiquidity(amountA: number, amountB: number, reserve: Reserve): Reserve {
  return {
    tokenA: reserve.tokenA + amountA,
    tokenB: reserve.tokenB + amountB,
  };
}

function removeLiquidity(liquidity: number, reserve: Reserve): { removedA: number, removedB: number, newReserve: Reserve } {
  const removedA = reserve.tokenA * liquidity;
  const removedB = reserve.tokenB * liquidity;
  return {
    removedA,
    removedB,
    newReserve: {
      tokenA: reserve.tokenA - removedA,
      tokenB: reserve.tokenB - removedB,
    },
  };
}

function swap(isTokenA: boolean, amount: number, reserve: Reserve): { newReserve: Reserve, received: number } {
  const invariant = reserve.tokenA * reserve.tokenB;
  if (isTokenA) {
    const newA = reserve.tokenA - amount;
    const newB = invariant / newA;
    return {
      newReserve: { tokenA: newA, tokenB: newB },
      received: reserve.tokenB - newB,
    };
  } else {
    const newB = reserve.tokenB - amount;
    const newA = invariant / newB;
    return {
      newReserve: { tokenA: newA, tokenB: newB },
      received: reserve.tokenA - newA,
    };
  }
}
