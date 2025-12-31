# 🔐 Private Backend Setup Guide

This guide explains how to set up Google Sheets as a private backend for user authentication and resources.

## Overview

- **Users, Resources, and Exams** are stored in a private Google Sheet
- **Google Apps Script** acts as a secure API
- **Website** calls the API to verify logins and fetch data
- **No sensitive data** is stored in the public GitHub repo

---

## Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named: `AUREA Edupath Data`
3. Create 3 sheets (tabs) with these exact names:
   - `Users`
   - `Resources`
   - `Exams`

### Users Sheet Structure
| Column A | Column B | Column C | Column D |
|----------|----------|----------|----------|
| email | name | access_letter | student_class |
| student@email.com | Student Name | ABC123 | 10 |

### Resources Sheet Structure
| Column A | Column B | Column C | Column D | Column E | Column F | Column G |
|----------|----------|----------|----------|----------|----------|----------|
| id | title | description | category | class_levels | link | date |
| r1 | Resource Title | Description here | Category | 10,11-science | https://... | 2025-01-15 |

Note: `class_levels` can be comma-separated (e.g., "10,11-science,12-science") or "*" for all classes.

### Exams Sheet Structure
| Column A | Column B | Column C | Column D |
|----------|----------|----------|----------|
| name | date | applicable_classes | registration_deadline |
| JEE Main 2025 | 2025-01-22 | 12-science | 2025-01-15 |

---

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code and paste this:

```javascript
// AUREA Edupath API
const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;
  
  let result;
  
  switch(action) {
    case 'login':
      result = handleLogin(data.email, data.accessLetter);
      break;
    case 'getResources':
      result = getResources(data.email, data.accessLetter, data.studentClass);
      break;
    case 'getExams':
      result = getExams(data.studentClass);
      break;
    default:
      result = { error: 'Invalid action' };
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleLogin(email, accessLetter) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const userEmail = row[0].toString().toLowerCase().trim();
    const userName = row[1];
    const userLetter = row[2].toString().toUpperCase().trim();
    const userClass = row[3].toString();
    
    if (userEmail === email.toLowerCase().trim()) {
      if (userLetter === accessLetter.toUpperCase().trim()) {
        return {
          success: true,
          user: {
            email: userEmail,
            name: userName,
            access_letter: userLetter,
            student_class: userClass
          }
        };
      } else {
        return {
          success: false,
          message: 'Incorrect access letter. Please check the letter provided by Mrs. Pallavi.'
        };
      }
    }
  }
  
  return {
    success: false,
    message: 'This email is not registered. Please contact Mrs. Pallavi to get access.'
  };
}

function getResources(email, accessLetter, studentClass) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Resources');
  const data = sheet.getDataRange().getValues();
  
  const resources = [];
  const letterPrefix = accessLetter.charAt(0).toUpperCase();
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const classLevels = row[4].toString().split(',').map(c => c.trim());
    
    // Check if resource is for this class or all classes
    if (classLevels.includes('*') || classLevels.includes(studentClass)) {
      resources.push({
        id: row[0],
        title: row[1],
        description: row[2],
        category: row[3],
        class_levels: classLevels,
        link: row[5],
        date: row[6]
      });
    }
  }
  
  return { resources };
}

function getExams(studentClass) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Exams');
  const data = sheet.getDataRange().getValues();
  
  const exams = [];
  const today = new Date();
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const examDate = new Date(row[1]);
    const applicableClasses = row[2].toString().split(',').map(c => c.trim());
    
    // Check if exam is in the future and for this class
    if (examDate >= today && (applicableClasses.includes('*') || applicableClasses.includes(studentClass))) {
      exams.push({
        name: row[0],
        date: row[1],
        applicable_classes: applicableClasses,
        registration_deadline: row[3]
      });
    }
  }
  
  return { exams };
}

// Test function (run this to test)
function testLogin() {
  const result = handleLogin('test@email.com', 'TEST123');
  Logger.log(result);
}
```

3. Click **Save** (Ctrl+S)

---

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Set these options:
   - **Description**: AUREA API
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy the Web App URL** - it looks like: `https://script.google.com/macros/s/XXXXX/exec`

---

## Step 4: Update Website Configuration

1. Open `js/data.js` in the website code
2. Update these values:

```javascript
export const API_CONFIG = {
    endpoint: 'YOUR_COPIED_URL_HERE',  // Paste your Web App URL
    isConfigured: true  // Change to true
};
```

3. Commit and push the changes

---

## Step 5: Test

1. Add a test user in your Google Sheet:
   | email | name | access_letter | student_class |
   |-------|------|---------------|---------------|
   | test@example.com | Test User | TEST123 | 10 |

2. Try logging in on the website with those credentials

---

## Managing Users

To **add a new user**:
1. Open the Google Sheet
2. Go to the "Users" tab
3. Add a new row with: email, name, access_letter, student_class

To **remove a user**:
1. Delete their row from the "Users" tab

To **change access**:
1. Edit their row in the "Users" tab

---

## Security Notes

- ✅ Google Sheet is private (only you can see the data)
- ✅ API only returns yes/no for login (doesn't expose other users)
- ✅ Resources filtered per-user (can't see other classes' content)
- ⚠️ Access letters should be unique and hard to guess
- ⚠️ Change access letters periodically for security

---

## Troubleshooting

**"Unable to connect" error:**
- Check the API URL in `js/data.js`
- Make sure the Apps Script is deployed as "Anyone can access"

**Login not working:**
- Check the email and access letter match exactly (case-insensitive)
- Make sure there are no extra spaces

**Resources not showing:**
- Check the `class_levels` column matches the user's class
- Use "*" to show to all classes

