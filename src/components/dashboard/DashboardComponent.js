import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Drawer, Checkbox, Tabs, Input, Tooltip } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import CustomPieChart from '../pieChart/CustomPieChart';
import CustomBarChart from '../barChart/CustomBarChart';
import AddWidgetForm from '../forms/addWidgetForm/AddWidgetForm';
import { availableWidgetsData, initialCategories, loadFromLocalStorage, saveToLocalStorage } from '../../utils/utils';

const { TabPane } = Tabs;
const { Search } = Input;

const DashboardComponent = () => {

  const [categories, setCategories] = useState(loadFromLocalStorage('categories') || initialCategories);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddWidgetFormVisible, setIsAddWidgetFormVisible] = useState(false);
  const [clearStorageFlag, setClearStorageFlag] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('1');

  
  const [availableWidgets, setAvailableWidgets] = useState(availableWidgetsData)

  useEffect(() => {
    saveToLocalStorage('categories', categories);
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      setActiveTabKey(selectedCategory.categoryId.toString());
      setSelectedWidgets(selectedCategory.widgets.map(widget => widget.widgetId));
    }
  }, [selectedCategory]);

  const handleAddNewWidget = (values) => {
    console.log({ values });

    const newWidget = {
      widgetId: new Date().getTime(), // Unique widget ID based on timestamp
      widgetName: values.widgetName,
      widgetText: values.widgetText,
      widgetType: values.widgetType,
      widgetData: JSON.parse(values.widgetData),
    };

    const newCategoryId = Object.keys(availableWidgets).length + 1;

    // Checking if the category already exists
    const existingCategory = categories.find(category => category.categoryName === values.categoryName);

    if (existingCategory) {
      // Category exists; checking if widget already exists
      const widgetExists = existingCategory.widgets.some(widget => widget.widgetName === newWidget.widgetName);
      if (!widgetExists) {
        // Updateing the category with the new widget
        setCategories(categories.map(category => {
          if (category.categoryName === values.categoryName) {
            return {
              ...category,
              widgets: [...category.widgets, newWidget]
            };
          }
          return category;
        }));

        // Updating availableWidgets and selectedWidgets
        setAvailableWidgets(prevAvailableWidgets => ({
          ...prevAvailableWidgets,
          [existingCategory.categoryId]: [
            ...prevAvailableWidgets[existingCategory.categoryId],
            newWidget
          ]
        }));

        setSelectedWidgets(prevSelectedWidgets => [
          ...prevSelectedWidgets,
          newWidget.widgetId
        ]);
      }
    } else {
      // Creating new category if it does not exist
      const newCategory = {
        categoryId: newCategoryId,
        categoryName: values.categoryName,
        widgets: [newWidget]
      };

      // Updating categories state
      setCategories([...categories, newCategory]);

      // Updating availableWidgets and selectedWidgets
      setAvailableWidgets(prevAvailableWidgets => ({
        ...prevAvailableWidgets,
        [newCategoryId]: [newWidget]
      }));

      setSelectedWidgets(prevSelectedWidgets => [
        ...prevSelectedWidgets,
        newWidget.widgetId
      ]);
    }

    setIsAddWidgetFormVisible(false);
  };

  const handleAddWidget = (category) => {
    setSelectedCategory(category);
    setIsDrawerVisible(true);
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    setCategories(categories.map(category => {
      if (category.categoryId === categoryId) {
        const updatedWidgets = category.widgets.filter(widget => widget.widgetId !== widgetId);
        return { ...category, widgets: updatedWidgets };
      }
      return category;
    }));
  };

  const handleConfirm = () => {
    setCategories(categories.map(category => {
      if (category.categoryId === selectedCategory.categoryId) {
        // Geting widgets from the drawer that are selected
        const newWidgets = availableWidgets[selectedCategory.categoryId]
          .filter(widget => selectedWidgets.includes(widget.widgetId));
        
        // Geting current widgets in the category
        const currentWidgets = category.widgets;
        
        // Removing widgets from the category that are not selected
        const updatedWidgets = currentWidgets.filter(widget => 
          selectedWidgets.includes(widget.widgetId) || newWidgets.some(newWidget => newWidget.widgetId === widget.widgetId)
        );
        
        // Adding new widgets that are selected but not already in the category
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
    }));
    setIsDrawerVisible(false);
  };

  const handleRefresh = () => {
    if (window.confirm('Confirm will remove all newly added widgets.')) {
      localStorage.clear();
      setCategories(initialCategories);
      setClearStorageFlag(!clearStorageFlag);
    }
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: searchTerm
      ? category.widgets.filter(widget =>
          widget.widgetName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : category.widgets
  }));

  return (
    <div style={{ margin: 15 }}>
      <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 0 0 0'}}>
        <Search
          placeholder="Search Widgets"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: 250 }}
        />
        <Button style={{marginLeft: 5}} type="primary" onClick={() => setIsAddWidgetFormVisible(true)}>
          Add New Widget
        </Button>
        <Tooltip title="Reset widgets">
          <Button style={{ marginLeft: 5 }} type="default" onClick={handleRefresh}>
            <SyncOutlined />
          </Button>
        </Tooltip>
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
        onCancel={() => setIsAddWidgetFormVisible(false)}
        onSubmit={handleAddNewWidget}
      />

      <Drawer
        title="Add Widget"
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        footer={
          <div>
            <Button onClick={() => setIsDrawerVisible(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        }
      >
        <Tabs activeKey={activeTabKey} onChange={key => setActiveTabKey(key)}>
          {Object.keys(availableWidgets).map(tabKey => (
            <TabPane tab={tabKey === '1' ? 'CSPM' : tabKey === '2' ? 'CWPP' : tabKey === '3' ? 'Image' : `Other_${tabKey}`} key={tabKey}>
              {availableWidgets[tabKey].map(widget => (
                <div key={widget.widgetId}>
                  <Checkbox
                    checked={selectedWidgets.includes(widget.widgetId)}
                    onChange={e => {
                      const widgetId = widget.widgetId;
                      setSelectedWidgets(e.target.checked
                        ? [...selectedWidgets, widgetId]
                        : selectedWidgets.filter(id => id !== widgetId));
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

