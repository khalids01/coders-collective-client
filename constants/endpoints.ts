const endpoints = {
  server: {
    base:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3005/api/v1/coders-collective"
        : process.env.NEXT_PUBLIC_BASE_URL,
    image: "/images",
    auth: {
      login: "/login",
      logout: "/logout",
      signup: "/signup",
      reset_password: "/reset-password",
      forget_password: "/forget-password",
    },
    user: {
      me: "/users/me",
      friends: "/users/me/friends",
    },
    fileUpload: {
      image: "/upload-image",
    },
    chat: {
      chat_data: "/chat-data",
    },
    message: {
      send_message: "/send-message",
      get_messages: "/get-messages",
      message_seen: "/message-seen",
    },
  },
  client: {
    login: "/auth/login",
    signup: "/auth/signup",
    forget_password: "/forget-password",
    dashboard: "/dashboard",
    chat: "/chat",
    room: '/room'
  },
};

export default endpoints;
