import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Rating,
  Autocomplete,
} from '@mui/material';
import {
  ExpandMore,
  FilterList,
  Clear,
  Search,
} from '@mui/icons-material';

export interface SearchFiltersState {
  query: string;
  category: string;
  condition: string[];
  priceRange: [number, number];
  location: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  availability: string;
  rating: number;
  tags: string[];
}

interface SearchFiltersProps {
  filters: SearchFiltersState;
  onFiltersChange: (filters: SearchFiltersState) => void;
  onSearch: () => void;
  onClear: () => void;
  categories: string[];
  locations: string[];
  availableTags: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  onClear,
  categories,
  locations,
  availableTags,
}) => {
  const [expanded, setExpanded] = useState<string | false>('basic');

  const handleChange = (field: keyof SearchFiltersState, value: any) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const conditionOptions = ['Excellent', 'Good', 'Fair', 'Poor'];
  const sortOptions = [
    { value: 'createdAt', label: 'Date Added' },
    { value: 'estimatedValue', label: 'Price' },
    { value: 'title', label: 'Name' },
    { value: 'rating', label: 'Rating' },
    { value: 'popularity', label: 'Popularity' },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search items..."
          value={filters.query}
          onChange={(e) => handleChange('query', e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
          }}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={onSearch}
          fullWidth
        >
          Search
        </Button>
        <Button
          variant="outlined"
          startIcon={<Clear />}
          onClick={onClear}
        >
          Clear
        </Button>
      </Box>

      {/* Basic Filters */}
      <Accordion 
        expanded={expanded === 'basic'} 
        onChange={handleAccordionChange('basic')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1">Basic Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Category */}
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Location */}
            <Autocomplete
              options={locations}
              value={filters.location}
              onChange={(_, value) => handleChange('location', value || '')}
              renderInput={(params) => (
                <TextField {...params} label="Location" />
              )}
              freeSolo
            />

            {/* Condition */}
            <FormControl>
              <Typography variant="subtitle2" gutterBottom>
                Condition
              </Typography>
              {conditionOptions.map((condition) => (
                <FormControlLabel
                  key={condition}
                  control={
                    <Checkbox
                      checked={filters.condition.includes(condition)}
                      onChange={(e) => {
                        const newConditions = e.target.checked
                          ? [...filters.condition, condition]
                          : filters.condition.filter((c) => c !== condition);
                        handleChange('condition', newConditions);
                      }}
                    />
                  }
                  label={condition}
                />
              ))}
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Price Range */}
      <Accordion 
        expanded={expanded === 'price'} 
        onChange={handleAccordionChange('price')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1">Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </Typography>
            <Slider
              value={filters.priceRange}
              onChange={(_, value) => handleChange('priceRange', value)}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
              marks={[
                { value: 0, label: '$0' },
                { value: 250, label: '$250' },
                { value: 500, label: '$500' },
                { value: 750, label: '$750' },
                { value: 1000, label: '$1000+' },
              ]}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Advanced Filters */}
      <Accordion 
        expanded={expanded === 'advanced'} 
        onChange={handleAccordionChange('advanced')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1">Advanced Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Sort By */}
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.sortBy}
                label="Sort By"
                onChange={(e) => handleChange('sortBy', e.target.value)}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sort Order */}
            <FormControl fullWidth>
              <InputLabel>Sort Order</InputLabel>
              <Select
                value={filters.sortOrder}
                label="Sort Order"
                onChange={(e) => handleChange('sortOrder', e.target.value)}
              >
                <MenuItem value="desc">Descending</MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
              </Select>
            </FormControl>

            {/* Availability */}
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
              <Select
                value={filters.availability}
                label="Availability"
                onChange={(e) => handleChange('availability', e.target.value)}
              >
                <MenuItem value="">All Items</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="pending">Pending Swap</MenuItem>
                <MenuItem value="swapped">Recently Swapped</MenuItem>
              </Select>
            </FormControl>

            {/* Minimum Rating */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Minimum Rating
              </Typography>
              <Rating
                value={filters.rating}
                onChange={(_, value) => handleChange('rating', value || 0)}
                precision={0.5}
              />
            </Box>

            {/* Tags */}
            <Autocomplete
              multiple
              options={availableTags}
              value={filters.tags}
              onChange={(_, value) => handleChange('tags', value)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  placeholder="Select tags..."
                />
              )}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Active Filters Summary */}
      {(filters.category || filters.condition.length > 0 || filters.location || filters.tags.length > 0) && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Active Filters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {filters.category && (
              <Chip
                label={`Category: ${filters.category}`}
                onDelete={() => handleChange('category', '')}
                size="small"
              />
            )}
            {filters.condition.map((condition) => (
              <Chip
                key={condition}
                label={`Condition: ${condition}`}
                onDelete={() => 
                  handleChange('condition', filters.condition.filter(c => c !== condition))
                }
                size="small"
              />
            ))}
            {filters.location && (
              <Chip
                label={`Location: ${filters.location}`}
                onDelete={() => handleChange('location', '')}
                size="small"
              />
            )}
            {filters.tags.map((tag) => (
              <Chip
                key={tag}
                label={`Tag: ${tag}`}
                onDelete={() => 
                  handleChange('tags', filters.tags.filter(t => t !== tag))
                }
                size="small"
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SearchFilters;