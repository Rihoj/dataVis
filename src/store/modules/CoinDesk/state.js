const state = () => {
  return {
    loading: true,
    errored: false,
    currentPriceValue: 0,
    currentPriceAge: 0,
    history: {},
    historyAge: 0
  }
}

export default state
