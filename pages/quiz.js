import Page from "components/common/Page";
import SocketManager from "components/common/SocketManager/SocketManager";
import Quiz from "components/pages/Quiz";

function QuizPage({}) {
  return (
    <Page title="Quiz">
      <Quiz />
    </Page>
  );
}

export default QuizPage;
