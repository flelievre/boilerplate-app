import {
  useContext,
} from 'react';
import {
  HelmetProvider,
} from 'react-helmet-async';
import {
  TranslationProvider,
  ThemeProvider,
  ThemeContext,
  ScreenProvider,
  ToastProvider,
  AppProvider,
  BreadcrumbsProvider,
  ModalCreateProvider,
  ModalEditProvider,
  ModalConfirmationProvider,
} from '@/utils';
import { translations } from '@/translations';

const ProvidersHoc = ({ children}) => (
  <HelmetProvider>
    <TranslationProvider
      translations={translations}
    >
      <ThemeProvider>
        <ThemedProvidersHoc>
          {children}
        </ThemedProvidersHoc>
      </ThemeProvider>
    </TranslationProvider>
  </HelmetProvider>
);

const ThemedProvidersHoc = ({ children }) => {
  const { themeName } = useContext(ThemeContext);
  return (
    <ToastProvider themeName={themeName}>
      <ScreenProvider>
        <BreadcrumbsProvider>
          <AppProvider>
            <ModalCreateProvider>
              <ModalEditProvider>
                <ModalConfirmationProvider>
                  {children}
                </ModalConfirmationProvider>
              </ModalEditProvider>
            </ModalCreateProvider>
          </AppProvider>
        </BreadcrumbsProvider>
      </ScreenProvider>
    </ToastProvider>
  );
}

export default ProvidersHoc
