import Home from "components/pages/Home";
import Page from "components/common/Page";
import { API_URL } from "config/config";

function HomePage({  }) {
  return (
    <Page title="Home">
      <Home />
    </Page>
  );
}

export default HomePage;
