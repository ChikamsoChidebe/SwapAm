import React, { useState } from 'react';
import { Container, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography, Chip, IconButton, TextField, Box } from '@mui/material';
import { Visibility, Delete, Block } from '@mui/icons-material';

const AdminItemsPage: React.FC = () => {
  const [items] = useState([
    { id: '1', title: 'MacBook Pro', owner: 'John Doe', category: 'electronics', status: 'active', points: 500, createdAt: '2024-01-15' },
    { id: '2', title: 'Physics Textbook', owner: 'Jane Smith', category: 'books', status: 'pending', points: 50, createdAt: '2024-01-16' },
  ]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Item Management</Typography>
      
      <Card sx={{ p: 2, mb: 3 }}>
        <TextField placeholder="Search items..." sx={{ minWidth: 300 }} />
      </Card>

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Chip label={item.status} color={item.status === 'active' ? 'success' : 'warning'} />
                </TableCell>
                <TableCell>{item.points}</TableCell>
                <TableCell>
                  <IconButton><Visibility /></IconButton>
                  <IconButton><Block /></IconButton>
                  <IconButton color="error"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};

export default AdminItemsPage;