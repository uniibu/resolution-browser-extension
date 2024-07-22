import React, {useEffect} from "react";
import {
  RouterProvider,
  createMemoryRouter,
  useNavigate,
} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BaseProvider} from "@unstoppabledomains/ui-components";
import {lightTheme} from "@unstoppabledomains/ui-kit/styles";
import Extension from "../pages/ExtensionMain/Extension";
import Wallet from "../pages/Wallet/Wallet";
import List from "../pages/WebsitesList";
import Loading from "../pages/Loading/Loading";
import SomethingWentWrong from "../pages/Errors/SomethingWentWrong";
import Install from "../pages/InstallPage/Install";
import useUserId from "../hooks/useUserId";
import {LDProvider} from "launchdarkly-react-client-sdk";
import config from "../config";

const queryClient = new QueryClient();

const EntryPoint: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash === "#install") {
      navigate("/install");
      return;
    }

    if (window.location.hash === "#error") {
      navigate("/error");
      return;
    }

    if (window.location.hash === "#loading") {
      navigate("/loading");
      return;
    }

    if (window.location.hash === "#list") {
      navigate("/list");
      return;
    }

    navigate("/wallet");
  }, [navigate]);

  return <></>;
};

const router = createMemoryRouter([
  {
    path: "/install",
    Component: Install,
  },
  {
    path: "/list",
    Component: List,
  },
  {
    path: "/loading",
    Component: Loading,
  },
  {
    path: "/error",
    Component: SomethingWentWrong,
  },
  {
    path: "/",
    Component: EntryPoint,
  },
  {
    path: "/extension",
    Component: Extension,
  },
  {
    path: "/wallet",
    Component: Wallet,
  },
]);

const Root: React.FC = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

const RootApp = () => {
  const {userId} = useUserId();

  if (!userId) {
    return <div></div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BaseProvider theme={lightTheme}>
        <LDProvider
          clientSideID={config.LD_CLIENT_ID}
          context={{
            kind: "user",
            key: userId,
          }}
        >
          <Root />
        </LDProvider>
      </BaseProvider>
    </QueryClientProvider>
  );
};

export default RootApp;
