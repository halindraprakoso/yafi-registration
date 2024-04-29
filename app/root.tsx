import "@/styles/global.css";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	json,
	useLoaderData,
} from "@remix-run/react";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { HoneypotProvider } from "remix-utils/honeypot/react";
import { csrf } from "~/lib/csrf.server";
import { honeypot } from "~/lib/honeypot.server";

import "~/styles/tailwind.css";

export async function loader() {
	const [csrfToken, cookieHeader] = await csrf.commitToken();
	return json(
		{ csrfToken, honeypotInputProps: honeypot.getInputProps() },
		{ headers: { "set-cookie": cookieHeader ?? "" } },
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const { csrfToken, honeypotInputProps } = useLoaderData<typeof loader>();

	return (
		<AuthenticityTokenProvider token={csrfToken}>
			<HoneypotProvider {...honeypotInputProps}>
				<Outlet />
			</HoneypotProvider>
		</AuthenticityTokenProvider>
	);
}
