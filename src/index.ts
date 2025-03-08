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
     * - If `base` is not provided, it uses `window.location.origin` in browsers.
     * - If `base` has no schema, it defaults to `https://` unless options force otherwise.
     * - Supports forcing `https` or `http` via options.
     */
    static join(
        { base, paths }: { base?: string; paths: string[] },
        options: Options = {}
    ) {
        const { forceHttps = false, forceHttp = false } = options;

        // If no base is provided, use window.location.origin if available.
        if (!base) {
            if (typeof window !== "undefined" && window.location) {
                base = window.location.origin;
            } else {
                // In non-browser environments, return a relative path.
                return "/" + paths.map(p => p.replace(/^\/+|\/+$/g, "")).join("/");
            }
        }

        // If the base does not have a schema, add one.
        if (!/^https?:\/\//.test(base)) {
            base = `${forceHttps ? "https" : forceHttp ? "http" : "https"}://${base}`;
        }

        const url = new URL(base);
        // Join the existing pathname with the additional path segments.
        let joinedPath = [url.pathname, ...paths]
            .map(p => p.replace(/^\/+|\/+$/g, ""))
            .filter(Boolean)
            .join("/");

        url.pathname = `/${joinedPath}`;
        return url.toString();
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
