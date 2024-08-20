import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Row, Button, Drawer, Checkbox, Tabs, Input } from 'antd';
import CustomPieChart from '../../components/pieChart/CustomPieChart';
import CustomBarChart from '../../components/barChart/CustomBarChart';
import AddWidgetForm from '../../components/forms/addWidgetForm/AddWidgetForm';
import {
  setCategories,
  setIsDrawerVisible,
  setSelectedCategory,
  setSelectedWidgets,
  setSearchTerm,
  setIsAddWidgetFormVisible,
  setAvailableWidgets,
  setActiveTab,
} from './dashboardSlice';

const { TabPane } = Tabs;
const { Search } = Input;

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.dashboard.categories);
  const isDrawerVisible = useSelector(state => state.dashboard.isDrawerVisible);
  const selectedCategory = useSelector(state => state.dashboard.selectedCategory);
  const selectedWidgets = useSelector(state => state.dashboard.selectedWidgets);
  const searchTerm = useSelector(state => state.dashboard.searchTerm);
  const isAddWidgetFormVisible = useSelector(state => state.dashboard.isAddWidgetFormVisible);
  const availableWidgets = useSelector(state => state.dashboard.availableWidgets);
  const activeTab = useSelector(state => state.dashboard.activeTab);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(setSelectedWidgets(selectedCategory.widgets.map(widget => widget.widgetId)));
    }
  }, [selectedCategory, dispatch]);

  useEffect(() => {
  if (isDrawerVisible) {
    if (activeTab) {
      const selectedCategory = categories.find(category => category.categoryId === activeTab);
      dispatch(setSelectedCategory(selectedCategory));
    } else if (categories.length > 0) {
      const firstCategory = categories[0];
      dispatch(setSelectedCategory(firstCategory));
      dispatch(setActiveTab(firstCategory.categoryId));
    }
  }
}, [isDrawerVisible, categories, dispatch, activeTab]);

  const handleTabChange = (key) => {
  const selectedTabCategory = categories.find(category => category.categoryId.toString() === key);
  if (selectedTabCategory) {
    dispatch(setSelectedCategory(selectedTabCategory));
  }
  dispatch(setActiveTab(key));
};

  const handleAddNewWidget = (values) => {
  const newWidget = {
    widgetId: new Date().getTime(), // Ensuring this to generate a ID is unique
    widgetName: values.widgetName,
    widgetText: values.widgetText,
    widgetType: values.widgetType,
    widgetData: JSON.parse(values.widgetData),
  };

  const existingCategory = categories.find(category => category.categoryName === values.categoryName);

  if (existingCategory) {
    const widgetExists = existingCategory.widgets.some(widget => widget.widgetName === newWidget.widgetName);
    if (!widgetExists) {
      // Updating existing category with new widget
      dispatch(setCategories(categories.map(category => {
        if (category.categoryName === values.categoryName) {
          return {
            ...category,
            widgets: [...category.widgets, newWidget]
          };
        }
        return category;
      })));

      // Updating available widgets
      const newAvailableWidgets = {
        ...availableWidgets,
        [existingCategory.categoryId]: [
          ...(availableWidgets[existingCategory.categoryId] || []),
          newWidget
        ]
      };
      console.log({ newAvailableWidgets });
      dispatch(setAvailableWidgets(newAvailableWidgets));

      // Updating selected widgets
      const newSelectedWidgets = [
        ...selectedWidgets,
        newWidget.widgetId
      ];
      dispatch(setSelectedWidgets(newSelectedWidgets));
    }
  } else {
    const newCategoryId = Object.keys(availableWidgets).length + 1; // Ensuring new category ID is unique

    const newCategory = {
      categoryId: newCategoryId,
      categoryName: values.categoryName,
      widgets: [newWidget]
    };
    console.log({ newCategory });

    // Adding new category
    dispatch(setCategories([...categories, newCategory]));

    // Adding new widgets to availableWidgets
    const newAvailableWidgets = {
      ...availableWidgets,
      [newCategoryId]: [newWidget]
    };
    console.log({ newAvailableWidgets });
    dispatch(setAvailableWidgets(newAvailableWidgets));

    // Updating selected widgets
    const newSelectedWidgets = [
      ...selectedWidgets,
      newWidget.widgetId
    ];
    dispatch(setSelectedWidgets(newSelectedWidgets));
  }

  dispatch(setIsAddWidgetFormVisible(false));
};

  const handleAddWidget = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(setIsDrawerVisible(true));
    dispatch(setActiveTab(category.categoryId)); 
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(setCategories(categories.map(category => {
      if (category.categoryId === categoryId) {
        const updatedWidgets = category.widgets.filter(widget => widget.widgetId !== widgetId);
        return { ...category, widgets: updatedWidgets };
      }
      return category;
    })));
  };

  const handleConfirm = () => {
    dispatch(setCategories(categories.map(category => {
      if (category.categoryId === selectedCategory.categoryId) {
        const newWidgets = availableWidgets[selectedCategory.categoryId]
          .filter(widget => selectedWidgets.includes(widget.widgetId));

        const currentWidgets = category.widgets;

        const updatedWidgets = currentWidgets.filter(widget =>
          selectedWidgets.includes(widget.widgetId) || newWidgets.some(newWidget => newWidget.widgetId === widget.widgetId)
        );

        const uniqueWidgets = [
          ...updatedWidgets,
          ...newWidgets.filter(newWidget => !currentWidgets.some(widget => widget.widgetId === newWidget.widgetId))
        ];

        return {
          ...category,
          widgets: uniqueWidgets
        };
      }
      return category;
    })));
    dispatch(setIsDrawerVisible(false));
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: searchTerm
      ? category.widgets.filter(widget =>
          widget.widgetName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : category.widgets
  }));
