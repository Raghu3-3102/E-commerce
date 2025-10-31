# E-commerce
E-commerce store  website

#  E-commerce Store
A modern and responsive e-commerce web application built using **React + TypeScript + Tailwind CSS**.

---

##  Prerequisites

Make sure these are installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager

---

##  How to Run the Project

```bash
# Clone the repository
git clone https://github.com/Raghu3-3102/E-commerce.git

# Move to the project folder
cd E-commerce

# Install dependencies
npm install

# Run the project
npm run dev



## Architecture & Decisions
   
    src/
├── components/          # UI components (Header, ProductCard, SearchBar, Loading)
├── context/             # Global state (CartContext, ThemeContext)
├── hooks/               # Custom hooks (useProducts)
├── pages/               # Pages (Home, ProductDetail, Cart)
├── types/               # TypeScript interfaces
└── utils/               # Helper functions


# State Management (React Context + TypeScript)

Cart Context: Add/remove items, update quantity, persists via localStorage

Theme Context: Dark/light mode + system preference detection

No external state libraries → lightweight & fast


# Core Features

Smart Search + Filters: Debounced search, sorting (price/name/rating)

Shopping Cart: Quantity update, auto total calculation, persistent cart

Dark Mode: Auto/system detection + smooth transitions

Responsive UI: Tailwind + Grid/Flex, mobile-first

#API Using Fake Store API

GET /products

GET /products/:id

# Performance

Code splitting with React.lazy

Memoization with useMemo


## Known Issues / Trade-offs

- Fake Store API occasionally responds slowly (external API limitation).
- React Context is used for global state — lightweight for now, but may not scale like Redux.










 
      

