import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchableContent } from '../context/SearchableContentContext'
import './Navbar.css'

interface NavbarProps {
  onSearch: (term: string) => void
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const { searchableContent } = useSearchableContent()
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    console.log(`Search term: ${term}`)
    onSearch(term)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    onSearch('')
  }

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text
    }
    const regex = new RegExp(`(${highlight})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className='highlight'>
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  const navigate = useNavigate()

  const handleResultClick = (route: string) => {
    console.log(`Navigating to: ${route}`)
    navigate(route)
  }

  const searchResults = searchTerm
    ? searchableContent
        .filter(item =>
          item.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(item => {
          const startIndex = item.text
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase())
          const endIndex = startIndex + searchTerm.length
          const previewText = `${item.text.substring(
            Math.max(0, startIndex - 20),
            startIndex
          )}${searchTerm}${item.text.substring(
            endIndex,
            Math.min(item.text.length, endIndex + 20)
          )}`
          return {
            ...item,
            previewText
          }
        })
    : []

  console.log('Search results:', searchResults)

  return (
    <div className='containerNav'>
      <h1>Beacon v2 RI documentation</h1>
      <div className='divOptionsInput'>
        <div className='inputContainer'>
          <div className='inputDiv'>
            <img src='./Zoom-in.png' className='searchIcon' alt='Search Icon' />
            <input
              className='inputSearch'
              type='text'
              placeholder='Search keywords'
              value={searchTerm}
              onChange={handleSearchChange}
            ></input>

            {searchTerm && (
              <button className='clearButton' onClick={handleClearSearch}>
                &times;
              </button>
            )}
          </div>
          {searchResults.length > 0 && (
            <div className='searchResults'>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className='searchResultItem'
                  onClick={() => handleResultClick(result.route)}
                >
                  <div className='titleResult'>
                    <strong>{result.title}</strong>
                  </div>
                  <div className='previewTextResult'>
                    • {highlightText(result.previewText, searchTerm)}...
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
