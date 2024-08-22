'use server'
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function setCookie(cookieName: string, cookieValue: string): Promise<void> {
    cookies().set(cookieName, cookieValue)
}

export async function getCookie(cookieName: string): Promise<RequestCookie | undefined> {
    return cookies().get(cookieName)
}

export async function deleteCookie(cookieName: string): Promise<void> {
    await cookies().delete(cookieName)
}