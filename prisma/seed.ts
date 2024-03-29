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

      const slug = dirnet.name.replace(/\.mdx$/, '');

      const findPost = await db.post.findUnique({ where: { slug } });
      if (findPost) {
        await db.post.update({
          where: {
            slug,
          },
          data: {
            slug,
            title: attributes.title,
            date: new Date(attributes.date),
            excerpt: attributes.excerpt,
            tags: attributes.tags.join(','),
            content,
            published: attributes.published,
          },
        });
      } else {
        await db.post.create({
          data: {
            slug,
            title: attributes.title,
            date: new Date(attributes.date),
            excerpt: attributes.excerpt,
            tags: attributes.tags.join(','),
            content,
            published: attributes.published,
          },
        });
      }
    }
  });
}

seed();
