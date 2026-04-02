# Findash
A simple finance Dashboard that lets users track their Finances.

# Findash – Premium Financial Dashboard  

Findash is a modern financial management dashboard built with **React, TypeScript, and Tailwind CSS**. It helps you understand your money better by showing clear insights into your spending, transactions, and overall financial health—all through a clean and easy-to-use interface.

------------------------------------------------------------------------------------------------------------------------------

## 🚀 What Findash Offers  

### 1. Smart Dashboard  
- **Live Updates**: Instantly see your balance, income, and expenses.  
- **Visual Charts**: Track money flow with bar charts and see expense breakdowns with donut charts.  
- **Recent Activity**: Quickly check your latest transactions with merchant logos and status tags.  

### 2. Manage Transactions  
- **Add, Edit, Delete**: Full control over your transactions with a simple modal.  
- **Filter & Sort**: Organize by date, category, or amount.  
- **Mobile-Friendly**: Tables turn into easy-to-read cards on smaller screens.  

### 3. Financial Insights  
- **Health Score**: A gauge that shows how healthy your finances are.  
- **Savings Goals**: Track progress with interactive progress bars.  
- **Smart Metrics**: See your top merchant, savings rate, and weekly spending average.  

### 4. Sleek User Experience  
- **Light & Dark Mode**: Switch themes smoothly with a global manager.  
- **Premium Design**: Custom components with gradients, shadows, and 3D-style cards.  
- **Smooth Animations**: Powered by Motion for fluid transitions.  
- **Instant Feedback**: Toast notifications for actions like saving or deleting.  

### 5. Role-Based Access  
- **Admin**: Full control over transactions and insights.  
- **Viewer**: Read-only access with limited management options.  

## 🛠️ Tech Stack  
- **Frontend**: React 18, TypeScript, Vite  
- **Styling**: Tailwind CSS  
- **Icons**: Lucide React  
- **Charts**: Recharts  
- **Animations**: Motion (Framer Motion)  
- **State Management**: React Context API & Custom Hooks
  
------------------------------------------------------------------------------------------------------------------------------

## 📦 Getting Started  

### Requirements  
- Node.js v18+  
- npm or yarn  

### Setup  
1. Clone the repo:  
   git clone <repository-url>
   cd findash

2. Install dependencies:  
   npm install

3. Start development server:  
   npm run dev

4. Build for production:  
   npm run build
   
----------------------------------------------------------------------------------------------------------------------------

## 🧠 How It’s Built  

### Modular Components  
Every feature (charts, sidebar, header, forms) is its own component, making the app easy to scale and maintain.  

### Centralized State  
- **Transactions**: Managed with a custom `useTransactions` hook.  
- **Theme**: Controlled globally with a `ThemeProvider`.  
- **Feedback**: Toasts handled by a `ToastProvider` for consistent notifications.  

### Responsive & Accessible  
- Mobile-first design with Tailwind utilities.  
- Sidebar stays fixed on desktop, becomes a slide-over menu on mobile.  
- Clear hover and focus states for accessibility.  

### Performance  
- **Vite**: Fast builds and dev server.  
- **Recharts**: Efficient SVG charts.  
- **Motion**: Smooth animations without slowing things down.  

