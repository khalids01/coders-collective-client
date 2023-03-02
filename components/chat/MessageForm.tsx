import { Textarea, Text, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTheme } from "@/hooks";
import { Div } from "@/components/common/sub";
import { useElementSize } from "@mantine/hooks";

const MessageForm = () => {
  const { colors } = useTheme();
  const { height, ref } = useElementSize();

  const form = useForm({
    initialValues: {
      message: "",
    },
  });

  return (
    <Div px={20} h={height + 55} bg={colors.background.paper}>
      <Textarea
        py={16}
        rows={2}
        sx={{ width: "100%" }}
        ref={ref}
        {...form.getInputProps("message")}
        styles={{
          input: {
            backgroundColor: colors.background.default,
            letterSpacing: 1.5,
          },
        }}
      />
    </Div>
  );
};

export default MessageForm;
