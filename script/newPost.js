const { prompt } = require("enquirer");
const { writeFileSync } = require("fs");
const path = require("path");

const getDate = () => {
  const d = new Date();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const date = d.getDate().toString().padStart(2, "0");
  return `${d.getFullYear()}-${m}-${date}`;
};

const getTags = async () => {
  const tags = [];

  const tagPrompt = async () => {
    const input = await prompt({
      type: "input",
      name: "tag",
      message: "标签（没有直接回车）",
    });

    const { tag } = input;
    if (!tag) return tags;
    tags.push(tag);
    return tagPrompt();
  };

  return await tagPrompt();
};

async function main() {
  const postName = await prompt({
    type: "input",
    name: "title",
    message: "新增文章标题",
  });

  const date = getDate();
  const tags = await getTags();
  const tagsTemplate = tags.reduce((acc, cur) => `  - ${cur}\n${acc}`, "");
  console.log(tagsTemplate);

  const fileName = `${date}-${postName.title
    .toLowerCase()
    .replace(/ /g, "-")}.md`;

  const template = tags.length
    ? `---
title: ${postName.title}
date: ${date}
tags:
${tagsTemplate}
---
`
    : `---
title: ${postName.title}
date: ${date}
---
`;

  writeFileSync(path.resolve(__dirname, "../_posts/", fileName), template);
}

main();
