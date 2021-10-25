const toFontObj = (shouldPreload) => (font) => ({
    name: font,
    shouldPreload,
});

const fontsToPreload = [
    'FontAwesome.ttf',
    'HK Grotesk Bold.otf',
    'HK Grotesk Medium.otf',
    'HK Grotesk.otf',
    'Roboto.ttf',
    'Roboto Bold.ttf',
    'GT America.otf',
    'GT Super Display.otf',
    'Ionicons.ttf',
    'MaterialIcons.ttf',
].map(toFontObj(true));

// enormous font size and used less often in less important places. adjust as needed
const fonts = [
    'Roboto Light.ttf',
    'Roboto Medium.ttf',
    'HK Grotesk Light.otf',
    'GT America Bold.otf',
    'MaterialCommunityIcons.ttf',
    'AntDesign.ttf',
    'Entypo.ttf',
    'Feather.ttf',
].map(toFontObj(false));

export default [...fontsToPreload, ...fonts];
