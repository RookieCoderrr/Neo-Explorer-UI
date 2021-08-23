import Badge from "../components/Badge";
import BaseButton from "../components/BaseButton";
import BaseDropdown from "../components/BaseDropdown";
import BaseInput from "../components/BaseInput";
import BaseNav from "../components/BaseNav";
import BasePagination from "../components/BasePagination";
import BaseTable from "../components/BaseTable";
import Card from "../components/Card";
import TabPane from "../components/Tabs/TabPane";
import Tabs from "../components/Tabs/Tabs";


const GlobalComponents = {
  install(app) {
    app.component("badge", Badge);
    app.component("base-button", BaseButton);
    app.component("base-dropdown", BaseDropdown);
    app.component("base-input", BaseInput);
    app.component("base-nav", BaseNav);
    app.component("base-pagination", BasePagination);
    app.component("base-table", BaseTable);
    app.component("card", Card);
    app.component("tab-pane", TabPane);
    app.component("tabs", Tabs);

  },
};

export default GlobalComponents;
