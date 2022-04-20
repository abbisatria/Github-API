const ColorsLanguage = (language: string) => {
  const colors = [
    {
      name: 'JavaScript',
      color: '#f1e05a'
    },
    {
      name: 'TypeScript',
      color: '#2b7489'
    },
    {
      name: 'CSS',
      color: '#563d7c'
    },
    {
      name: 'EJS',
      color: '#a91e50'
    },
    {
      name: 'Java',
      color: '#b07219'
    },
    {
      name: 'HTML',
      color: '#e34c26'
    },
  ]

  return colors.filter(val => val.name === language)[0]

}

export default ColorsLanguage;