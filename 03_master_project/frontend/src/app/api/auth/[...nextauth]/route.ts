import { authConfig } from "@/auth";
import NextAuth from "next-auth";

// export named handler for each HTTP method (GET, POST, etc.)
export const GET = NextAuth(authConfig);
export const POST = NextAuth(authConfig);

/*
WAS WIRD BENÖTIGT UM NEXT-AUTH ZU VERWENDEN

1. .env file
    1.1 in diesem .env file wird die AUTH_URL und AUTH_SECRET benötigt, allenfalls auch die BACKEND_URL
2. auth.ts
    2.1 hier wird die authConfig exportiert, die wir dann in den routes importieren
3. /src/app/api/auth/[...nextauth]/route.ts
    3.1 hier wird die authConfig importiert, damit wir die GET und POST routes definieren können
4. /src/types/definitions/next-auth.d.ts
    4.1 hier wird die Standarddefinition von next-auth mit einem accessToken erweitert
5. sessionprovider.tsx
    5.1 hierzu müssen wir einen sessionprovider innerhalb einer client-component definieren
6. benützen des sessionproviders
    6.1 Importieren des sessionproviders in der layout.tsx
7. Optional (src/middleware.ts)
    7.1 Die middleware wird benötigt um gewisse routes abzusichern

*/

/*
    IMPORTANT: Die registration hat nichts mit den Next-Auth zu zun,
    Da registrieren per se keine Session generiert, wird die ganze Logik
    über eine Server-Action ausgelöst (in diesem beispiel unter src/actions/auth-actions.ts)

    IMPORTANT 2: ZOD oder YUP sind Libraries die nur für Schemavalidierung genutzt werden und haben auch nichts mit Next-Auth zu tun.
    Diese können nur vor allem in Kombination mit React-Hook-Form oder vanilla JS benutzt werden.
*/
