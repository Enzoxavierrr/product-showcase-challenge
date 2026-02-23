import { TeamProvider } from './contexts/TeamContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <TeamProvider>
      <AppRoutes />
    </TeamProvider>
  );
}

export default App;
