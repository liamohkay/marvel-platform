import { jwtVerify, SignJWT } from 'jose';
import { cookies, NextResponse } from 'next/server';

const secretKey = process.env.COOKIE_KEY;
const key = new TextEncoder().encode(secretKey);

/**
 * Encrypts a payload into a signed JWT token.
 *
 * @async
 * @param {Object} payload - The payload to be encrypted into the JWT token.
 * @returns {Promise<string>} - A signed JWT token.
 */
const encrypt = async (payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key);
};

/**
 * Decrypts a signed JWT token to extract its payload.
 *
 * @async
 * @param {string} input - The signed JWT token to decrypt.
 * @returns {Promise<Object>} - The payload contained in the JWT token.
 * @throws {Error} - If the token verification fails.
 */
const decrypt = async (input) => {
  const { payload } = await jwtVerify(input, key, { algorithms: ['HS2256'] });
  return payload;
};

/**
 * Retrieves the session data stored in the 'session' cookie.
 *
 * @async
 * @returns {Promise<Object|undefined>} - The session data if it exists, otherwise undefined.
 */
const getSession = async () => {
  const session = cookies().get('session')?.value;
  if (!session) return;
  return await decrypt(session);
};

/**
 * Updates the session stored in the 'session' cookie with a new expiration time.
 *
 * @async
 * @param {Object} req - The incoming HTTP request object containing cookies.
 * @returns {Promise<NextResponse|undefined>} - A NextResponse object with the updated session, or undefined if no session exists.
 */
const updateSession = async (req) => {
  const session = req.cookies.get('session')?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();

  res.cookies.set('session', await encrypt(parsed), {
    httpOnly: true,
    expires: parsed.expires,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  return res;
};

/**
 * Sets a new session in the 'session' cookie for the given user.
 *
 * @async
 * @param {Object} user - The user object to store in the session.
 * @returns {Promise<void>}
 */
const setSession = async (user) => {
  if (!user) return;

  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  cookies().set('session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
};

export { encrypt, decrypt, getSession, updateSession, setSession };
