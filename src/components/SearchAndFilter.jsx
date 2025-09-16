import React, { useState } from 'react';
import { categories } from '../data/mockData';
import './SearchAndFilter.css';

const SearchAndFilter = ({ onSearch, onFilter, searchTerm, selectedCategory }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
  const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory || 'all');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (categoryId) => {
    setLocalSelectedCategory(categoryId);
    onFilter(categoryId);
  };

  const clearFilters = () => {
    setLocalSearchTerm('');
    setLocalSelectedCategory('all');
    onSearch('');
    onFilter('all');
  };

  return (
    <div className="search-filter">
      <div className="container">
        <div className="search-filter-content">
          {/* 검색 바 */}
          <div className="search-bar">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="모임방 이름으로 검색해보세요!"
                value={localSearchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="category-filter">
            <h3 className="filter-title">카테고리</h3>
            <div className="category-buttons">
              <button
                className={`category-btn ${localSelectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                전체
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${localSelectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                  style={{ '--category-color': category.color }}
                >
                  <span className="category-emoji">{category.emoji}</span>
                  <span className="category-name">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 필터 초기화 */}
          {(localSearchTerm || localSelectedCategory !== 'all') && (
            <div className="filter-actions">
              <button className="btn btn-small" onClick={clearFilters}>
                필터 초기화
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
