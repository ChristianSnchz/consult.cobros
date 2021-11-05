import { Font } from '@react-pdf/renderer';

const registerFonts = (): void => {
  Font.register({
    family: 'SantanderMicroText',
    fonts: [
      {
        src: './fonts/SantanderMicroText.woff'
      }
    ]
  });
  Font.register({
    family: 'SantanderMicroText-Bold',
    fonts: [
      {
        src: './fonts/SantanderMicroText-Bd.woff'
      }
    ]
  });
  Font.register({
    family: 'SantanderHeadline-Regular',
    fonts: [
      {
        src: './fonts/SantanderHeadline-Regular.woff'
      }
    ]
  });
};
export default registerFonts;
