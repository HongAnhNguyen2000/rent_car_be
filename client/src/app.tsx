import ThemeConfig from 'theme';
import Router from 'routes';
import useAuth from 'hooks/useAuth';
import RtlLayout from 'components/common/RtlLayout';
import ScrollToTop from 'components/common/ScrollToTop';
import LoadingScreen from 'components/common/LoadingScreen';
import ThemePrimaryColor from 'components/common/ThemePrimaryColor';
import Settings from 'components/setting';

export default function App() {
  const { isInitialized } = useAuth();
  console.log(isInitialized);
  
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <RtlLayout>
            <Settings />
            <ScrollToTop />
            <LoadingScreen />
            {isInitialized ? <Router /> : <LoadingScreen />}
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
