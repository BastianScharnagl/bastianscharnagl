import { NextResponse } from 'next/server';
import fs from 'fs';

const envItems = ['STRAVA_CLIENT_ID', 'STRAVA_CLIENT_SECRET', 'STRAVA_CLIENT_TOKEN', 'STRAVA_REFRESH_TOKEN'];

function updateEnv(items = envItems, eol = '\n') {
    const envContents = items
        .map(item => `${item}=${process.env[item]}`)
        .join(eol)
    fs.writeFileSync('.env', envContents);
}

export async function GET() {
    try {
        const headers = {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        };

        const body = JSON.stringify({
            client_id: process.env.STRAVA_CLIENT_ID,
            client_secret: process.env.STRAVA_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: process.env.STRAVA_REFRESH_TOKEN,
        });

        const refreshAccess = await fetch(`http://www.strava.com/oauth/token`, {
            method: "POST",
            headers: headers,
            body: body,
        });

        const accessJson = await refreshAccess.json();

        const accessToken = accessJson.access_token;
        const refreshToken = accessJson.refresh_token;

        updateEnv(['STRAVA_CLIENT_ID', 'STRAVA_CLIENT_SECRET', 'STRAVA_CLIENT_TOKEN', 'STRAVA_REFRESH_TOKEN'], '\r\n');

        const activityHeaders = {
            accept: "application/json",
            authorization: `Bearer ${accessToken}`,
        };

        // 2. Fetch Activities
        const activitiesResponse = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=30`, {
            method: "GET",
            headers: activityHeaders,
        });
        const activities = await activitiesResponse.json();

        // 3. Fetch Profile
        const profileResponse = await fetch(`https://www.strava.com/api/v3/athlete`, {
            method: "GET",
            headers: activityHeaders,
        });
        const profile = await profileResponse.json();

        // 4. Fetch Stats
        const statsResponse = await fetch(`https://www.strava.com/api/v3/athletes/12019944/stats`, {
            method: "GET",
            headers: activityHeaders,
        });
        const stats = await statsResponse.json();

        return NextResponse.json({ activities, profile, stats });
    } catch (error) {
        console.error('Strava API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch Strava activities' }, { status: 500 });
    }
}
