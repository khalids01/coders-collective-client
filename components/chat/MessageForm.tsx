import { Textarea, Text, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLayout, useTheme } from "@/hooks";
import { Div } from "@/components/common/sub";
import { useElementSize } from "@mantine/hooks";
import { useEffect } from "react";

const MessageForm = () => {
  const { colors } = useTheme();
  const { height, ref } = useElementSize();
  const { chatLayout, setChatLayout } = useLayout();

  const form = useForm({
    initialValues: {
      message: "",
    },
  });

  useEffect(() => {
    setChatLayout({
      ...chatLayout,
      conversation: {
        ...chatLayout.conversation,
        form: {
          ...chatLayout.conversation.form,
          height,
        },
      },
    });
  }, [height]);

  return (
    <Div px={20} h={height + 55} bg={colors.background.paper}>
      <Textarea
        autosize
        py={16}
        maxRows={6}
        sx={{ width: "100%" }}
        ref={ref}
        {...form.getInputProps("message")}
        styles={{
          input: {
            backgroundColor: colors.background.default,
          },
        }}
      />
    </Div>
  );
};

export default MessageForm;
