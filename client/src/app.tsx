import Router from './routes';
import useAuth from 'hooks/useAuth';
import ThemeConfig from 'theme';
import ThemePrimaryColor from 'components/common/ThemePrimaryColor';
import RtlLayout from 'components/common/RtlLayout';
import LoadingScreen from 'components/common/LoadingScreen';

function App() {
  const { isInitialized } = useAuth();
  
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <RtlLayout>
            {isInitialized ? <Router /> : <LoadingScreen />}
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  )
}

export default App
