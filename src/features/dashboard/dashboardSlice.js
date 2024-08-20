import { createSlice } from '@reduxjs/toolkit';
import { availableWidgetsData, initialCategories } from '../../utils/utils';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    categories: initialCategories,
    isDrawerVisible: false,
    selectedCategory: null,
    selectedWidgets: [],
    searchTerm: '',
    isAddWidgetFormVisible: false,
    availableWidgets: availableWidgetsData,
    activeTab: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setIsDrawerVisible: (state, action) => {
      state.isDrawerVisible = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedWidgets: (state, action) => {
      state.selectedWidgets = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setIsAddWidgetFormVisible: (state, action) => {
      state.isAddWidgetFormVisible = action.payload;
    },
    setAvailableWidgets: (state, action) => {
      state.availableWidgets = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const {
  setCategories,
  setIsDrawerVisible,
  setSelectedCategory,
  setSelectedWidgets,
  setSearchTerm,
  setIsAddWidgetFormVisible,
  setAvailableWidgets,
  setActiveTab,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
