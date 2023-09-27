# superheros-back-end

## В проекті використана версія Node.js v16.14.0 та MongoDB Atlas.

Перед запуском потрібно виконати команду

- `npm i` &mdash; та за шаблоном додати ".env" файл з власними параметрами

server: http://localhost:3000

Superheros endpoints :

- All methods with an "images" field accept a single image file

- Create superhero{method:Post /api/superheros}
- example body: form-data with fields type (key:value)
- all fields are required

```bash
    "nickname":"nickname",
    "real_name": "name",
    "origin_description": "origin-description",
    "superpowers": "superpowers",
    "catch_phrase": "catch-phrase",
    "images"(type - file): "select superhero image"
```

- Get all superheros{method:Get /api/superheros}
- url params can get field with number of page

```bash
    http://localhost:3000/api/superheros?page=1
```

- Get superhero by id {method:Get /api/superheros/{"superhero-id"}}

- Update superhero {method:Put /api/superheros/{"superhero-id"}}
- example body: form-data with fields type (key:value)
- all fields are required except "images"

```bash
    "nickname":"nickname",
    "real_name": "name",
    "origin_description": "origin-description",
    "superpowers": "superpowers",
    "catch_phrase": "catch-phrase",
    "images"(type - file): "select superhero image" (optional)
```

- Update superhero image{method:Patch /api/superheros/{"superhero-id"}/images}
- example body: form-data with field type (key:value)

```bash
    "images"(type - file): "select superhero image"
```

- Delete superhero {method:Delete /api/superheros/{"superhero-id"}}

- Delete superhero image{method:Delete /{"superhero-id"}/images}
- example body: raw (JSON)

```bash
    {"image":"url image, example type ("id superhero/image name.jpg")"}
```

### Команди старту:

- `npm start` &mdash; старт сервера в режимі (production)
- `npm run start:dev` &mdash; старт сервера в режимі разробки (development)
