import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import ProductsPage from "../pages/products/ProductPage";

// Mock recharts
vi.mock("recharts", () => ({
  LineChart: () => null,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  ResponsiveContainer: ({ children }) => children,
}));

// Mock fetch hook correctly
vi.mock("../pages/products/hooks/useFetchProducts", () => ({
  default: () => ({
    data: {
      products: [
        {
          id: 1,
          title: "Test Product",
          brand: "Apple",
          price: 1000,
          category: "Electronics",
        },
      ],
    },
    isLoading: false,
    error: null,
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

describe("ProductsPage", () => {
  test("renders Products heading", async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <ProductsPage />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    const heading = await screen.findByText(/Products/i);
    expect(heading).toBeInTheDocument();

    // Optional: check if mocked product is rendered
    const productItem = screen.getByText(/Test Product/i);
    expect(productItem).toBeInTheDocument();
  });
});
