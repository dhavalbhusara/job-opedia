# Jobopedia — National Govt & Corporate Career Portal

A complete, high-performance, responsive, and standalone career portal built for India's job aspirants, corporate seekers, and exam candidates.

---

## 📁 Project Directory Structure

```text
job-portal-main/
│
├── index.html        # Main Public Portal (Calendar, Jobs Feed, Mock Tests, AI Bot)
├── admin.html        # Dual Admin Control Center (HR + Dhaval/Tushar Bulk JSON)
├── style.css         # Primary stylesheet (Inter font, responsive grid, modal system)
├── script.js         # Reactive data engine, localStorage persistence & filters
│
├── css/
│   └── style.css     # Mirror stylesheet for directory-based setups
├── js/
│   └── script.js     # Mirror JavaScript for directory-based setups
│
├── images/           # Brand icons, emblems, department SVGs and banners
│   ├── jobopedia-icon.png
│   ├── emblem-logo.png
│   ├── auth-bg.png
│   └── departments/
│       ├── upsc.svg
│       ├── ssc.svg
│       ├── railway.svg
│       ├── banking.svg
│       └── defence.svg
│
└── README.md         # Documentation & user instructions
```

---

## 🚀 Key Features Implemented

1. **Weekly Government Job Calendar (Dates 1st to 7th)**:
   - Daily job cards highlighting department, post title, vacancies, and salary in INR.
   - Clickable pop-up modal displaying **full job description**, official eligibility, pay scale, and direct application links.

2. **All India Job Directory with State-Wise Filter**:
   - Filter by Category: All Vacancies, Sarkari Jobs, Private Corporate Jobs, Internships.
   - **Filter Logic**:
     - Central / State **Government Jobs** are visible for all candidates across India.
     - **Private Corporate Jobs** automatically filter according to the candidate's selected state (Maharashtra, Delhi NCR, Gujarat, Karnataka, etc.).
   - Qualification filters: 10th Pass, 12th Pass, Graduate, B.Tech / Engineering.

3. **National Mock Test Series & MCQs**:
   - UPSC Civil Services GS Paper 1 and SSC CGL Full Length Mock Tests.
   - **Delayed Answer Evaluation**: Candidate selects answers freely without immediate reveal; full answers and detailed explanations are displayed only after clicking **"Submit Test"**.
   - **Export / Download PDF**: One-click print/PDF export for offline revision.

4. **AI Resume Keyword Optimizer**:
   - Generates high-ATS keywords and headline summaries tailored to the candidate's target job role to maximize HR shortlisting.

5. **Official Cyber Cafe Online Application Desk**:
   - Direct 1-click WhatsApp helpline integration for candidates needing assistance with error-free application form submission.

6. **Dual Admin Control Center (`admin.html`)**:
   - **Dhaval & Tushar Personal Bulk JSON Engine**:
     - Bulk JSON Job Uploader with live schema validation and instant localStorage update.
     - Bulk JSON MCQ Uploader with exam category selector.
   - **HR Single Job Post Form**:
     - Post vacancies with custom titles, salaries, departments, deadlines, and descriptions.
   - **Candidate Profiles & ATS Tracker**:
     - View candidate details (Name, WhatsApp Phone, Email, State, Qualification, Target Vacancy).
     - One-click WhatsApp message button and resume inspection.
     - One-click export to CSV spreadsheet.

7. **Floating AI Career Assistant**:
   - Interactive prompt buttons answering queries on Sarkari notifications, syllabus roadmaps, and resume preparation.

---

## 💻 How to Run

No web server or node installation is required! 

1. Simply double-click **`index.html`** in any web browser (Google Chrome, Microsoft Edge, Firefox, Safari, or mobile browser).
2. To manage jobs, MCQs, or view candidate applications, open **`admin.html`**.
3. All added jobs, uploaded JSON arrays, and candidate actions are automatically saved in browser `localStorage`.
