export const initialCategories = [
    {
      categoryId: 1,
      categoryName: 'CSPM Executive Dashboard',
      widgets: [
        { widgetId: 1, widgetName: 'Cloud Accounts', widgetText: 'Random text for Widget 1', widgetType: 'pieChart', widgetData: [{'Connected': 2}, {'Not Connected': 2}] },
        { widgetId: 2, widgetName: 'Cloud Account Risk Assessment', widgetText: 'Random text for Widget 2', widgetType: 'pieChart', widgetData: [{'Failed':33}, {'Warning':20}, {'Not Available':14}, {'Passed':40}] }
      ]
    },
    {
      categoryId: 2,
      categoryName: 'CWPP Dashboard',
      widgets: [
        { widgetId: 3, widgetName: 'Top 5 Namespace Specific Alerts', widgetText: 'No Graph data available', widgetType: 'pieChart', widgetData: [] },
        { widgetId: 4, widgetName: 'Workload Alerts', widgetText: 'No Graph data available', widgetType: 'pieChart', widgetData: [] }
      ]
    },
    {
      categoryId: 3,
      categoryName: 'Registry Scan',
      widgets: [
        { widgetId: 5, widgetName: 'Image Risk Assessment', widgetText: 'Total Vulnerabilities', widgetType: 'straightPieChart', widgetData: [{'Critical':730}, {'High':320}, {'Moderate':210}, {'Low':140}] },
        { widgetId: 6, widgetName: 'Image Security Issues', widgetText: 'Total Images', widgetType: 'straightPieChart', widgetData: [{'Critical': 2}, {'High': 6}, {'Moderate': 5}, {'Low': 4}] }
      ]
    }
  ];

  export const availableWidgetsData = {
    1: [
      { widgetId: 1, widgetName: 'Cloud Accounts', widgetText: 'Random text for Widget 1', widgetType: 'pieChart', widgetData: [{'Connected': 2}, {'Not Connected': 0}] },
      { widgetId: 2, widgetName: 'Cloud Account Risk Assessment', widgetText: 'Random text for Widget 2', widgetType: 'pieChart', widgetData: [{'Failed':30}, {'Warning':20}, {'Not Available':10}, {'Passed':40}] }
    ],
    2: [
      { widgetId: 3, widgetName: 'Top 5 Namespace Specific Alerts', widgetText: 'No Graph data available', widgetType: 'pieChart', widgetData: [] },
      { widgetId: 4, widgetName: 'Workload Alerts', widgetText: 'No Graph data available', widgetType: 'pieChart', widgetData: [] }
    ],
    3: [
      { widgetId: 5, widgetName: 'Image Risk Assessment', widgetText: 'Total Vulnerabilities', widgetType: 'straightPieChart', widgetData: [{'Critical':730}, {'High':320}, {'Moderate':210}, {'Low':140}] },
      { widgetId: 6, widgetName: 'Image Security Issues', widgetText: 'Total Images', widgetType: 'straightPieChart', widgetData: [{'Critical': 2}, {'High': 6}, {'Moderate': 5}, {'Low': 4}] }
    ]
  };
  
  export const getCategoryOptions = [
    {label: 'CSPM Executive Dashboard', value: 'CSPM Executive Dashboard'},
    {label: 'CWPP Dashboard', value: 'CWPP Dashboard'},
    {label: 'Registry Scan', value: 'Registry Scan'},
  ]


