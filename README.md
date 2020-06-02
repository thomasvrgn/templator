# Templator bot
> Discord template saver and loader bot.

## Install it

Install dependencies:

```bash
npm i
```

Rename example.env to .env and write your token bot to .env
Then run:

```
npm run start
```

## How a template work

Templates are stocked in JS file that are hard minified and saved by ID. The bot does not loop all files but require file just by ID.

This is an example template:

```js
module.exports = {
    "channels": [{
        "name": "Salons textuels",
        "type": "category",
        "id": "dfttz4",
        "channelID": "705000040246280306",
        "permissions": {},
        "children": [{
            "name": "général",
            "type": "text",
            "id": "8niu4g",
            "channelID": "705000040246280308",
            "permissions": {}
        }]
    }, {
        "name": "Salons vocaux",
        "type": "category",
        "id": "bfery8",
        "channelID": "705000040246280307",
        "permissions": {},
        "children": [{
            "name": "Général",
            "type": "voice",
            "id": "8dj8qo",
            "channelID": "705000040690876566",
            "permissions": {}
        }]
    , {
        "name": "test-bots",
        "type": "text",
        "id": "838etc",
        "channelID": "707615503060959274",
        "permissions": {}
    }, {
        "name": "reports",
        "type": "text",
        "id": "6setc0",
        "channelID": "709840817585520763",
        "permissions": {}
    }],
    "roles": [{
        "name": "@everyone",
        "id": "705000040246280304",
        "color": 0,
        "position": 0,
        "permissions": 104320577,
        "mentionable": false
    }]
}
```

As you can see, all templates seem to be overweight, but with the minification process, they are very light.
Add command simply build server AST. Then a simple recursion is needed to read that AST and build the server.