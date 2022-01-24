const { prompt } = require("enquirer");
const { writeFileSync } = require("fs");
const path = require("path");

const getDate = () => {
  const d = new Date();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const date = d.getDate().toString().padStart(2, "0");
  return `${d.getFullYear()}-${m}-${date}`;
};

async function main() {
  const postName = await prompt({
    type: "input",
    name: "title",
    message: "新增文章标题",
  });
  const date = getDate();
  const fileName = `${date}-${postName.title
    .toLowerCase()
    .replace(/ /g, "-")}.md`;

  const template = `---
title: ${postName.title}
date: ${date}
---
  `;

  writeFileSync(path.resolve(__dirname, "../_posts/", fileName), template);
}

main();
