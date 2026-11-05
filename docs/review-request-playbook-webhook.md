# Review request playbook webhook

The page at `/resources/review-request-playbook` posts to `POST /api/review-playbook`. The browser never receives the destination URL or token. A submission is saved only when this server successfully delivers it.

Do not invent an endpoint, commit one, or set these variables in production until the owner supplies the URL.

## Environment variables

Set these on the server that runs the site (for example Vercel project settings, or `.env.local` for local development). Do not prefix them with `NEXT_PUBLIC_`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `REVIEW_PLAYBOOK_WEBHOOK_URL` | Yes, for real submissions | Absolute URL that receives the JSON payload. |
| `REVIEW_PLAYBOOK_WEBHOOK_TOKEN` | No | If set, the request includes `Authorization: Bearer <token>`. |

Production accepts `https://` URLs only. `http://localhost` and `http://127.0.0.1` work in development so you can point at a mock on your machine. Any other `http://` URL, a URL with embedded credentials, or a missing URL is treated as not configured.

The form cannot choose the destination. A `webhookUrl` field in the request body is ignored.

## Payload

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "tradeType": "Plumber",
  "source": "reviews-playbook",
  "timestamp": "2026-11-05T21:00:00.000Z"
}
```

`source` and `timestamp` are set by the server. `timestamp` is ISO 8601. `tradeType` is one of the dropdown labels, including `Other`.

The route does not log the name, email, trade, webhook URL, or token. Server logs contain an event code and an HTTP status only.

## What the visitor sees

- Missing or invalid `REVIEW_PLAYBOOK_WEBHOOK_URL`: the form shows that nothing was saved. It does not open the playbook.
- Webhook timeout (8 seconds), network error, or a non-2xx response: the form shows that the request was not saved. It does not open the playbook.
- A second submit of the same email within 60 seconds, after a successful delivery: the playbook opens and the webhook is not called again.
- A delivery failure can be retried.

There is a hidden honeypot field (`hp`). A filled honeypot is not forwarded and does not open the playbook.

## Review demo when no webhook is set

The guide opens without a webhook only when `REVIEW_PLAYBOOK_WEBHOOK_URL` is unset and the process is one of:

- Vercel Preview: `VERCEL_ENV=preview` (Vercel also sets `NODE_ENV=production` there)
- Local dev: `NODE_ENV` is not `production`, and `VERCEL_ENV` is unset or `development`

No extra flag and no query string are required. The page says nothing is captured or sent, fills sample values, and a valid submit returns the guide. The webhook is not called.

Production stays closed. `VERCEL_ENV=production`, or `NODE_ENV=production` with no preview env, returns an error and does not include the guide when the webhook URL is missing. A `demo: true` field in the request does not change that. Do not set a demo flag in production. `REVIEW_PLAYBOOK_ALLOW_DEMO` is not used.

When `REVIEW_PLAYBOOK_WEBHOOK_URL` is set, preview and local dev send the real payload instead of opening the demo.

The guide text is built on the server and returned only in a successful API response. It is not part of the initial page or the browser bundle. Refreshing the page shows the form again.

## Test against a local mock

Terminal 1, success:

```bash
node --input-type=module -e '
import { createServer } from "node:http";
createServer((req, res) => {
  const chunks = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", () => {
    console.log(req.method, req.url);
    console.log(req.headers.authorization ?? "(no authorization)");
    console.log(Buffer.concat(chunks).toString());
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("{\"ok\":true}");
  });
}).listen(8787, "127.0.0.1");
'
```

Terminal 2:

```bash
REVIEW_PLAYBOOK_WEBHOOK_URL=http://127.0.0.1:8787/hook \
REVIEW_PLAYBOOK_WEBHOOK_TOKEN=local-test-token \
npm run dev
```

Open `http://localhost:3000/resources/review-request-playbook`, submit the form, and confirm the mock printed the payload. Then change the mock to respond with status 500 and submit again. The page should show an error and keep the playbook closed.

To test the unconfigured state, stop the app, unset `REVIEW_PLAYBOOK_WEBHOOK_URL`, start it again, and submit. Nothing should be printed by the mock.

Unit tests cover the same cases without a network call:

```bash
npm test
```

## Production

Add the two variables in the hosting project's environment for Production when the real endpoint exists, then redeploy. This change does not set them and does not deploy production.
