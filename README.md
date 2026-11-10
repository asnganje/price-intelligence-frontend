# Price Intelligence Scraper – Frontend

A modern web dashboard for the **Price Intelligence Scraper**, built with React, TypeScript, Vite, and Tailwind CSS.

The frontend provides a centralized interface for monitoring scraping operations, managing products and retailers, tracking historical prices, and comparing product prices across Kenyan online retailers.

## Features

- **Dashboard:** Overview of products, retailers, prices, and scraping activity.
- **Products:** View and manage tracked products.
- **Retailers:** Access integrated retailer information.
- **Price Comparison:** Compare product prices across retailers.
- **Price History:** Monitor historical pricing data.
- **Scraping Jobs:** Initiate scraping operations and monitor job status.
- **API Integration:** Communicates with the FastAPI backend through REST endpoints.
- **Responsive UI:** Modern dashboard layout for different screen sizes.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Tailwind CSS | Styling |
| REST API | Backend communication |

## Screenshots

<!-- Add dashboard screenshots here -->

## Live Application

- **Frontend:** [Price Intelligence Scraper](https://price-intelligence-scraper.onrender.com/)
- **Backend API:** [Railway](https://web-scraping-api-production-501a.up.railway.app)
- **API Documentation:** [Swagger UI](https://web-scraping-api-production-501a.up.railway.app/docs)

## Local Development

Clone the repository:

```bash
git clone https://github.com/asnganje/price-intelligence-frontend.git
cd price-intelligence-frontend
```

Install dependencies:

```bash
npm install
```

Configure the backend API URL in your environment variables:

```env
VITE_API_BASE_URL=https://web-scraping-api-production-501a.up.railway.app/api/v1
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Backend Integration

This frontend connects to the [Price Intelligence Scraper API](https://github.com/asnganje/web-scraping-API), which handles:

- Product and retailer management.
- Web scraping orchestration.
- Price collection and updates.
- Historical price storage.
- Price comparison.

## Author

**Abdulrahman Nganje**

- GitHub: [@asnganje](https://github.com/asnganje)
- Frontend: [Repository](https://github.com/asnganje/price-intelligence-frontend)
- Backend: [Repository](https://github.com/asnganje/web-scraping-API)

*Turning retail pricing data into actionable market intelligence through a modern web interface.*