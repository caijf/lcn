import data from "../data/data-map.json";

// 全部数据
const realData = data.map(([code, name]) => ({ code, name }));

export default realData;
