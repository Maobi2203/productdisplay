# Product Dashboard

## Setup

1. Clone the repo:
   git clone https://github.com/Maobi2203/productdisplay
2. Install dependencies:
   npm install
3. Run the project:
   npm run dev

## Design Decisions

- Used **React** for UI and **React Query** for data fetching.
- Filters and pagination implemented on client-side.
- Added product chart with **Recharts** for trends.
- Mocked login with localStorage token.

## Trade-offs

- Auth is fake (for demo only).
- the username is admin and the password is 1234
- Chart updates only for current page products, not full dataset.
- No backend update or real DB interaction.

## Next Steps

- refctor codes to make th codebase clearner
- Implement real login/auth backend.
- Add create/update/delete product functionality.
- Improve charts with brand trends over all pages.
