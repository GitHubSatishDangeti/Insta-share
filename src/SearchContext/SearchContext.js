import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  apiStatus: '',
  searchResult: '',
  showSearchResult: false,
  onSearchInput: () => {},
  onClickSearch: () => {},
})

export default SearchContext
