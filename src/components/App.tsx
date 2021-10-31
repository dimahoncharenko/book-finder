/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Global } from "@emotion/react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import IndexPage from "./IndexPage";
import BookPage from "./BookPage";
import UnknownPage from "./404Page";
import { Fragment } from "react";

const globalStyles = css`
  :root
  {
    box-sizing: border-box;
  }

  *,
  *::after,
  *::before
  {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root
  {
    display: flex;
    flex-direction: column;
    height: 100vh;

    > .content
    {
      flex: 1;
    }
  }
`;

function App() {
  return (
    <Fragment>
      <div className="content">
        <Global styles={globalStyles}/>
          <Header />
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/book/:id" component={BookPage} />
            <Route component={UnknownPage} />
          </Switch>
      </div>
      <Footer/>
    </Fragment>
  );
}

export default App;
