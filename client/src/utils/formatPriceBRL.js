const formatPriceBRL = (value) =>{
    const formatedNumber = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      return formatedNumber
}

export default formatPriceBRL