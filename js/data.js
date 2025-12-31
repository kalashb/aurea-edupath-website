// ============================================
// AUREA Edupath - Data Configuration
// Sensitive data is stored in private Google Sheets
// This file only contains the API endpoint and public config
// ============================================

// Google Apps Script API endpoint (you'll get this after setup)
// Replace with your actual deployed Google Apps Script URL
export const API_CONFIG = {
    // Set this to your Google Apps Script Web App URL after deployment
    endpoint: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',

    // Set to true once you've set up the Google Sheet
    isConfigured: false
};

// Class labels for display
export const CLASS_LABELS = {
    '1': 'Class 1',
    '2': 'Class 2',
    '3': 'Class 3',
    '4': 'Class 4',
    '5': 'Class 5',
    '6': 'Class 6',
    '7': 'Class 7',
    '8': 'Class 8',
    '9': 'Class 9',
    '10': 'Class 10',
    '11-science': 'Class 11 (Science)',
    '11-commerce': 'Class 11 (Commerce)',
    '11-arts': 'Class 11 (Arts)',
    '12-science': 'Class 12 (Science)',
    '12-commerce': 'Class 12 (Commerce)',
    '12-arts': 'Class 12 (Arts)',
    'graduate': 'Graduate'
};

// Demo mode - only used when Google Sheets is not configured
// Remove this in production or set isConfigured to true
export const DEMO_USER = {
    email: 'demo@aureaedupath.com',
    name: 'Demo Student',
    access_letter: 'DEMO',
    student_class: '10'
};

export const DEMO_RESOURCES = [
    {
        id: 'demo1',
        title: 'Welcome to AUREA Edupath!',
        description: 'This is a demo resource. Contact Mrs. Pallavi to get full access.',
        category: 'Demo',
        class_levels: ['*'],
        link: '#',
        date: new Date().toISOString().split('T')[0]
    }
];

export const DEMO_EXAMS = [
    {
        name: 'Demo Exam',
        date: '2025-06-01',
        applicable_classes: ['*'],
        registration_deadline: '2025-05-01'
    }
];
