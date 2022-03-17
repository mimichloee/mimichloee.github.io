import { PrismaClient } from '@prisma/client';
import parseFrontMatter from 'front-matter';
import fs from 'fs/promises';
import path from 'path';

const db = new PrismaClient();

const ROOT_DIR = `${__dirname}/..`;

async function seed() {
  const pathToPosts = path.resolve(`${ROOT_DIR}/posts`);
  const allPostFiles = await fs.readdir(pathToPosts, {
    withFileTypes: true,
  });

  allPostFiles.map(async (dirnet) => {
    if (dirnet.isFile()) {
      const file = await fs.readFile(path.join(pathToPosts, dirnet.name));
      const { body: content, attributes } = parseFrontMatter<any>(
        file.toString(),
      );

      await db.post.create({
        data: {
          slug: dirnet.name.replace(/\.mdx$/, ''),
          title: attributes.title,
          date: new Date(attributes.date),
          excerpt: attributes.excerpt,
          tags: attributes.tags.join(','),
          content,
          published: attributes.published,
        },
      });
    }
  });
}

seed();
