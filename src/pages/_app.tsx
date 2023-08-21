import React from "react";
import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { ThemeProvider } from "@material-ui/core/";
import theme from "ui/theme/theme";
import NavBar from "ui/components/NavBar/NavBar";
import { AppContainer } from "ui/styles/pagesStyle/_app.syile";
import { AuthProvider } from "contexts/AuthContext";
import { ModalProvider } from "contexts/PipelineContext";
import { useRouter } from "next/dist/client/router";
import { ContactProvider } from "contexts/ContactContext";
import { CompanyProvider } from "contexts/CompanyContext";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";
import { SupportButton } from "ui/components/SupportButton/SupportButton";
import { AutomationProvider } from "contexts/AutomationContext";
import { FunnelProvider } from "contexts/FunnelContext";
import { ProductProvider } from "contexts/ProductContext";

function MyApp({ Component, pageProps }) {
  moment.locale("pt-br");
  const currentRoute = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <AuthProvider>
          {currentRoute.route === "/login" ||
          currentRoute.route === "/recover_pass" ||
          currentRoute.route === "/welcome" ||
          currentRoute.route === "/404" ||
          //currentRoute.route === "/" ||
          currentRoute.route === "/recover" ? (
            <>
              <Component {...pageProps}></Component>
            </>
          ) : (
          <FunnelProvider>
            <AutomationProvider>
              <ModalProvider>
              <ContactProvider>
              <ProductProvider>
                <CompanyProvider>
                  <AppContainer>
                    <ToastContainer autoClose={2000} />
                    <NavBar
                      CurrentPage={<Component {...pageProps}></Component>}
                      style={{
                        maxHeight: "0px",
                      }}
                    />
                  </AppContainer>
                </CompanyProvider>
                </ProductProvider>
              </ContactProvider>
            </ModalProvider>
          </AutomationProvider>
        </FunnelProvider>
          )}
        </AuthProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default MyApp;
