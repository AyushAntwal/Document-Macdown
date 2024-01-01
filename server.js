const fs = require("fs");
const path = require("path");
const { log } = require("console");
const dirPath = path.join(__dirname, "./Markdown");
const FileData = {};
const Markdoc = require("@markdoc/markdoc");


function updateFileData() {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.log(err, __filename);
    } else {
      files.forEach((file) => {
        fs.readFile(path.join(dirPath, file), "utf8", (err, data) => {
          if (err) {
            console.log(err, __filename);
          } else {
            FileData[file.replace(".md", "")] = {
              page: file.replace(".md", ""),
              meta: getMataData(data),
              content: (data) 
            };
            fs.writeFileSync(path.join(__dirname, "./src/data.json"), JSON.stringify(FileData));
          }
        });
      });
    }
  });
}

updateFileData();

setInterval(() => {
  fs.watch(dirPath, (eventType, filename) => {
    log(`event type is: ${eventType} : ${filename}`);
    updateFileData();
  });
}, 10000);

const getMataData = (data) => {
  const lines = data.split("\n");
  const metaIndex = lines.reduce((acc, line, i) => {
    if (/^---/.test(line)) {
      acc.push(i);
    }
    return acc;
  }, []);
  const metaData = lines.slice(metaIndex[0] + 1, metaIndex[1]);
  return metaData.reduce((acc, line) => {
    const [key, value] = line.split(":");
    acc[key?.trim()] = value?.trim();
    return acc;
  }, {});
};

getContent = (data) => {
  const lines = data.split("\n");
  const metaIndex = lines.reduce((acc, line, i) => {
    if (/^---/.test(line)) {
      acc.push(i);
    }
    return acc;
  }, []);
  const metaData = lines.slice(metaIndex[1] + 1, lines.length);
  return metaData.join("\n");
};
