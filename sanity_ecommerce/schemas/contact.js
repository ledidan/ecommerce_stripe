export default {
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "questions",
      title: "Questions",
      type: "string",
      options: {
        list: [
          {
            title: "Transaction Issue",
            value: "transaction issue",
          },
          {
            title: "Emergency Meeting",
            value: "emergency meeting",
          },
        ],
      },
    },
    {
      name: "message",
      title: "Message",
      type: "text",
    },
  ],
};
