import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Swap, SwapStatus } from '../../types';
import { swapsAPI } from '../../services/api';

interface SwapsState {
  swaps: Swap[];
  currentSwap: Swap | null;
  loading: boolean;
  error: string | null;
}

const initialState: SwapsState = {
  swaps: [],
  currentSwap: null,
  loading: false,
  error: null,
};

export const fetchSwaps = createAsyncThunk(
  'swaps/fetchSwaps',
  async () => {
    const response = await swapsAPI.getSwaps();
    return response.data;
  }
);

export const fetchSwapById = createAsyncThunk(
  'swaps/fetchSwapById',
  async (id: string) => {
    const response = await swapsAPI.getSwapById(id);
    return response.data;
  }
);

export const createSwap = createAsyncThunk(
  'swaps/createSwap',
  async (swapData: any) => {
    const response = await swapsAPI.createSwap(swapData);
    return response.data;
  }
);

export const acceptSwap = createAsyncThunk(
  'swaps/acceptSwap',
  async (id: string) => {
    const response = await swapsAPI.acceptSwap(id);
    return response.data;
  }
);

export const rejectSwap = createAsyncThunk(
  'swaps/rejectSwap',
  async (id: string) => {
    const response = await swapsAPI.rejectSwap(id);
    return response.data;
  }
);

const swapsSlice = createSlice({
  name: 'swaps',
  initialState,
  reducers: {
    clearCurrentSwap: (state) => {
      state.currentSwap = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateSwapStatus: (state, action: PayloadAction<{ id: string; status: SwapStatus }>) => {
      const swap = state.swaps.find(s => s.id === action.payload.id);
      if (swap) {
        swap.status = action.payload.status;
      }
      if (state.currentSwap?.id === action.payload.id) {
        state.currentSwap.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSwaps.fulfilled, (state, action) => {
        state.loading = false;
        state.swaps = action.payload;
      })
      .addCase(fetchSwaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch swaps';
      })
      .addCase(fetchSwapById.fulfilled, (state, action) => {
        state.currentSwap = action.payload;
      })
      .addCase(createSwap.fulfilled, (state, action) => {
        state.swaps.unshift(action.payload);
      })
      .addCase(acceptSwap.fulfilled, (state, action) => {
        const index = state.swaps.findIndex(swap => swap.id === action.payload.id);
        if (index !== -1) {
          state.swaps[index] = action.payload;
        }
        if (state.currentSwap?.id === action.payload.id) {
          state.currentSwap = action.payload;
        }
      })
      .addCase(rejectSwap.fulfilled, (state, action) => {
        const index = state.swaps.findIndex(swap => swap.id === action.payload.id);
        if (index !== -1) {
          state.swaps[index] = action.payload;
        }
        if (state.currentSwap?.id === action.payload.id) {
          state.currentSwap = action.payload;
        }
      });
  },
});

export const { clearCurrentSwap, clearError, updateSwapStatus } = swapsSlice.actions;
export default swapsSlice.reducer;