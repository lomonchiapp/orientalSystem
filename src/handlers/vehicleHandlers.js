export const handleNameChange = event => {
  setName(event.target.value)
  setSelectedVehicle({...selectedVehicle, name: event.target.value})
}

export const handleCcChange = event => {
  setCc(event.target.value)
  setSelectedVehicle({...selectedVehicle, cc: event.target.value})
}

export const handleCategoryChange = event => {
  setCategory(event.target.value)
  setSelectedVehicle({...selectedVehicle, category: event.target.value})
}

export const handleBrandChange = event => {
  setBrand(event.target.value)
  setSelectedVehicle({...selectedVehicle, brand: event.target.value})
}

export const handleSalePriceChange = event => {
  setSalePrice(event.target.value)
  setSelectedVehicle({...selectedVehicle, salePrice: event.target.value})
}

export const handleSuggPriceChange = event => {
  setSuggPrice(event.target.value)
  setSelectedVehicle({...selectedVehicle, suggPrice: event.target.value})
}
