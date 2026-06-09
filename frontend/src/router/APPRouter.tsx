import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// @ts-ignore: allow missing module type declarations for pages
import HomePage from "../pages/HomePage";
// @ts-ignore: allow missing module type declarations for pages
import LessonPage from "../pages/LessonPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/lesson/:id"
          element={<LessonPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;