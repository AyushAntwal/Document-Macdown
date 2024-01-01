import React from "react";
import { useParams } from "react-router-dom";
import data from "./data.json";
import Markdoc from '@markdoc/markdoc';
const callout = require("./schema/callout.markdoc.js");
const heading = require("./schema/heading.markdoc.js");

function Page() {
  const [content, setContent] = React.useState(null);
  const { page } = useParams();


  React.useEffect(() => {
    if (data[page]) {
      console.log(data[page]);
      const ast = Markdoc.parse(data[page].content);
      setContent(Markdoc.transform(ast, { variables : data[page].meta,  tags: { callout }, nodes: { heading } }));
      console.log(Markdoc.transform(ast, { tags: { callout } , nodes: { heading }}));
    } else {
      setContent(null);
    }
  }, [page]);
  return content ? <div dangerouslySetInnerHTML={{ __html: Markdoc.renderers.html(content) }} />  : <div>Loading...</div>;
}

export default Page;
