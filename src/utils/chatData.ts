import image from "../asserts/image-exsample.png";
import { chatDataType, messageDataType } from "./types";


export const chatsList: chatDataType[] = [
  {
    id: 1,
    chatName: "CHAT 1",
    lastMessage:
      "LAST MESSAGE VERY VERRYYYYYYY LOOOOOOONG LOOOOOOONG LOOOOOOONG LOOOOOOONG",
    lastOwn: true,
    date: "2023-05-31T10:16:46.335Z",
    unreadCount: "4",
  },
  {
    id: 2,
    chatName: "CHAT 2",
    lastMessage: "LAST",
    lastOwn: false,
    date: "2023-05-22T10:16:46.335Z",
    unreadCount: "4",
  },
  {
    id: 3,
    chatName: "CHAT 3",
    lastMessage: "LAST MESSAGE VERY VERRYYYYYYY LOOOOOOONG",
    lastOwn: false,
    date: "2023-05-31T10:16:46.335Z",
    unreadCount: "4",
  },
  {
    id: 4,
    chatName: "CHAT 4",
    lastMessage: "LAST MESSAGE VERY VERRYYYYYYY LOOOOOOONG",
    lastOwn: false,
    date: "2023-05-31T10:16:46.335Z",
    unreadCount: "4",
  },
  {
    id: 5,
    chatName: "CHAT 5",
    lastMessage: "LAST MESSAGE VERY VERRYYYYYYY LOOOOOOONG",
    lastOwn: false,
    date: "2023-05-31T10:16:46.335Z",
    unreadCount: "4",
  },
  {
    id: 6,
    chatName: "CHAT 6",
    lastMessage: "LAST MESSAGE VERY VERRYYYYYYY LOOOOOOONG",
    lastOwn: true,
    date: "2023-05-31T10:16:46.335Z",
    unreadCount: "4",
  },
  {
    id: 7,
    chatName: "CHAT 7",
    lastMessage: "LAST MESSAGE VERY VERRYYYYYYY LOOOOOOONG",
    lastOwn: true,
    date: "2023-05-31T10:16:46.335Z",
    unreadCount: "4",
  },
  {
    id: 8,
    chatName: "CHAT 8",
    lastMessage: "LAST MESSAGE VERY VERRYYYYYYY LOOOOOOONG",
    lastOwn: true,
    date: "2023-05-31T10:16:46.335Z",
    unreadCount: "4",
  },
  {
    id: 9,
    chatName: "CHAT 9",
    lastMessage: "LAST MESSAGE VERY VERRYYYYYYY LOOOOOOONG",
    lastOwn: true,
    date: "2023-05-31T10:16:46.335Z",
    unreadCount: "4",
  },
  {
    id: 10,
    chatName: "CHAT 10",
    lastMessage: "LAST MESSAGE VERY VERRYYYYYYY LOOOOOOONG",
    lastOwn: true,
    date: "2023-05-31T10:16:46.335Z",
    unreadCount: "4",
  },
  {
    id: 11,
    chatName: "CHAT 11",
    lastMessage: "LAST MESSAGE VERY VERRYYYYYYY LOOOOOOONG",
    lastOwn: true,
    date: "2023-05-31T10:16:46.335Z",
    unreadCount: "4",
  },
  {
    id: 12,
    chatName: "CHAT 12",
    lastMessage: "LAST MESSAGE VERY VERRYYYYYYY LOOOOOOONG",
    lastOwn: true,
    date: "2023-05-31T10:16:46.335Z",
    unreadCount: "4",
  },
];

export const messagesList: messageDataType[] = [
  {
    id: 1,
    textMessage:
      "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
    own: false,
    date: "2023-05-21T10:16:46.335Z",
  },

  {
    id: 2,
    textMessage: "Привет!",
    own: true,
    date: "2023-05-22T10:16:46.335Z",
    ownStatus: "read",
  },

  {
    id: 3,
    textMessage: "И пока",
    own: true,
    date: "2023-05-22T13:16:46.335Z",
    ownStatus: "delivered",
  },

  {
    id: 4,
    textMessage: "Мне неинтересно",
    own: true,
    date: "2023-05-23T15:16:46.335Z",
    ownStatus: "delivered",
  },

  {
    id: 5,
    imageMessage: image,
    own: false,
    date: "2023-05-31T10:16:46.335Z",
    ownStatus: "delivered",
  },
];
