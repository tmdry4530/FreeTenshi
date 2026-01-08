const PINATA_JWT = process.env.PINATA_JWT || ''
const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY || ''

export async function uploadImageToIPFS(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Pinata upload failed: ${response.statusText}`)
    }

    const result = await response.json()
    return `ipfs://${result.IpfsHash}`
  } catch (error) {
    console.error('Failed to upload image to IPFS:', error)
    throw new Error('Failed to upload image to IPFS')
  }
}

export function ipfsToHttp(ipfsUri: string): string {
  if (!ipfsUri) return ''
  if (ipfsUri.startsWith('ipfs://')) {
    const hash = ipfsUri.replace('ipfs://', '')
    return PINATA_GATEWAY 
      ? `https://${PINATA_GATEWAY}/ipfs/${hash}`
      : `https://ipfs.io/ipfs/${hash}`
  }
  return ipfsUri
}
