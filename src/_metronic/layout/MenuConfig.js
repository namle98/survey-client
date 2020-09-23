export default {
  header: {
    self: {},
    items: [
      {
        title: "Dashboards",
        root: true,
        alignment: "left",
        page: "dashboard",
        permission: "dashboards",
        translate: "MENU.DASHBOARD",
      },
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
        title: "Quản lý tiêu đề",
        root: true,
        bullet: "dot",
        icon: "flaticon2-writing",
        submenu: [
          {
            title: "Thêm",
            page: "survey-header/add",
          },
          {
            title: "Danh sách",
            page: "survey-header/list",
          },
        ],
      },
      {
        title: "Quản lý tổ chức/HTX",
        root: true,
        bullet: "dot",
        icon: "flaticon2-writing",
        submenu: [
          {
            title: "Thêm",
            page: "organizations/add",
          },
          {
            title: "Danh sách",
            page: "organizations/list",
          },
        ],
      },
      {
        title: "Quản lý câu hỏi",
        root: true,
        bullet: "dot",
        icon: "flaticon2-writing",
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
      {
        title: "Quản lý đề mục khảo sát",
        root: true,
        bullet: "dot",
        icon: "flaticon2-writing",
        submenu: [
          {
            title: "Thêm",
            page: "survey-sections/add",
          },
          {
            title: "Danh sách",
            page: "survey-sections/list",
          },

        ],
      },
     

      // {
      //   title: "Demo component",
      //   root: true,
      //   bullet: "dot",
      //   icon: "flaticon2-writing",
      //   page: "demo",
      // },
      // {
      //   title: "Demo Question",
      //   root: true,
      //   bullet: "dot",
      //   icon: "flaticon2-writing",
      //   page: "demoQuestion",
      // },
      // {
      //   title: "Demo formSurvey",
      //   root: true,
      //   bullet: "dot",
      //   icon: "flaticon2-writing",
      //   page: "formSurvey",
      // },
      // {
      //   title: "Demo ShowForm",
      //   root: true,
      //   bullet: "dot",
      //   icon: "flaticon2-writing",
      //   page: "showForm",
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
          },
        ],
      },
      {
        title: "Quản lý answers",
        root: true,
        bullet: "dot",
        icon: "flaticon2-writing",
        submenu: [
          {
            title: "Danh sách",
            page: "answers",
          },
        ],
      },
      {
        title: "Quản lý cuộc khảo sát",
        root: true,
        bullet: "dot",
        icon: "flaticon2-writing",
        submenu: [
          {
            title: "Thêm",
            page: "survey/add",
          },
          {
            title: "Danh sách",
            page: "survey/list",
          },
        ]
      },


    ],
  },

  
};
