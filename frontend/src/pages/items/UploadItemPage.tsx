import React, { useState, useCallback } from 'react';
import {
  Container,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
  Chip,
  IconButton,
  LinearProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  PhotoCamera,
  Videocam,
  AutoAwesome,
  LocationOn,
  Category,
  Info,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../store';
import { createItem } from '../../store/slices/itemsSlice';
import { ItemCategory, ItemCondition } from '../../types';
import { uploadAPI, aiAPI } from '../../services/api';
import { Helmet } from 'react-helmet-async';

const validationSchema = yup.object({
  title: yup.string().min(3, 'Too short').max(100, 'Too long').required('Title is required'),
  description: yup.string().min(10, 'Too short').max(1000, 'Too long').required('Description is required'),
  category: yup.string().required('Category is required'),
  subcategory: yup.string(),
  condition: yup.string().required('Condition is required'),
  estimatedValue: yup.number().min(0, 'Must be positive').max(1000000, 'Too high'),
  tags: yup.array().of(yup.string()).max(10, 'Maximum 10 tags'),
});

const steps = ['Basic Info', 'Photos & Details', 'AI Valuation', 'Review & Submit'];

const categories = {
  [ItemCategory.BOOKS]: ['Textbooks', 'Novels', 'Reference', 'Comics', 'Magazines'],
  [ItemCategory.ELECTRONICS]: ['Laptops', 'Phones', 'Tablets', 'Accessories', 'Gaming'],
  [ItemCategory.CLOTHING]: ['Shirts', 'Pants', 'Shoes', 'Accessories', 'Formal'],
  [ItemCategory.FURNITURE]: ['Chairs', 'Tables', 'Storage', 'Decor', 'Lighting'],
  [ItemCategory.SPORTS]: ['Equipment', 'Clothing', 'Shoes', 'Accessories', 'Outdoor'],
  [ItemCategory.ACCESSORIES]: ['Bags', 'Jewelry', 'Watches', 'Sunglasses', 'Other'],
  [ItemCategory.STATIONERY]: ['Pens', 'Notebooks', 'Art Supplies', 'Office', 'Calculators'],
  [ItemCategory.KITCHEN]: ['Appliances', 'Utensils', 'Storage', 'Cookware', 'Tableware'],
  [ItemCategory.DECOR]: ['Wall Art', 'Plants', 'Lighting', 'Textiles', 'Ornaments'],
  [ItemCategory.OTHER]: ['Miscellaneous'],
};

const UploadItemPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [aiValuation, setAiValuation] = useState<any>(null);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      subcategory: '',
      condition: '',
      estimatedValue: '',
      specifications: {},
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError('');
        
        // Upload images and videos
        const imageUrls = await Promise.all(
          uploadedImages.map(async (file) => {
            const response = await uploadAPI.uploadImage(file);
            return response.data.url;
          })
        );

        const videoUrls = await Promise.all(
          uploadedVideos.map(async (file) => {
            const response = await uploadAPI.uploadVideo(file);
            return response.data.url;
          })
        );

        const itemData = {
          ...values,
          images: imageUrls,
          videos: videoUrls,
          tags,
          estimatedValue: values.estimatedValue ? Number(values.estimatedValue) : undefined,
          aiValuation,
        };

        await dispatch(createItem(itemData)).unwrap();
        setSuccess('Item uploaded successfully!');
        
        // Reset form
        formik.resetForm();
        setUploadedImages([]);
        setUploadedVideos([]);
        setTags([]);
        setActiveStep(0);
        setAiValuation(null);
        
      } catch (error: any) {
        setError(error.message || 'Failed to upload item');
      }
    },
  });

  const onImageDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedImages(prev => [...prev, ...acceptedFiles].slice(0, 10));
  }, []);

  const onVideoDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedVideos(prev => [...prev, ...acceptedFiles].slice(0, 3));
  }, []);

  const imageDropzone = useDropzone({
    onDrop: onImageDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 10,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const videoDropzone = useDropzone({
    onDrop: onVideoDrop,
    accept: { 'video/*': ['.mp4', '.mov', '.avi'] },
    maxFiles: 3,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const generateAIDescription = async () => {
    if (!formik.values.title || !formik.values.category) {
      setError('Please fill in title and category first');
      return;
    }

    setIsGeneratingDescription(true);
    try {
      const response = await aiAPI.generateDescription({
        title: formik.values.title,
        category: formik.values.category,
        condition: formik.values.condition,
        images: uploadedImages.length > 0 ? ['image'] : [],
      });
      
      formik.setFieldValue('description', response.data.description);
      setTags(response.data.suggestedTags || []);
    } catch (error) {
      setError('Failed to generate description');
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const getAIValuation = async () => {
    if (!formik.values.title || !formik.values.category || !formik.values.condition) {
      setError('Please fill in required fields first');
      return;
    }

    try {
      const response = await aiAPI.valuateItem({
        title: formik.values.title,
        description: formik.values.description,
        category: formik.values.category as ItemCategory,
        condition: formik.values.condition as ItemCondition,
        images: uploadedImages.map(() => 'image_url'),
        specifications: formik.values.specifications,
      });
      
      setAiValuation(response.data);
      formik.setFieldValue('estimatedValue', response.data.suggestedPoints);
    } catch (error) {
      setError('Failed to get AI valuation');
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setUploadedVideos(prev => prev.filter((_, i) => i !== index));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="title"
                label="Item Title"
                placeholder="e.g., MacBook Pro 13-inch 2020"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
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
                onBlur={formik.handleBlur}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
              >
                {Object.values(ItemCategory).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.replace('_', ' ')}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                name="subcategory"
                label="Subcategory"
                value={formik.values.subcategory}
                onChange={formik.handleChange}
                disabled={!formik.values.category}
              >
                {formik.values.category && categories[formik.values.category as ItemCategory]?.map((sub) => (
                  <MenuItem key={sub} value={sub}>
                    {sub}
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
                onBlur={formik.handleBlur}
                error={formik.touched.condition && Boolean(formik.errors.condition)}
                helperText={formik.touched.condition && formik.errors.condition}
              >
                {Object.values(ItemCondition).map((condition) => (
                  <MenuItem key={condition} value={condition}>
                    {condition.replace('_', ' ')}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="estimatedValue"
                label="Estimated Value (₦)"
                type="number"
                value={formik.values.estimatedValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.estimatedValue && Boolean(formik.errors.estimatedValue)}
                helperText={formik.touched.estimatedValue && formik.errors.estimatedValue}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  placeholder="Describe your item in detail..."
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
                <Button
                  variant="outlined"
                  startIcon={<AutoAwesome />}
                  onClick={generateAIDescription}
                  disabled={isGeneratingDescription}
                  sx={{ mt: 1, minWidth: 120 }}
                >
                  {isGeneratingDescription ? 'Generating...' : 'AI Help'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                {...imageDropzone.getRootProps()}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  border: '2px dashed',
                  borderColor: imageDropzone.isDragActive ? 'primary.main' : 'grey.300',
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                <input {...imageDropzone.getInputProps()} />
                <PhotoCamera sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Upload Photos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Drag & drop images here, or click to select
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Max 10 images, 5MB each
                </Typography>
              </Paper>
              
              {uploadedImages.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Uploaded Images ({uploadedImages.length}/10)
                  </Typography>
                  <Grid container spacing={1}>
                    {uploadedImages.map((file, index) => (
                      <Grid item xs={4} key={index}>
                        <Box sx={{ position: 'relative' }}>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Upload ${index}`}
                            style={{
                              width: '100%',
                              height: 80,
                              objectFit: 'cover',
                              borderRadius: 8,
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => removeImage(index)}
                            sx={{
                              position: 'absolute',
                              top: -8,
                              right: -8,
                              bgcolor: 'error.main',
                              color: 'white',
                              '&:hover': { bgcolor: 'error.dark' },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                {...videoDropzone.getRootProps()}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  border: '2px dashed',
                  borderColor: videoDropzone.isDragActive ? 'primary.main' : 'grey.300',
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                <input {...videoDropzone.getInputProps()} />
                <Videocam sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Upload Videos (Optional)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Drag & drop videos here, or click to select
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Max 3 videos, 50MB each
                </Typography>
              </Paper>

              {uploadedVideos.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Uploaded Videos ({uploadedVideos.length}/3)
                  </Typography>
                  {uploadedVideos.map((file, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        {file.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => removeVideo(index)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Tags
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => removeTag(tag)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} disabled={!newTag.trim() || tags.length >= 10}>
                    Add
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Box>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <AutoAwesome sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                AI Valuation
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get an accurate valuation for your item using our AI technology
              </Typography>
            </Box>

            {!aiValuation ? (
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={getAIValuation}
                  startIcon={<AutoAwesome />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Get AI Valuation
                </Button>
              </Box>
            ) : (
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Valuation Results
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" color="primary">
                        {aiValuation.suggestedPoints}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Suggested Points
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" color="success.main">
                        {Math.round(aiValuation.confidence * 100)}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Confidence
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" color="warning.main">
                        {aiValuation.qualityScore}/10
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quality Score
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Valuation Factors
                </Typography>
                <List>
                  {aiValuation.factors?.map((factor: any, index: number) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {factor.impact > 0 ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Warning color="warning" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={factor.factor}
                        secondary={factor.description}
                      />
                    </ListItem>
                  ))}
                </List>
              </Card>
            )}
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Review Your Item
            </Typography>
            <Card sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    {formik.values.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {formik.values.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip label={formik.values.category} color="primary" />
                    <Chip label={formik.values.condition} variant="outlined" />
                  </Box>
                  <Typography variant="h6" color="primary">
                    {formik.values.estimatedValue} Points
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  {uploadedImages.length > 0 && (
                    <img
                      src={URL.createObjectURL(uploadedImages[0])}
                      alt="Item preview"
                      style={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 8,
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </Card>

            {uploadProgress > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Uploading... {uploadProgress}%
                </Typography>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Upload Item - Swapam</title>
        <meta name="description" content="Upload your items to Swapam and start earning points. AI-powered valuation and easy listing process." />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card sx={{ p: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
              Upload Your Item
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
              Turn your unused items into valuable points
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box component="form" onSubmit={formik.handleSubmit}>
              {renderStepContent(activeStep)}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(activeStep - 1)}
                  size="large"
                >
                  Back
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={formik.isSubmitting}
                    startIcon={<CloudUpload />}
                    sx={{ px: 4 }}
                  >
                    {formik.isSubmitting ? 'Uploading...' : 'Upload Item'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => setActiveStep(activeStep + 1)}
                    size="large"
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </>
  );
};

export default UploadItemPage;