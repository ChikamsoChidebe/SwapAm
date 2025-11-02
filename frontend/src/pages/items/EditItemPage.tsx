import React, { useEffect } from 'react';
import { Container, Card, TextField, Button, Typography, Box, MenuItem, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchItemById, updateItem } from '../../store/slices/itemsSlice';
import { ItemCategory, ItemCondition } from '../../types';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  condition: yup.string().required('Condition is required'),
});

const EditItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentItem: item, loading } = useAppSelector(state => state.items);

  useEffect(() => {
    if (id) dispatch(fetchItemById(id));
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      title: item?.title || '',
      description: item?.description || '',
      category: item?.category || '',
      condition: item?.condition || '',
      estimatedValue: item?.estimatedValue || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        await dispatch(updateItem({ id, data: values }));
        navigate('/my-items');
      }
    },
  });

  if (loading || !item) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Item
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="title"
                label="Item Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                name="category"
                label="Category"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
              >
                {Object.values(ItemCategory).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                name="condition"
                label="Condition"
                value={formik.values.condition}
                onChange={formik.handleChange}
                error={formik.touched.condition && Boolean(formik.errors.condition)}
                helperText={formik.touched.condition && formik.errors.condition}
              >
                {Object.values(ItemCondition).map((condition) => (
                  <MenuItem key={condition} value={condition}>
                    {condition}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="estimatedValue"
                label="Estimated Value (₦)"
                type="number"
                value={formik.values.estimatedValue}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              Update Item
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/my-items')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default EditItemPage;