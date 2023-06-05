import React from "react";
import ReactDOM from "react-dom";
import {RecoilRoot} from "recoil"
import App from "./App";
import { QueryClient,QueryClientProvider } from "react-query";

const queryClient=new QueryClient();


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

//https://styled-components.com/docs/api#typescript//