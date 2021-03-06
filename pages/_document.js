import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="manifest" href="/static/manifest.json" />

					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="application-name" content="just-chat" />
					<meta name="apple-mobile-web-app-title" content="just-chat" />
					<meta name="theme-color" content="#fd4d4d" />
					<meta name="msapplication-navbutton-color" content="#fd4d4d" />
					<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
					<meta name="msapplication-starturl" content="/" />
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

					<link rel="icon" type="image/png" sizes="512x512" href="/static/icon-512.png" />
					<link rel="apple-touch-icon" type="image/png" sizes="512x512" href="/static/icon-512.png" />
					<link rel="icon" type="image/png" sizes="192x192" href="/static/icon-192.png" />
					<link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/static/icon-192.png" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}