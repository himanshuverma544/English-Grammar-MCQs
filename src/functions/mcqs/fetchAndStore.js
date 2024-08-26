import Axios from "axios";

import memoFunc from "../utils/memoFunc";


async function theFetchAndStore(url) {

  const { data: { backupMcqs } } = await Axios.get(url);
  return backupMcqs;
}

const fetchAndStore = memoFunc(theFetchAndStore);

export default fetchAndStore;