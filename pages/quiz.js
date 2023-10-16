import Page from "components/common/Page";
import QuizCards from "components/common/QuizCards";
import QuizFirstPage from "components/common/QuizFirstPage";
import SocketManager from "components/common/SocketManager/SocketManager";
import Quiz from "components/pages/Quiz";

function QuizPage({}) {
  return (
    <Page title="Quiz">
      <QuizCards />
    </Page>
  );
}

export default QuizPage;
