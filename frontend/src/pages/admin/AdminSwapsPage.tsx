import React, { useState } from 'react';
import { Container, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography, Chip, IconButton } from '@mui/material';
import { Visibility, CheckCircle, Cancel } from '@mui/icons-material';

const AdminSwapsPage: React.FC = () => {
  const [swaps] = useState([
    { id: '1', initiator: 'John Doe', recipient: 'Jane Smith', status: 'pending', createdAt: '2024-01-15' },
    { id: '2', initiator: 'Mike Johnson', recipient: 'Sarah Wilson', status: 'completed', createdAt: '2024-01-14' },
  ]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Swap Management</Typography>

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Swap ID</TableCell>
              <TableCell>Initiator</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {swaps.map((swap) => (
              <TableRow key={swap.id}>
                <TableCell>{swap.id}</TableCell>
                <TableCell>{swap.initiator}</TableCell>
                <TableCell>{swap.recipient}</TableCell>
                <TableCell>
                  <Chip 
                    label={swap.status} 
                    color={swap.status === 'completed' ? 'success' : 'warning'} 
                  />
                </TableCell>
                <TableCell>{new Date(swap.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton><Visibility /></IconButton>
                  <IconButton color="success"><CheckCircle /></IconButton>
                  <IconButton color="error"><Cancel /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};

export default AdminSwapsPage;