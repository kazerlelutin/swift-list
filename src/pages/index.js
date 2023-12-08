import list from "./list";
import home  from "./home";

const pages = {
  home,
  "list/:id": list,
};

// En default car dois marcher avec le router sur d'autre projet
export default pages;