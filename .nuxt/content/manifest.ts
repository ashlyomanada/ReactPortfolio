export const checksums = {
  "blog": "v3.5.0--TQfXXViq2rY1vlWCSZjcOgg-3okhcx8l_ah6Q1-vdFw",
  "projects": "v3.5.0--ZYZPCkyYvsKOqjh4D9LBZ45O54nNIyZ0694xv9lzJKU"
}
export const checksumsStructure = {
  "blog": "EPRryq9CjLC3OQDPWRwqDG9z8rJ9cqmdetykcBuuZqI",
  "projects": "7Nh5oKx8xfRHlGdC3PsTCI6-fLfOI4Y9gQ02H-IfHZ8"
}

export const tables = {
  "blog": "_content_blog",
  "projects": "_content_projects",
  "info": "_content_info"
}

export default {
  "blog": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "coverImage": "string",
      "date": "string",
      "description": "string",
      "extension": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "readingTime": "string",
      "seo": "json",
      "stem": "string",
      "tags": "json"
    }
  },
  "projects": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "category": "string",
      "coverImage": "string",
      "description": "string",
      "extension": "string",
      "featured": "boolean",
      "liveUrl": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "repoUrl": "string",
      "seo": "json",
      "stem": "string",
      "summary": "string",
      "tagline": "string",
      "technologies": "json"
    }
  },
  "info": {
    "type": "data",
    "fields": {}
  }
}