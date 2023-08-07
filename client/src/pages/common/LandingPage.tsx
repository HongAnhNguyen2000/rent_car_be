import { experimentalStyled as styled } from '@mui/material/styles';
import Page from 'components/common/Page';
// import {
//   LandingHero,
//   LandingMinimal,
//   LandingDarkMode,
//   LandingAdvertisement,
//   LandingCleanInterfaces,
//   LandingHugePackElements
// } from 'components/_external-pages/landing';


const RootStyle = styled(Page)(({ theme }) => ({
  height: '100%'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));


export default function LandingPage() {
  return (
    <div>hi</div>
  );
}
