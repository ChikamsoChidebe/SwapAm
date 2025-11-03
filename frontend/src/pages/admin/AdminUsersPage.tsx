import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  MenuItem,
  Pagination,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  Block,
  CheckCircle,
  Edit,
  Delete,
  Visibility,
  Email,
  Phone,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const AdminUsersPage: React.FC = () => {
  const [users] = useState([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+234 801 234 5678',
      campus: 'University of Lagos',
      joinedAt: '2024-01-15',
      status: 'active',
      totalSwaps: 15,
      points: 1250,
      rating: 4.8,
      isVerified: true,
      avatar: null,
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '+234 802 345 6789',
      campus: 'University of Ibadan',
      joinedAt: '2024-02-20',
      status: 'suspended',
      totalSwaps: 8,
      points: 680,
      rating: 4.2,
      isVerified: false,
      avatar: null,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [actionDialog, setActionDialog] = useState<'view' | 'edit' | 'suspend' | 'delete' | null>(null);
  const [page, setPage] = useState(1);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    campus: '',
    status: 'active',
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (user: any, action: 'view' | 'edit' | 'suspend' | 'delete') => {
    setSelectedUser(user);
    setActionDialog(action);
    if (action === 'edit') {
      setEditForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        campus: user.campus,
        status: user.status,
      });
    }
  };

  const handleSaveEdit = () => {
    console.log('Saving user edit:', editForm);
    setActionDialog(null);
  };

  const handleSuspendUser = () => {
    console.log('Suspending user:', selectedUser?.id);
    setActionDialog(null);
  };

  const handleDeleteUser = () => {
    console.log('Deleting user:', selectedUser?.id);
    setActionDialog(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'suspended': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <>
      <Helmet>
        <title>User Management - Admin | Swapam</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
            User Management
          </Typography>

          {/* Filters */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 300 }}
              />
              <TextField
                select
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </TextField>
              <Button variant="outlined">Export Users</Button>
            </Box>
          </Card>

          {/* Users Table */}
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Campus</TableCell>
                    <TableCell>Joined</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Stats</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar src={user.avatar || undefined}>
                            {user.firstName[0]}{user.lastName[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">
                              {user.firstName} {user.lastName}
                              {user.isVerified && (
                                <CheckCircle sx={{ fontSize: 16, color: 'success.main', ml: 1 }} />
                              )}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              ID: {user.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Email sx={{ fontSize: 14 }} />
                            <Typography variant="body2">{user.email}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Phone sx={{ fontSize: 14 }} />
                            <Typography variant="body2">{user.phone}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.campus}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(user.joinedAt).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.status}
                          color={getStatusColor(user.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="caption" sx={{ display: 'block' }}>
                            {user.totalSwaps} swaps
                          </Typography>
                          <Typography variant="caption" sx={{ display: 'block' }}>
                            {user.points} points
                          </Typography>
                          <Typography variant="caption" sx={{ display: 'block' }}>
                            ⭐ {user.rating}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleAction(user, 'view')}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleAction(user, 'edit')}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            color={user.status === 'suspended' ? 'success' : 'warning'}
                            onClick={() => handleAction(user, 'suspend')}
                          >
                            <Block />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleAction(user, 'delete')}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <Pagination
                count={10}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                color="primary"
              />
            </Box>
          </Card>
        </motion.div>

        {/* View User Dialog */}
        <Dialog open={actionDialog === 'view'} onClose={() => setActionDialog(null)} maxWidth="md" fullWidth>
          <DialogTitle>User Details</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <Box sx={{ pt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar sx={{ width: 80, height: 80 }}>
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {selectedUser.email}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2"><strong>Phone:</strong> {selectedUser.phone}</Typography>
                <Typography variant="body2"><strong>Campus:</strong> {selectedUser.campus}</Typography>
                <Typography variant="body2"><strong>Joined:</strong> {selectedUser.joinedAt}</Typography>
                <Typography variant="body2"><strong>Total Swaps:</strong> {selectedUser.totalSwaps}</Typography>
                <Typography variant="body2"><strong>Points:</strong> {selectedUser.points}</Typography>
                <Typography variant="body2"><strong>Rating:</strong> {selectedUser.rating}/5</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActionDialog(null)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={actionDialog === 'edit'} onClose={() => setActionDialog(null)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="First Name"
                value={editForm.firstName}
                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={editForm.lastName}
                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                fullWidth
              />
              <TextField
                label="Email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                fullWidth
              />
              <TextField
                label="Phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                fullWidth
              />
              <TextField
                label="Campus"
                value={editForm.campus}
                onChange={(e) => setEditForm({ ...editForm, campus: e.target.value })}
                fullWidth
              />
              <TextField
                select
                label="Status"
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                fullWidth
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActionDialog(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Suspend User Dialog */}
        <Dialog open={actionDialog === 'suspend'} onClose={() => setActionDialog(null)}>
          <DialogTitle>
            {selectedUser?.status === 'suspended' ? 'Reactivate User' : 'Suspend User'}
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to {selectedUser?.status === 'suspended' ? 'reactivate' : 'suspend'} {selectedUser?.firstName} {selectedUser?.lastName}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActionDialog(null)}>Cancel</Button>
            <Button onClick={handleSuspendUser} color="warning" variant="contained">
              {selectedUser?.status === 'suspended' ? 'Reactivate' : 'Suspend'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete User Dialog */}
        <Dialog open={actionDialog === 'delete'} onClose={() => setActionDialog(null)}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to permanently delete {selectedUser?.firstName} {selectedUser?.lastName}? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActionDialog(null)}>Cancel</Button>
            <Button onClick={handleDeleteUser} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default AdminUsersPage;