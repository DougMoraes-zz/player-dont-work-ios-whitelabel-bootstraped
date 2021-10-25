// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import NextHealthScreen from '@24i/nxg-sdk-smartott/src/screens/NextHealthScreen';
// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY

const { getServerSideProps } = NextHealthScreen.page.health;

export { getServerSideProps };

export default NextHealthScreen.Main;
