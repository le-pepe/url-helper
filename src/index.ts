export interface Options {
    forceHttps?: boolean;
    forceHttp?: boolean;
}

export class URLHelper {
    /**
     * Parses a URL and returns an object with its components.
     * Options:
     * - `forceHttps`: Forces `https://` (highest priority).
     * - `forceHttp`: Forces `http://` (ignored if `forceHttps` is true).
     */
    static parse(url: string, options: Options = {}) {
        const { forceHttps = false, forceHttp = false } = options;

        if (!/^https?:\/\//.test(url)) {
            url = `${forceHttps ? "https" : forceHttp ? "http" : "http"}://${url}`;
        }

        try {
            const parsed = new URL(url);
            return {
                protocol: parsed.protocol,
                host: parsed.host,
                hostname: parsed.hostname,
                port: parsed.port,
                pathname: parsed.pathname,
                search: parsed.search,
                hash: parsed.hash,
                params: Object.fromEntries(parsed.searchParams.entries()),
            };
        } catch (error) {
            throw new Error("Invalid URL");
        }
    }

    /**
     * Builds a URL from its components.
     * Options:
     * - `forceHttps`: Forces `https://` (highest priority).
     * - `forceHttp`: Forces `http://` (ignored if `forceHttps` is true).
     */
    static build({ host, pathname = "/", search = "", hash = "" }: { host: string; pathname?: string; search?: string; hash?: string }, options: Options = {}) {
        if (!host) throw new Error("Host is required to build a URL");

        const { forceHttps = false, forceHttp = false } = options;
        const protocol = forceHttps ? "https" : forceHttp ? "http" : "https";

        return new URL(`${protocol}://${host}${pathname}${search}${hash}`).toString();
    }

    /**
     * Joins a base URL with multiple path segments.
     */
    static join(base: string, ...paths: string[]) {
        try {
            if (!/^https?:\/\//.test(base)) {
                throw new Error("Invalid base URL: Missing schema (http/https)");
            }

            const url = new URL(base);
            let pathname = [url.pathname, ...paths]
                .map(p => p.replace(/^\/+|\/+$/g, "")) // Remove leading/trailing slashes
                .filter(Boolean) // Remove empty segments
                .join("/");

            url.pathname = pathname.startsWith("/") ? pathname : `/${pathname}`;

            return url.toString();
        } catch (error) {
            throw new Error("Invalid base URL");
        }
    }


    /**
     * Normalizes a URL by removing `.` and `..` segments from the path.
     * Options:
     * - `forceHttps`: Forces `https://` (highest priority).
     * - `forceHttp`: Forces `http://` (ignored if `forceHttps` is true).
     */
    static normalize(url: string, options: Options = {}) {
        const { forceHttps = false, forceHttp = false } = options;

        if (!/^https?:\/\//.test(url)) {
            url = `${forceHttps ? "https" : forceHttp ? "http" : "http"}://${url}`;
        }

        try {
            const parsed = new URL(url);
            const segments = parsed.pathname.split("/").filter(part => part.length > 0);
            const stack: string[] = [];

            for (const segment of segments) {
                if (segment === "..") stack.pop();
                else if (segment !== ".") stack.push(segment);
            }

            parsed.pathname = "/" + stack.join("/");
            return parsed.toString();
        } catch (error) {
            throw new Error("Invalid URL");
        }
    }

    /**
     * Modifies or adds query parameters in a URL and returns the updated URL.
     * Options:
     * - `forceHttps`: Forces `https://` (highest priority).
     * - `forceHttp`: Forces `http://` (ignored if `forceHttps` is true).
     */
    static setQueryParams(url: string, params: Record<string, string>, options: Options = {}) {
        const { forceHttps = false, forceHttp = false } = options;

        if (!/^https?:\/\//.test(url)) {
            url = `${forceHttps ? "https" : forceHttp ? "http" : "http"}://${url}`;
        }

        try {
            const parsed = new URL(url);
            Object.entries(params).forEach(([key, value]) => parsed.searchParams.set(key, value));
            return parsed.toString();
        } catch (error) {
            throw new Error("Invalid URL");
        }
    }
}

// Default export for CommonJS compatibility
export default URLHelper;
