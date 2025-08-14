import { Routes, Route } from 'react-router-dom';
import { AboutPage } from '../Pages/AboutPage';
import { EditorPage } from '../pages/EditorPage';
import { FreebiesPage } from '../Pages/FreebiesPage';
import { PageNotFound } from '../Pages/PageNotFound';

function AppRoutes(props) {
  return (
    <Routes>
      {/* index matches on default/home URL: / */}
      <Route index element={<EditorPage {...props} />} />

      <Route path="/about" element={<AboutPage {...props} />} />
      <Route path="/editor" element={<EditorPage {...props} />} />
      <Route path="/freebies" element={<FreebiesPage {...props} />} />

      {/* special route to handle if none of the above match */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
