export default {
  header: {
    self: {},
    items: [
    ],
  },
  aside: {
    self: {},
    items: [
      {
        title: "Dashboard",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "dashboard",
        translate: "MENU.DASHBOARD",
        permission: "get-dashboard",
        bullet: "dot",
      },
      {
        title: "Quản lý đợt khảo sát",
        root: true,
        bullet: "dot",
        icon: "flaticon-layer",
        submenu: [
          {
            title: "Thêm",
            page: "surveyround/add"
          },
          {
            title: "Danh sách",
            page: "surveyround/list"
          }
        ]
      },
      {
        title: "Quản lý câu hỏi mẫu",
        root: true,
        bullet: "dot",
        icon: "flaticon-questions-circular-button",
        submenu: [
          {
            title: "Thêm",
            page: "questions/add",
          },
          {
            title: "Danh sách",
            page: "questions/list",
          },
        ],
      },
      // {
      //   title: "Quản lý đợt khảo sát",
      //   root: true,
      //   bullet: "dot",
      //   icon: "flaticon2-writing",
      //   submenu: [
      //     {
      //       title: "Thêm",
      //       page: "survey-sections/add",
      //     },
      //     {
      //       title: "Danh sách",
      //       page: "survey-sections/list",
      //     },
      //   ],
      // },
      {
        title: "Quản lý form",
        root: true,
        bullet: "dot",
        icon: "flaticon2-writing",
        submenu: [
          {
            title: "Thêm",
            page: "form/add",
          },
          {
            title: "Danh sách",
            page: "form/list",
          }
        ],
      },
      {
        title: "Quản lý kết quả trả lời",
        root: true,
        bullet: "dot",
        icon: "flaticon-paper-plane",
        submenu: [
          {
            title: "Danh sách",
            page: "answer/list",
          },
        ],
      }
    ],
  },
};
