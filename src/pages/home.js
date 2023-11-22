import content from "../partials/home.html?raw"
import { archiveList, createList, delList, getLists, insertLists } from "../scripts"
import { createPage } from "../../libs/createPage"

export default () => createPage(content, getLists, createList, insertLists, delList, archiveList)
