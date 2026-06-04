import { elasticClient } from "../../config/elasticsearch.js";

const test = async () => {

  const response =
    await elasticClient.info();

  console.log(response);

};

test();