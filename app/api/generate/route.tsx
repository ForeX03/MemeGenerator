import { ImageResponse } from 'next/og'
import {NextRequest} from "next/server";

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    const { text, img } = await request.json();

    const decodedImg = decodeURI(img);

    const fontData = await fetch(new URL('../../../public/Anton-Regular.ttf', import.meta.url))
        .then((res) => res.arrayBuffer());

    return new ImageResponse((
        <div style={{
            background: 'black',
            width: '600px',
            height: '600px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '20px'
        }}>
            <div style={{
                width: '540px',
                height: '450px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                border: '2px white solid'
            }}>
                <img style={{
                    width: '500px',
                    maxHeight: '410px',
                    objectFit: 'contain'
                }}
                     src={decodedImg}
                />
            </div>

            <p style={{
                fontFamily: 'Anton',
                fontSize: '60px',
                color: 'white',
                marginTop: '20px'}}
            >
                { text }
            </p>
        </div>
    ), {
        width: 600,
        height: 600,
        fonts: [
            {
                name: 'Anton',
                data: fontData,
                style: 'normal',
                weight: 400
            }
        ],
        headers: {
            'Content-Type': 'image/png'
        }
    });
}