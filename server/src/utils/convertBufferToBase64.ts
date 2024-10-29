export default (
    buffer: Buffer,
    MIMEType: string
) => `data:${MIMEType};base64,${Buffer.from(buffer).toString('base64')}`;
