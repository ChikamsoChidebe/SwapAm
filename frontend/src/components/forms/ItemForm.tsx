import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  Chip,
  IconButton,
  Paper,
} from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Item } from '../../types';

interface ItemFormProps {
  initialValues?: Partial<Item>;
  onSubmit: (values: ItemFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

export interface ItemFormData {
  title: string;
  description: string;
  category: string;
  condition: string;
  estimatedValue: number;
  location: string;
  tags: string[];
  images: File[];
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').max(100),
  description: Yup.string().required('Description is required').max(500),
  category: Yup.string().required('Category is required'),
  condition: Yup.string().required('Condition is required'),
  estimatedValue: Yup.number().required('Estimated value is required').min(0),
  location: Yup.string().required('Location is required'),
});

const categories = [
  'Electronics', 'Books', 'Clothing', 'Furniture', 'Sports',
  'Music', 'Games', 'Home & Garden', 'Automotive', 'Other'
];

const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];

const ItemForm: React.FC<ItemFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isLoading = false,
  mode,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 5));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  return (
    <Formik
      initialValues={{
        title: initialValues?.title || '',
        description: initialValues?.description || '',
        category: initialValues?.category || '',
        condition: initialValues?.condition || '',
        estimatedValue: initialValues?.estimatedValue || 0,
        location: typeof initialValues?.location === 'string' ? initialValues.location : initialValues?.location?.name || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit({
          ...values,
          tags,
          images,
        });
      }}
    >
      {({ errors, touched, values, handleChange, handleBlur }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="title"
                label="Title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={touched.category && Boolean(errors.category)}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Category"
                >
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={touched.condition && Boolean(errors.condition)}>
                <InputLabel>Condition</InputLabel>
                <Select
                  name="condition"
                  value={values.condition}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Condition"
                >
                  {conditions.map(condition => (
                    <MenuItem key={condition} value={condition}>
                      {condition}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="estimatedValue"
                label="Estimated Value ($)"
                value={values.estimatedValue}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.estimatedValue && Boolean(errors.estimatedValue)}
                helperText={touched.estimatedValue && errors.estimatedValue}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="location"
                label="Location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.location && Boolean(errors.location)}
                helperText={touched.location && errors.location}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                {tags.map(tag => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => removeTag(tag)}
                    size="small"
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} variant="outlined" size="small">
                  Add
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Images (Max 5)
              </Typography>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCamera />}
                  disabled={images.length >= 5}
                >
                  Upload Images
                </Button>
              </label>
              
              <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                {images.map((image, index) => (
                  <Paper key={index} sx={{ position: 'relative', p: 1 }}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      style={{ width: 80, height: 80, objectFit: 'cover' }}
                    />
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 0, right: 0 }}
                      onClick={() => removeImage(index)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button onClick={onCancel} disabled={isLoading}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                >
                  {mode === 'create' ? 'Create Item' : 'Update Item'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ItemForm;