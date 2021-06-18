import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => useMediaQuery({ query: ' (max-width: 960px)' });
