import "./App.css";

import Mcqs from "./components/mcqs/Mcqs";


function App() {

  const pages = {
    ["/mcq-test"]: <Mcqs />,
  };

  const pagesPath = Object.keys(pages);

  const currentPagePath = window.location.pathname;

  
  return (
    <>
      {pagesPath.some((pagePath) => currentPagePath.includes(pagePath))
        ? pages[currentPagePath]
        : null}
    </>
  );
}

export default App;
