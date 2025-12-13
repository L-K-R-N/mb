import CursorProvider from "./providers/CursorProvider";
import { AppRouter } from "./providers/router/ui/RouterProvider";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
const App = () => (
   <>
      <SmoothScrollProvider>
         <CursorProvider>
            <AppRouter />
         </CursorProvider>
      </SmoothScrollProvider>
   </>
);
export default App;
