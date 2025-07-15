import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import CharacterListPage from "../pages/character-list-page";
import CharacterDetailPage from "../pages/character-detail-page";

const rootRoute = createRootRoute({
  component: () => (
    <div id="app-root">
      <Outlet />
    </div>
  ),
});

const characterListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CharacterListPage,
  validateSearch: (search: { page?: string }) => ({
    page: typeof search.page === "string" ? search.page : "1",
  }),
});

const characterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character/$id",
  component: CharacterDetailPage,
});

export const appRouteTree = rootRoute.addChildren([
  characterListRoute,
  characterDetailRoute,
]);
