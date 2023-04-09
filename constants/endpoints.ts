const endpoints = {
  server: {
    base: process.env.NEXT_PUBLIC_BASE_URL,
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
    },
    socketIo: {
      addUser: "addUser",
      getUser: "getUser",
    },
  },
  client: {
    login: "/auth/login",
    signup: "/auth/signup",
    forget_password: "/forget-password",
    dashboard: "/dashboard",
    chat: "/chat",
  },
};

export default endpoints;
