import { NextResponse } from 'next/server';
import { NFTStorage } from 'nft.storage';

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY || '' });

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    if (!file || !name || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const metadata = await client.store({
      name,
      description,
      image: file,
    });

    return NextResponse.json({ metadata });
  } catch (error) {
    console.error('NFT Storage error:', error);
    return NextResponse.json({ error: 'Failed to store NFT' }, { status: 500 });
  }
}
