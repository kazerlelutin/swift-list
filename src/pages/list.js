import content from "../partials/list.html?raw"
import { createPage } from "../../libs/createPage"
import {
  insertSection,
  getList,
  toggleItem,
  validList,
  copyList,
  createListAction,
  addItem,
  delItem,
  updateItem,
  updateTitle,
} from "../scripts"

export default () =>
  createPage(
    content,
    getList,
    insertSection,
    toggleItem,
    copyList,
    validList,
    createListAction,
    addItem,
    delItem,
    updateItem,
    updateTitle
  )
