import { BookContext } from "@/app/_layout";
import QuestionApi from "@/app/api/QuestionApi";
import { QuestionWithAnswer } from "@/app/model/Answer";
import { Question } from "@/app/model/Question";
import CustomModal from "@/components/CustomModal";
import { useContext, useEffect, useState } from "react";
import ModalAction from "./ModalAction";

const ShowModalByUser = (props: {todayQuestion: Question}) => {
    const {book} = useContext(BookContext);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [message, setMessage] = useState<string>('');
    const [modalCloseAction, setModalCloseAction] = useState<() => void>();
  
    const [todayQuestionWithAnswer, setTodayQuestionWithAnswer] = useState<QuestionWithAnswer>();

    useEffect(() => {
      QuestionApi.findById(props.todayQuestion.id).then((result) => {
        setTodayQuestionWithAnswer(result.data);
      });
    }, []);

    useEffect(() => {
      // 오늘 질문에 답변을 했다면 모달을 띄우지 않는다. 
      if (todayQuestionWithAnswer === undefined || todayQuestionWithAnswer?.answer) {
        return;
      } else {
        showModalByBook();
      }
    }, [todayQuestionWithAnswer]);

    const showModalByBook = () => {
      // if (book.isOnboarding) {
      // }

      const bookQuestionCount = book.questionCount || 0;
      const userDayCount = props.todayQuestion.dayCount;

      if (userDayCount === 1) {
        showWelcomeMessage(userDayCount);
      } else 
      if (userDayCount === Math.ceil(bookQuestionCount * 1/3)) {
        showFriendIntroduce(Math.ceil(bookQuestionCount * 1/3));
      } else if (userDayCount === Math.ceil(bookQuestionCount * 2/3)) {
        showMotivationModal();
      } else if (userDayCount === bookQuestionCount) {
        showComplete();
      } else {
        setShowModal(false);
      }
    }
  
    const closeModal = function() {
      modalCloseAction!();
      setShowModal(false);
    }
  
    const showWelcomeMessage = (endDayCount: number) => {
      const welcomeMessage = 
        "[" + book.title + "]" + "\nDAY 1부터 DAY " + endDayCount +"까지 진행됩니다." + 
        "\n\n하루에 한 번, 오늘의 질문을 보내드려요.\n놓치지 않도록 알림을 켜주세요 🔔\n(알림 시간은 마이페이지에서 변경 가능)" + 
        "\n\n나와의 대화를 통해\n나 자신을 더 알아가보세요 :)";

      setTitle("환영합니다 🙌🏻");
      setMessage(welcomeMessage)
      setModalCloseAction(() => ModalAction.confirmPush);
      setShowModal(true);
    }
  
    const showFriendIntroduce = (todayDayCount: number) => {
      setTitle("친구에게 소개해주세요 🎟️");
      setMessage("나와의 대화 앱을 통해서\n나 자신과 더 친해지고 계신가요?\n\n" + "Day " + todayDayCount +" 질문을 만나기 전에,\n나와의 대화를 친구에게 알려주세요 :)")
      setModalCloseAction(() => ModalAction.onShare);
      setShowModal(true);
    }

    const showMotivationModal = () => {
      const message = 
        "[" + book.title + "] 의 \n70% 완료하셨어요! 정말 대단해요!" +
        "\n\n조금만 더 힘을 내서,\n끝까지 마무리 해봅시다!";
      setTitle("거의 다 왔어요 👏");
      setMessage(message);
      setModalCloseAction(() => () => setShowModal(false));
      setShowModal(true);
    }

    const showComplete = () => {
      setTitle("벌써 DAY " + book.questionCount + "! 🎉");
      setMessage("여기까지 오신 당신! 정말 뭐든지 해낼거에요!\n\n마지막 질문을 마무리하고,\n나와의 대화를 책으로 만나보세요!\n\n마이페이지 > 나와의 대화 출판하기")
      setModalCloseAction(() => () => setShowModal(false));
      setShowModal(true);
    }
    
    return (
      <CustomModal 
        visible={showModal} 
        onRequestClose={closeModal}
        onConfirm={closeModal}
        title={title}
        message={message}
        smallButton={true}
      />
    );
  }

  export default ShowModalByUser;