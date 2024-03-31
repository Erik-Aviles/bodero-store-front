export async function middleware(req, res) {
  try {
    const token = req.cookies.get("auth_cookie");
    console.log(res.redirect);

    if (!token) {
      return res.redirect(new URL("auth/login", req.url));
    }

    const response = await fetch(`${process.env.PUBLIC_URL}/api/auth/check`, {
      headers: {
        token: token.value,
      },
    });

    const data = await response.json();

    // @ts-ignore
    if (!data.isAuthorized) {
      return res.redirect(new URL("auth/login", req.url));
    }

    return res.next();
  } catch (error) {
    return res.redirect(new URL("auth/login", req.url));
  }
}

export const config = {
  matcher: "/",
};
