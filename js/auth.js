// ============================================
// AUREA Edupath - Authentication System
// Simple localStorage-based auth for demo purposes
// Replace with Supabase or other backend for production
// ============================================

import { VALID_ACCESS_LETTERS, RESOURCES, UPCOMING_EXAMS } from './data.js';

const USERS_KEY = 'aurea_users';
const SESSION_KEY = 'aurea_session';

// ============================================
// User Management
// ============================================

function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : {};
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ============================================
// Authentication Functions
// ============================================

export const auth = {
    // Check if access letter is valid for the given class
    validateAccessLetter(letter, studentClass) {
        const upperLetter = letter.toUpperCase();
        const allowedClasses = VALID_ACCESS_LETTERS[upperLetter];

        if (!allowedClasses) {
            return { valid: false, error: 'Invalid access letter. Please check the letter provided by Mrs. Pallavi.' };
        }

        // '*' means all classes are allowed
        if (allowedClasses.includes('*') || allowedClasses.includes(studentClass)) {
            return { valid: true };
        }

        return {
            valid: false,
            error: `This access letter is not valid for your class level. Please contact Mrs. Pallavi for the correct letter.`
        };
    },

    // Sign up a new user
    signUp(email, password, userData) {
        const users = getUsers();
        const normalizedEmail = email.toLowerCase().trim();

        // Check if user already exists
        if (users[normalizedEmail]) {
            return { error: { message: 'An account with this email already exists. Please login instead.' } };
        }

        // Validate access letter
        const letterValidation = this.validateAccessLetter(userData.access_letter, userData.student_class);
        if (!letterValidation.valid) {
            return { error: { message: letterValidation.error } };
        }

        // Create user
        const user = {
            id: Date.now().toString(),
            email: normalizedEmail,
            password: btoa(password), // Simple encoding (use proper hashing in production)
            name: userData.name,
            phone: userData.phone || '',
            student_class: userData.student_class,
            access_letter: userData.access_letter.toUpperCase(),
            created_at: new Date().toISOString()
        };

        users[normalizedEmail] = user;
        saveUsers(users);

        return { data: { user }, error: null };
    },

    // Sign in existing user
    signIn(email, password) {
        const users = getUsers();
        const normalizedEmail = email.toLowerCase().trim();
        const user = users[normalizedEmail];

        if (!user) {
            return { error: { message: 'No account found with this email. Please sign up first.' } };
        }

        if (user.password !== btoa(password)) {
            return { error: { message: 'Incorrect password. Please try again.' } };
        }

        // Create session
        const session = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                student_class: user.student_class,
                access_letter: user.access_letter
            },
            created_at: new Date().toISOString()
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(session));

        return { data: { session, user: session.user }, error: null };
    },

    // Sign out
    signOut() {
        localStorage.removeItem(SESSION_KEY);
        return { error: null };
    },

    // Get current session
    getSession() {
        const session = localStorage.getItem(SESSION_KEY);
        return session ? JSON.parse(session) : null;
    },

    // Get current user
    getUser() {
        const session = this.getSession();
        return session ? session.user : null;
    },

    // Check if user is authenticated
    isAuthenticated() {
        return this.getSession() !== null;
    },

    // Auth state change listener (simplified)
    onAuthStateChange(callback) {
        const session = this.getSession();
        callback(session ? 'SIGNED_IN' : 'SIGNED_OUT', session);
    }
};

// ============================================
// Database Functions
// ============================================

export const db = {
    // Validate access letter (used during signup)
    validateAccessLetter(letter) {
        const upperLetter = letter.toUpperCase();
        return VALID_ACCESS_LETTERS.hasOwnProperty(upperLetter);
    },

    // Get resources for current user
    getResourcesForUser(user) {
        if (!user) return [];

        const userLetter = user.access_letter.toUpperCase();
        const userClass = user.student_class;
        const resources = RESOURCES[userLetter] || [];

        // Filter resources by class level
        return resources.filter(resource => {
            if (resource.class_levels.includes('*')) return true;
            return resource.class_levels.includes(userClass);
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    // Get upcoming exams for user's class
    getUpcomingExamsForUser(user) {
        if (!user) return [];

        const userClass = user.student_class;
        const today = new Date();

        return UPCOMING_EXAMS.filter(exam => {
            const examDate = new Date(exam.date);
            return examDate >= today && exam.applicable_classes.includes(userClass);
        }).sort((a, b) => new Date(a.date) - new Date(b.date));
    },

    // Get user profile
    getUserProfile(userId) {
        const users = getUsers();
        for (const email in users) {
            if (users[email].id === userId) {
                const user = { ...users[email] };
                delete user.password; // Don't return password
                return user;
            }
        }
        return null;
    }
};

// ============================================
// Utility Functions
// ============================================

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export function getClassLabel(classCode) {
    const labels = {
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
    return labels[classCode] || classCode;
}

// Export for global access if needed
window.AureaAuth = { auth, db, formatDate, getClassLabel };

