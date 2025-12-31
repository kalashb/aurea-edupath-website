// ============================================
// AUREA Edupath - Data Store
// This file contains valid access letters and resources
// Admin can update this file to manage access
// ============================================

// Valid access letters and their allowed class levels
// Format: { letter: [allowed_classes] }
// Use '*' to allow all classes
export const VALID_ACCESS_LETTERS = {
    'A': ['10', '11-science', '11-commerce', '11-arts', '12-science', '12-commerce', '12-arts'],
    'B': ['8', '9', '10'],
    'C': ['11-science', '12-science'],
    'D': ['11-commerce', '12-commerce'],
    'E': ['11-arts', '12-arts'],
    'F': ['graduate'],
    'DEMO': ['*'], // Demo letter for testing - allows all classes
};

// Resources organized by access letter
// Each resource has: title, description, category, class_levels, link, date
export const RESOURCES = {
    'A': [
        {
            id: 'a1',
            title: 'Complete Stream Selection Guide',
            description: 'Comprehensive guide to choosing between Science, Commerce, and Arts after Class 10.',
            category: 'Stream Selection',
            class_levels: ['10'],
            link: '#',
            date: '2025-01-15'
        },
        {
            id: 'a2',
            title: 'JEE Main 2025 - Complete Syllabus',
            description: 'Updated syllabus and exam pattern for JEE Main 2025 with chapter-wise weightage.',
            category: 'Exam Preparation',
            class_levels: ['11-science', '12-science'],
            link: '#',
            date: '2025-01-10'
        },
        {
            id: 'a3',
            title: 'NEET 2025 - Study Plan',
            description: '6-month study plan for NEET aspirants with daily schedule and resources.',
            category: 'Exam Preparation',
            class_levels: ['11-science', '12-science'],
            link: '#',
            date: '2025-01-08'
        },
        {
            id: 'a4',
            title: 'CA Foundation Preparation Guide',
            description: 'Complete roadmap for CA Foundation exam preparation.',
            category: 'Exam Preparation',
            class_levels: ['11-commerce', '12-commerce'],
            link: '#',
            date: '2025-01-05'
        },
        {
            id: 'a5',
            title: 'Top Design Colleges in India',
            description: 'List of top NID, NIFT, and other design colleges with admission process.',
            category: 'College Counseling',
            class_levels: ['11-arts', '12-arts'],
            link: '#',
            date: '2024-12-28'
        }
    ],
    'B': [
        {
            id: 'b1',
            title: 'Class 8-9 Career Awareness Module',
            description: 'Introduction to different career paths and how to start preparing early.',
            category: 'Career Guidance',
            class_levels: ['8', '9'],
            link: '#',
            date: '2025-01-12'
        },
        {
            id: 'b2',
            title: 'Board Exam Preparation Tips',
            description: 'Proven strategies for Class 10 board exam preparation.',
            category: 'Exam Preparation',
            class_levels: ['10'],
            link: '#',
            date: '2025-01-08'
        },
        {
            id: 'b3',
            title: 'Time Management for Students',
            description: 'How to balance studies, hobbies, and rest effectively.',
            category: 'Study Skills',
            class_levels: ['8', '9', '10'],
            link: '#',
            date: '2024-12-20'
        }
    ],
    'C': [
        {
            id: 'c1',
            title: 'IIT Preparation Roadmap',
            description: 'Year-by-year preparation strategy for JEE Advanced.',
            category: 'Exam Preparation',
            class_levels: ['11-science', '12-science'],
            link: '#',
            date: '2025-01-14'
        },
        {
            id: 'c2',
            title: 'Physics Problem Solving Techniques',
            description: 'Master techniques for solving complex physics problems.',
            category: 'Study Materials',
            class_levels: ['11-science', '12-science'],
            link: '#',
            date: '2025-01-10'
        },
        {
            id: 'c3',
            title: 'Chemistry Quick Revision Notes',
            description: 'Condensed notes for quick revision before exams.',
            category: 'Study Materials',
            class_levels: ['11-science', '12-science'],
            link: '#',
            date: '2025-01-05'
        }
    ],
    'D': [
        {
            id: 'd1',
            title: 'Commerce Career Paths',
            description: 'Exploring all career options after Commerce - CA, CS, MBA, and more.',
            category: 'Career Guidance',
            class_levels: ['11-commerce', '12-commerce'],
            link: '#',
            date: '2025-01-13'
        },
        {
            id: 'd2',
            title: 'Accountancy Made Easy',
            description: 'Simplified concepts and practice problems for accountancy.',
            category: 'Study Materials',
            class_levels: ['11-commerce', '12-commerce'],
            link: '#',
            date: '2025-01-08'
        }
    ],
    'E': [
        {
            id: 'e1',
            title: 'Arts Stream Career Guide',
            description: 'Discover diverse career paths in humanities and arts.',
            category: 'Career Guidance',
            class_levels: ['11-arts', '12-arts'],
            link: '#',
            date: '2025-01-11'
        },
        {
            id: 'e2',
            title: 'CUET Preparation Materials',
            description: 'Complete preparation guide for CUET exam.',
            category: 'Exam Preparation',
            class_levels: ['12-arts'],
            link: '#',
            date: '2025-01-06'
        }
    ],
    'F': [
        {
            id: 'f1',
            title: 'MBA Entrance Exam Guide',
            description: 'CAT, XAT, GMAT - complete preparation strategy.',
            category: 'Exam Preparation',
            class_levels: ['graduate'],
            link: '#',
            date: '2025-01-12'
        },
        {
            id: 'f2',
            title: 'Study Abroad - Complete Guide',
            description: 'Everything you need to know about studying abroad - applications, scholarships, visa.',
            category: 'Study Abroad',
            class_levels: ['graduate'],
            link: '#',
            date: '2025-01-09'
        },
        {
            id: 'f3',
            title: 'Resume Building Workshop',
            description: 'Create an impactful resume that gets you interviews.',
            category: 'Career Development',
            class_levels: ['graduate'],
            link: '#',
            date: '2025-01-03'
        }
    ],
    'DEMO': [
        {
            id: 'demo1',
            title: 'Welcome to AUREA Edupath!',
            description: 'This is a demo resource. Subscribe to access full content tailored to your class.',
            category: 'Demo',
            class_levels: ['*'],
            link: '#',
            date: '2025-01-01'
        }
    ]
};

// Upcoming exams data
export const UPCOMING_EXAMS = [
    {
        name: 'JEE Main 2025 - Session 1',
        date: '2025-01-22',
        applicable_classes: ['12-science'],
        registration_deadline: '2025-01-15'
    },
    {
        name: 'NEET UG 2025',
        date: '2025-05-04',
        applicable_classes: ['12-science'],
        registration_deadline: '2025-03-15'
    },
    {
        name: 'CUET UG 2025',
        date: '2025-05-15',
        applicable_classes: ['12-science', '12-commerce', '12-arts'],
        registration_deadline: '2025-04-01'
    },
    {
        name: 'CA Foundation - May 2025',
        date: '2025-05-14',
        applicable_classes: ['12-commerce', 'graduate'],
        registration_deadline: '2025-03-20'
    },
    {
        name: 'CLAT 2025',
        date: '2025-12-01',
        applicable_classes: ['12-science', '12-commerce', '12-arts'],
        registration_deadline: '2025-10-15'
    }
];

