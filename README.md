BugTrack — Bug Tracking & QA Dashboard

A modern, responsive bug tracking and quality assurance dashboard built with React and TypeScript.

BugTrack provides a centralised interface for managing software bugs, monitoring issue severity, tracking report statuses, and organising QA workflows.

Features

* Dashboard Overview — View bug statistics and issue summaries.
* Bug Reports — Browse and manage reported software issues.
* Create Bug Reports — Submit new bug reports with relevant details.
* Search — Quickly find specific bug reports.
* Status Filtering — Filter issues by their current status.
* Severity Filtering — Organise bugs according to severity.
* Issue Details — Capture descriptions, reproduction steps, expected and actual results, browser and device information.
* Responsive Interface — Designed for different screen sizes.
* Modern UI — Dark-themed dashboard with a clean, professional interface.

Tech Stack

* React
* TypeScript
* Vite
* CSS
* JavaScript / ES Modules

Getting Started

Prerequisites

* Node.js
* npm
* Git

Installation

Clone the repository:

git clone https://github.com/wickedceo/bugtrack.git

Navigate into the application:

cd bugtrack/app

Install dependencies:

npm install

Start the development server:

npm run dev

To run inside GitHub Codespaces:

npm run dev -- --host 0.0.0.0

Current Data Handling

BugTrack currently uses in-memory application state for its demonstration data. Reports are not yet connected to a persistent database, so changes reset when the application is refreshed.

Project Structure

bugtrack/
├── app/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── README.md
└── LICENSE

Project Status

Active development.

Author

WICKEDCEO

GitHub: https://github.com/wickedceo

⸻

Built as a software development and QA portfolio project.