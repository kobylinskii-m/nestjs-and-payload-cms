import { CollectionConfig } from "payload/types";
import Users from "./Users";

export const PostCollection: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  versions: true,
  fields: [
    {
      name: "title", // # Создаём обязательное поле title типа text
      type: "text",
      label: "Title",
      required: true,
    },
    {
      // # Создаём обязательное поле content типа richText, в базе оно сохраняется в виде json
      // # Для сериализация поля используется библиотека slatejs
      name: "content",
      type: "richText",
      label: "Content",
      required: true,
    },
    {
      // # Создаём population поле author типа relationship, которое связано с коллекцией users
      // # Users это администраторы нашей cms
      name: "author",
      type: "relationship",
      relationTo: Users.slug,
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      // # Создаём поле status типа select, которое может принимать значения draft или published
      // # Необходимое для обозначения статуса поста, был ли он опубликован или нет
      name: "status",
      type: "select",
      label: "Status",
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      // # Создаём поле datePublished типа date, которое будет хранить дату публикации поста
      name: "datePublished",
      type: "date",
      label: "Date Published",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
