const setCurrentProduct = (product) => {
    return {
        type: "SET_CURRENT_PRODUCT",
        payload: product
    }
}

export default setCurrentProduct