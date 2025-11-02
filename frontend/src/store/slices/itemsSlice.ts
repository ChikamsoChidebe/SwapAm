import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Item, SearchFilters, Pagination } from '../../types';
import { itemsAPI } from '../../services/api';

interface ItemsState {
  items: Item[];
  currentItem: Item | null;
  myItems: Item[];
  featuredItems: Item[];
  recommendedItems: Item[];
  filters: SearchFilters;
  pagination: Pagination;
  loading: boolean;
  error: string | null;
  searchLoading: boolean;
}

const initialState: ItemsState = {
  items: [],
  currentItem: null,
  myItems: [],
  featuredItems: [],
  recommendedItems: [],
  filters: {},
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  },
  loading: false,
  error: null,
  searchLoading: false,
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (params: { page?: number; limit?: number; filters?: SearchFilters }) => {
    const response = await itemsAPI.getItems(params);
    return response.data;
  }
);

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id: string) => {
    const response = await itemsAPI.getItemById(id);
    return response.data;
  }
);

export const createItem = createAsyncThunk(
  'items/createItem',
  async (itemData: any) => {
    const response = await itemsAPI.createItem(itemData);
    return response.data;
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ id, data }: { id: string; data: any }) => {
    const response = await itemsAPI.updateItem(id, data);
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id: string) => {
    await itemsAPI.deleteItem(id);
    return id;
  }
);

export const likeItem = createAsyncThunk(
  'items/likeItem',
  async (id: string) => {
    await itemsAPI.likeItem(id);
    return id;
  }
);

export const searchItems = createAsyncThunk(
  'items/searchItems',
  async (filters: SearchFilters) => {
    const response = await itemsAPI.searchItems(filters);
    return response.data;
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<SearchFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateItemInList: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch items';
      })
      .addCase(fetchItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch item';
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.myItems.unshift(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentItem?.id === action.payload.id) {
          state.currentItem = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.myItems = state.myItems.filter(item => item.id !== action.payload);
      })
      .addCase(searchItems.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.items = action.payload.items;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { setFilters, clearFilters, clearCurrentItem, clearError, updateItemInList } = itemsSlice.actions;
export default itemsSlice.reducer;