import { compileMdx } from '@tn-figueiredo/cms'

export default async function Page() {
  const res = await compileMdx('# Hello', {})
  return <main>Smoke: compiled {res ? 'ok' : 'fail'}</main>
}
