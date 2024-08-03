# ReactJs App Developer Assignment

## Tech Stack Description

- **React + Vite**: Using them together can provide an efficient development environment, allows to build modern web applications with better performance and user experience.
- **Tailwind CSS**: Using Tailwind allows extensive customization and avoids pre-built component styles, offering flexibility in design.
- **Redux**: Using redux to for State management and to avoid unnecessary API calls, which provides flexible and efficient way to manage application.

## Setup Guide

To get started with this project, follow the instructions below:

### Prerequisites

Ensure the following must have been installed:

- **[Node.js](https://nodejs.org/)**
- **[npm](https://www.npmjs.com/)**

### Installation

1. **Clone the repository**

```
  git clone https://github.com/Nafis5478/Rewards-Dashboard.git
  cd .\rewards-dashboard\
```

2. Installing Dependencies

using npm:

```
  npm install
```

Dependencies installed/ used are:

- React router dom
- React icons
- Redux
- Redux Thunk
- Reduxjs Toolkit

## Development

To start the server and view the application in your browser:

```
  npm run dev
```

After running this in terminal, the server will be started and can be view on `http://localhost:5173` on your browser.

## Project Components:

- `src/`: Contains the source code for the application
  - `Components/`: This folder contains a React Component named as Navbar.
  - `Pages/`: This folder contains two application `pages` viz. `RewardsDetails` and `RewardsList`
  - `redux`: This folder contains two folder viz `rewardsSlice.js` and `store.js`
  - `App.jsx`: Main application component
  - `main.jsx`: Entry point of the application.
- `public/`: It usually contains static asset and html files (No contents).
- `vite.config.js`: Vite configuration file
- `tailwind.config.js`: Tailwind CSS configuration file