console.log({availableWidgets})
  return (
    <div style={{ margin: 15 }}>
      <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 0 0 0' }}>
        <Search
          placeholder="Search Widgets"
          value={searchTerm}
          onChange={e => dispatch(setSearchTerm(e.target.value))}
          style={{ width: 250 }}
        />
        <Button style={{ marginLeft: 5 }} type="primary" onClick={() => dispatch(setIsAddWidgetFormVisible(true))}>
          Add New Widget
        </Button>
      </header>

      {filteredCategories.map((category) => (
        <div key={category.categoryId} style={{ marginBottom: '20px' }}>
          <h4 style={{ textAlign: 'left', fontWeight: 'bold' }}>{category.categoryName}</h4>
          <Row gutter={[16, 16]}>
            {category.widgets.map(widget => (
              <Col span={8} key={widget.widgetId}>
                <Card style={{ height: '300px', position: 'relative' }}>
                  {widget.widgetType === 'pieChart' && <CustomPieChart widget={widget} />}
                  {widget.widgetType === 'straightPieChart' && <CustomBarChart widget={widget} />}
                  <Button
                    type="link"
                    danger
                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                    onClick={() => handleRemoveWidget(category.categoryId, widget.widgetId)}
                  >
                    &times;
                  </Button>
                </Card>
              </Col>
            ))}
            <Col span={8}>
              <Card style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button type="dashed" onClick={() => handleAddWidget(category)}>
                  + Add Widget
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      ))}

      <AddWidgetForm
        visible={isAddWidgetFormVisible}
        onCancel={() => dispatch(setIsAddWidgetFormVisible(false))}
        onSubmit={handleAddNewWidget}
      />

      <Drawer
        title="Add Widget"
        placement="right"
        onClose={() => dispatch(setIsDrawerVisible(false))}
        open={isDrawerVisible}
        footer={
          <div>
            <Button onClick={() => dispatch(setIsDrawerVisible(false))} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        }
      >
          <Tabs
            activeKey={
            activeTab ? activeTab.toString() : Object.keys(availableWidgets)[0]
          }
            onChange={handleTabChange}
          >
          {Object.keys(availableWidgets).map(tabKey => (
            <TabPane
              tab={
                tabKey === '1' ? 'CSPM' :
                tabKey === '2' ? 'CWPP' :
                tabKey === '3' ? 'Image' : `Other_${tabKey}`
              }
              key={tabKey}
            >
              {availableWidgets[tabKey].map(widget => (
                <div key={widget.widgetId}>
                  <Checkbox
                    checked={selectedWidgets.includes(widget.widgetId)}
                    onChange={e => {
                      const widgetId = widget.widgetId;
                      dispatch(setSelectedWidgets(e.target.checked
                        ? [...selectedWidgets, widgetId]
                        : selectedWidgets.filter(id => id !== widgetId)));
                    }}
                  >
                    {widget.widgetName}
                  </Checkbox>
                </div>
              ))}
            </TabPane>
          ))}
        </Tabs>
      </Drawer>
    </div>
  );
};

export default DashboardComponent;
