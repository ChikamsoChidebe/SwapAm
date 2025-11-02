import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import { SwapHoriz } from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Item } from '../../types';

interface SwapRequestFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SwapRequestData) => void;
  myItem: Item;
  theirItem: Item;
  isLoading?: boolean;
}

export interface SwapRequestData {
  message: string;
}

const validationSchema = Yup.object({
  message: Yup.string().max(500, 'Message must be less than 500 characters'),
});

const SwapRequestForm: React.FC<SwapRequestFormProps> = ({
  open,
  onClose,
  onSubmit,
  myItem,
  theirItem,
  isLoading = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Request Swap</Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            You're requesting to swap:
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Box
                component="img"
                src={myItem.images[0] || '/placeholder-image.jpg'}
                alt={myItem.title}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 1,
                }}
              />
              <Typography variant="subtitle2" noWrap>
                {myItem.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Your item - ${myItem.estimatedValue}
              </Typography>
            </Box>

            <Box sx={{ mx: 2, display: 'flex', alignItems: 'center' }}>
              <SwapHoriz color="primary" fontSize="large" />
            </Box>

            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Box
                component="img"
                src={theirItem.images[0] || '/placeholder-image.jpg'}
                alt={theirItem.title}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 1,
                }}
              />
              <Typography variant="subtitle2" noWrap>
                {theirItem.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Their item - ${theirItem.estimatedValue}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Avatar src={theirItem.owner.avatar} sx={{ width: 32, height: 32, mr: 1 }}>
              {theirItem.owner.name.charAt(0)}
            </Avatar>
            <Typography variant="body2">
              Swap with {theirItem.owner.name}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Formik
          initialValues={{ message: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="message"
                label="Message (Optional)"
                placeholder="Add a personal message to your swap request..."
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.message && Boolean(errors.message)}
                helperText={touched.message && errors.message}
                sx={{ mb: 2 }}
              />

              <DialogActions sx={{ px: 0, pb: 0 }}>
                <Button onClick={onClose} disabled={isLoading}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                >
                  Send Request
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default SwapRequestForm;