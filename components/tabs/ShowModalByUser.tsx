import { BookContext, UserContext } from "@/app/_layout";
import QuestionApi from "@/app/api/QuestionApi";
import { QuestionWithAnswer } from "@/app/model/Answer";
import { Question } from "@/app/model/Question";
import CustomModal from "@/components/CustomModal";
import { useCallback, useContext, useEffect, useState } from "react";
import ModalAction from "./ModalAction";
import { useFocusEffect } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

const ShowModalByUser = (props: {todayQuestion: Question}) => {
  const {user} = useContext(UserContext);
  const {book} = useContext(BookContext);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string>('');
  const [modalCloseAction, setModalCloseAction] = useState<() => void>();
  const [stopShowing, setStopShowing] = useState(false);

  const [todayQuestionWithAnswer, setTodayQuestionWithAnswer] = useState<QuestionWithAnswer>();

  const [key, setKey] = useState<number>(1);

  const isFocused = useIsFocused();

  useEffect(() => {
    QuestionApi.findById(props.todayQuestion.id).then((result) => {
      setTodayQuestionWithAnswer(result.data);
    });
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      if (todayQuestionWithAnswer === undefined) return;

      if (book.onBoarding) {
        showOnboardingModal();
      } else {
        if (!stopShowing && !todayQuestionWithAnswer?.answer) {
          showModalByBook();
          setStopShowing(true);
        }
      }
    }, [isFocused, todayQuestionWithAnswer])
  );

  const showOnboardingModal = () => {
    setKey(key + 1);
    const isAnswered = todayQuestionWithAnswer?.answer !== undefined;
    const onboardingMessage = 
      "안녕하세요 " + user.nickname + "님!" + 
      "\n나와의 대화에 오신 것을 환영합니다!" + 
      "\n\n앱 사용 방법을 안내드릴게요 :)" + 
      "\n우선, 오늘의 질문에 답변해 볼까요?";
    const afterOnboardingMessage = 
      "첫 번째 답변을 완료하셨어요!" + 
      "\n이제 본격적으로 내 자신을 알아가볼까요?" + 
      "\n\n우측 하단의 [질문지 변경] 에서" + 
      "\n원하는 질문지로 변경해주세요!"

    setTitle(isAnswered ? "훌륭해요 👏" : "환영합니다 🙌🏻");
    setMessage(isAnswered ? afterOnboardingMessage : onboardingMessage);
    setModalCloseAction(() => () => setShowModal(false));
    setShowModal(true);
  }

  const showModalByBook = () => {
    const bookQuestionCount = book.questionCount || 0;
    const userDayCount = props.todayQuestion.dayCount;

    if (userDayCount === 1) {
      showWelcomeMessage(bookQuestionCount);
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
      "[" + book.title + "]" + "\nDAY 1부터 DAY " + endDayCount + "까지 진행됩니다." + 
      "\n\n하루에 한 번, 오늘의 질문을 보내드려요.\n놓치지 않도록 알림을 켜주세요 🔔" + 
      "\n\n원하는 시간에 오늘의 질문을 받아보세요.\n(마이페이지 > 알림 시간 변경하기)"; 

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
      key={key}
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