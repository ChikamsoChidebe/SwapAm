import React, { useState } from 'react';
import { Container, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography, Chip, IconButton, Button } from '@mui/material';
import { Visibility, CheckCircle, Block } from '@mui/icons-material';

const AdminReportsPage: React.FC = () => {
  const [reports] = useState([
    { id: '1', reporter: 'John Doe', reported: 'Jane Smith', reason: 'Inappropriate content', status: 'pending', createdAt: '2024-01-15' },
    { id: '2', reporter: 'Mike Johnson', reported: 'Bad Item', reason: 'Misleading description', status: 'resolved', createdAt: '2024-01-14' },
  ]);

  return (
    <>
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Reports Management</Typography>

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reporter</TableCell>
              <TableCell>Reported</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.reporter}</TableCell>
                <TableCell>{report.reported}</TableCell>
                <TableCell>{report.reason}</TableCell>
                <TableCell>
                  <Chip 
                    label={report.status} 
                    color={report.status === 'resolved' ? 'success' : 'warning'} 
                  />
                </TableCell>
                <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton><Visibility /></IconButton>
                  <Button size="small" variant="contained" color="success">Resolve</Button>
                  <IconButton color="error"><Block /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
    </>
  );
};

export default AdminReportsPage;