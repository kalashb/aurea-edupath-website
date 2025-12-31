// ============================================
// AUREA Edupath - Authentication System
// Uses Google Sheets as private backend
// ============================================

import { API_CONFIG, CLASS_LABELS, DEMO_USER, DEMO_RESOURCES, DEMO_EXAMS } from './data.js';

const SESSION_KEY = 'aurea_session';

// ============================================
// API Functions (calls Google Apps Script)
// ============================================

async function callAPI(action, data = {}) {
    if (!API_CONFIG.isConfigured) {
        // Demo mode - use local demo data
        return { demo: true };
    }

    try {
        const response = await fetch(API_CONFIG.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, ...data })
        });
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { error: 'Unable to connect. Please try again.' };
    }
}

// ============================================
// Authentication Functions
// ============================================

export const auth = {
    // Login with email and access letter
    async login(email, accessLetter) {
        const normalizedEmail = email.toLowerCase().trim();
        const normalizedLetter = accessLetter.toUpperCase().trim();

        // Demo mode check
        if (!API_CONFIG.isConfigured) {
            if (normalizedEmail === DEMO_USER.email && normalizedLetter === DEMO_USER.access_letter) {
                const session = {
                    user: { ...DEMO_USER, id: 'demo' },
                    created_at: new Date().toISOString()
                };
                localStorage.setItem(SESSION_KEY, JSON.stringify(session));
                return { data: { session, user: session.user }, error: null };
            }
            return {
                error: {
                    message: 'Demo mode: Use demo@aureaedupath.com with access letter DEMO'
                }
            };
        }

        // Production mode - call API
        const result = await callAPI('login', {
            email: normalizedEmail,
            accessLetter: normalizedLetter
        });

        if (result.error) {
            return { error: { message: result.error } };
        }

        if (!result.success) {
            return {
                error: {
                    message: result.message || 'Login failed. Please check your credentials.'
                }
            };
        }

        // Create session
        const session = {
            user: {
                id: normalizedEmail,
                email: normalizedEmail,
                name: result.user.name,
                student_class: result.user.student_class,
                access_letter: result.user.access_letter
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

    // Auth state change listener
    onAuthStateChange(callback) {
        const session = this.getSession();
        callback(session ? 'SIGNED_IN' : 'SIGNED_OUT', session);
    }
};

// ============================================
// Database Functions
// ============================================

export const db = {
    // Get resources for current user
    async getResourcesForUser(user) {
        if (!user) return [];

        // Demo mode
        if (!API_CONFIG.isConfigured) {
            return DEMO_RESOURCES;
        }

        // Production mode - call API
        const result = await callAPI('getResources', {
            email: user.email,
            accessLetter: user.access_letter,
            studentClass: user.student_class
        });

        if (result.error || !result.resources) {
            return DEMO_RESOURCES;
        }

        return result.resources;
    },

    // Get upcoming exams for user's class
    async getUpcomingExamsForUser(user) {
        if (!user) return [];

        // Demo mode
        if (!API_CONFIG.isConfigured) {
            return DEMO_EXAMS;
        }

        // Production mode - call API
        const result = await callAPI('getExams', {
            studentClass: user.student_class
        });

        if (result.error || !result.exams) {
            return DEMO_EXAMS;
        }

        return result.exams;
    },

    // Get user profile
    getUserProfile(email) {
        const session = auth.getSession();
        if (session && session.user.email === email.toLowerCase()) {
            return session.user;
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
    return CLASS_LABELS[classCode] || classCode;
}

// Export for global access
window.AureaAuth = { auth, db, formatDate, getClassLabel };
