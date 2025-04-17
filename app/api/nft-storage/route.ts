import { NextResponse } from 'next/server';
import pinataSDK from '@pinata/sdk';
import { writeFile, unlink } from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

const pinata = new pinataSDK(process.env.PINATA_API_KEY!, process.env.PINATA_SECRET_API_KEY!);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    if (!file || !name || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save buffer to temporary file
    const tempFileName = `upload-${crypto.randomUUID()}`;
    const tempFilePath = path.join(os.tmpdir(), tempFileName);
    await writeFile(tempFilePath, buffer);

    const fileStream = createReadStream(tempFilePath);

    const imageResponse = await pinata.pinFileToIPFS(fileStream, {
      pinataMetadata: {
        name: file.name,
      },
    });

    // Clean up temp file
    await unlink(tempFilePath);

    const metadata = {
      name,
      description,
      image: `ipfs://${imageResponse.IpfsHash}`,
    };

    const metadataResponse = await pinata.pinJSONToIPFS(metadata);

    console.log(metadataResponse);

    return NextResponse.json({
      metadata: {
        ...metadataResponse,
        imageHash: imageResponse.IpfsHash,
      },
    });
  } catch (error) {
    console.error('Pinata upload error:', error);
    return NextResponse.json({ error: 'Failed to store NFT' }, { status: 500 });
  }
}
