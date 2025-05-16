import { Routes, Route } from "react-router-dom";
import { HomePage } from "../Pages/HomePage";
import { EditorPage } from "../pages/EditorPage";
import { GalleryPage } from "../Pages/GalleryPage";
import { FreebiesPage } from "../Pages/FreebiesPage";
import { PageNotFound } from "../Pages/PageNotFound";


function AppRoutes(props) {
  return (
    <Routes>
      {/* index matches on default/home URL: / */}
      <Route index element={<HomePage {...props} />} />

      <Route path="/home" element={<HomePage {...props} />} />
      <Route path="/editor" element={<EditorPage {...props} />} />
      <Route path="/gallery" element={<GalleryPage {...props} />} />
      <Route path="/freebies" element={<FreebiesPage {...props} />} />

      {/* special route to handle if none of the above match */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
