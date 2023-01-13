# Contentful WebHook Example

Create a free Site and use the blog template.

Install ngrok `npm i -g ngrok`

Register any webhook over at Contentful https://app.contentful.com/spaces/SITEID/settings/webhooks

The url will be the one that you see when running `ngrok http 3543`. Example: `https://xxxx-xx-xx-xx-xx.ngrok.io/hook`

Make sure to add the header `ngrok-skip-browser-warning` with any value. So that you bypass the ngrok "warning" scren.
**Important** to change the `Content type` to `application/json; charset=utf8`.

```bash
$ yarn install
$ ngrok http 3543
$ yarn dev # to start the server
```

Do something in Contentful that triggers an update.

## Client

```
$ cd site
$ yarn install
$ yarn dev
```

Client will just render the posts. But it has access to all the author info as well.
