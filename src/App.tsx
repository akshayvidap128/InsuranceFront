import React from "react";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import SubmissionQueue from "./pages/Applications/SubmissionQueue";
import ApplicationContent from "./pages/Applications/ApplicationContent";
import ViewApplication from "./pages/Applications/ViewApplication";
import AddQuestion from "./pages/Applications/AddQuestion";

const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.log(networkError.message);
  }
});

const link = from([
  errorLink,
  // new HttpLink({ uri: "http://127.0.0.1:8000/graphql" }),
  new HttpLink({
    uri: " /graphql",
    headers: {
      "allow-access-control": "*",
    },
  }),
  // http://20.244.116.244
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/submissionQueue" element={<SubmissionQueue />} />
          <Route path="/applicationContent" element={<ApplicationContent />} />
          <Route path="/viewApplicant" element={<ViewApplication />} />
          <Route path="/addQuestion" element={<AddQuestion />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
