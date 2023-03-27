import MainLayout from "@/Layouts/MainLayout";
import { useBreakPoints } from "@/hooks";

const Chat = () => {
  const { md } = useBreakPoints();

  return (
    <MainLayout>
      <h1>Something</h1>
    </MainLayout>
  );
};

export default Chat;
