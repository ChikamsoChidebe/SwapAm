import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Book, Computer, Checkroom, Chair, SportsBasketball, Watch, Edit, Kitchen, Palette, Category } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ItemCategory } from '../types';

const categoryIcons = {
  [ItemCategory.BOOKS]: <Book sx={{ fontSize: 48 }} />,
  [ItemCategory.ELECTRONICS]: <Computer sx={{ fontSize: 48 }} />,
  [ItemCategory.CLOTHING]: <Checkroom sx={{ fontSize: 48 }} />,
  [ItemCategory.FURNITURE]: <Chair sx={{ fontSize: 48 }} />,
  [ItemCategory.SPORTS]: <SportsBasketball sx={{ fontSize: 48 }} />,
  [ItemCategory.ACCESSORIES]: <Watch sx={{ fontSize: 48 }} />,
  [ItemCategory.STATIONERY]: <Edit sx={{ fontSize: 48 }} />,
  [ItemCategory.KITCHEN]: <Kitchen sx={{ fontSize: 48 }} />,
  [ItemCategory.DECOR]: <Palette sx={{ fontSize: 48 }} />,
  [ItemCategory.OTHER]: <Category sx={{ fontSize: 48 }} />,
};

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: ItemCategory) => {
    navigate(`/browse?category=${category}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Browse by Category
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Find items in your preferred category
      </Typography>

      <Grid container spacing={3}>
        {Object.values(ItemCategory).map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
              onClick={() => handleCategoryClick(category)}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {categoryIcons[category]}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {category.replace('_', ' ')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Browse {category.toLowerCase()} items
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesPage;