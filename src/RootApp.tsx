import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { appRouteTree } from "./routes/routeTree";
import "./index.css";

const queryClient = new QueryClient();
const router = createRouter({ routeTree: appRouteTree });

export default function RootApp() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f7f8fa",
      }}
    >
      <header
        style={{
          background: "#24292f",
          color: "#fff",
          padding: "1rem 2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "-1px",
          }}
        >
          Rick & Morty Explorer
        </h1>
      </header>
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 1rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            padding: "2rem",
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </div>
      </main>
      <footer style={{ textAlign: "center", color: "#888", padding: "1rem 0" }}>
        <small>Powered by Rick & Morty API & Tanstack</small>
      </footer>
    </div>
  );
}
